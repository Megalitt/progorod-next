import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import NextNprogress from 'nextjs-progressbar';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { usePreserveScroll } from '../hooks/use-preserve-scroll';
import { wrapper } from '../store/store';
import {
  apiGetAllNav,
  apiGetRedirects,
  apiGetFooterInfo,
  apiGetMailruMetricaId,
  apiGetGoogleMetricaId,
  apiGetYandexMetricaId,
  apiGetSocialList,
  apiGetPercentScrollTopForShowBannerFix,
  apiGetMinutesLimitPushBanner,
  getMinutesLimitPushFullBanner,
  apiGetDelayPushBannerSecond,
  apiGetDelayPushBannerThird,
  apiGetDelayBannerFixSecond,
  apiGetCookiesNotification,
  apiGetDisableRegistration,
  apiGetTitleButtonMenu,
  apiGetHideMetric,
  apiGetSuggestNews,
  apiGetAgeCensor,
  apiGetAgreementText,
  apiGetLogos,
} from '../services/services';

import { BannerKeys, SocialListKey } from '../utils/consts';
import { apiHeadBanner } from '../services/banner';
import { apiGetSeoSettingsMain, apiGetDomain, apiGetDomainsWhiteList } from '../services/seo';
import { setNav, setSubMenu, setModalNavCities } from '../store/header/header-slice';
import { setSocialLinks } from '../store/social/social-slice';
import { setBannersCountInPosition } from '../store/banner-position/banner-position-slice';
import {
  setPercentScrollTopForShowBannerFix,
  setPushBannersLimitMinutes,
  setPushBannersFullLimitMinutes,
  setPushBannerSecondAfterTime,
  setPushBannerThirdAfterTime,
  setBannerFixAfterTime,
  setCookiesNotification,
  setDisableRegistration,
  setAgreementText,
  setAgeCensor,
  setSuggestNews,
  setHideMetric,
  setTitleButtonMenu,
  setLogoMain,
} from '../store/settings/settings-slice';
import {
  setCities,
  setFooterNav,
  setFooterInfo,
  setYandexId,
  setGoogleId,
  setMailruId,
} from '../store/footer/footer-slice';

import {
  setMainSeoParameters,
  setDomain,
  setIsMobileFlag,
  setWhiteDomainList,
} from '../store/seo/seo-slice';
import { getLoginStatus, setLoginStatus } from '../store/login/login-slice';
import { getBannersCountInPosition } from '../utils/get-banners-position';
import { getOnlySelectedKeys } from '../utils/get-only-selected-keys';

import { infoSelector } from '../store/footer/footer-selectors';

import '../styles/globals.scss';
import '../styles/slick/slick.scss';
import '../styles/slick/slick-theme.scss';
import '../styles/daypicker/daypicker.scss';//TODO Перенести в народный контроль
import { GetNewsCommerce } from '../components/get-news-commerce';
import { isKeyInLocalStorage } from '../utils/local-storage/is-key-in-local-storage';
import { setItemInLocalStorage } from '../utils/local-storage/set-item-in-local-storage';
import { onResize } from '../utils/on-resize';
import { screenSizeInitial } from '../utils/screen-size-initial';

const MyApp = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  const settings = useSelector(infoSelector);
  const refCounter = React.useRef(null);

  const router = useRouter();
  const [showRecaptcha, setShowRecaptcha] = React.useState(false);
  const [isSSR, setIsSSR] = React.useState(true);

  useEffect(() => {
    const voting = pageProps?.fetchData?.content?.voting;
    setShowRecaptcha(
      (router.pathname === '/concurs/view/[id]')
      || (router.pathname === '/[rubric]/[id]' && typeof voting !== 'undefined' && voting.length !== 0),
    );
  }, [router.pathname]);

  useEffect(() => {
     if (!isKeyInLocalStorage('screenWidth')) {
      const observer = new ResizeObserver((entries) => {
        const width = entries[0].contentRect.width;
        setItemInLocalStorage('screenWidth', String(width));
      });
      observer.observe(document.documentElement);

      setTimeout(() => {
        observer.unobserve(document.documentElement);
      }, 0);
    }

    onResize((deviceType) => {
      const screenSizeType = screenSizeInitial();
      if (screenSizeType === null) return;
      if (deviceType.flag !== screenSizeType) {
        setItemInLocalStorage('screenWidth', String(deviceType.screenWidth));
      }
    }, {
      mobile: 768,
      desktop: 1024,
    });

    const loginStatus = async () => {
      const { payload }:any = await dispatch(getLoginStatus());
      const { resultCode } = payload;
      dispatch(setLoginStatus(resultCode));
    };
    loginStatus();

    const isUserAgentGoogleMetrics = window.navigator.userAgent.indexOf('moto g power') !== -1 ? true : false;
    if (refCounter.current && !isUserAgentGoogleMetrics) {
      const rangeCounters = document.createRange();
      rangeCounters.selectNodeContents(refCounter.current);
      rangeCounters.deleteContents();
      refCounter.current.appendChild(rangeCounters.createContextualFragment(settings.settingCounters.value));
    }

    setIsSSR(false);
  }, []);

  usePreserveScroll();
  return (
    <>
      {!isSSR && (
        <NextNprogress
          color="#3271A8"
          startPosition={Math.random()}
          stopDelayMs={200}
          height={3}
        />
      )}
      <GetNewsCommerce />
      {/* @ts-ignore */}
      {showRecaptcha && process.env.NEXT_PUBLIC_RECAPTCHA_KEY.length > 0 ? (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}>
          <Component {...pageProps} />
        </GoogleReCaptchaProvider>
      ) : (
        <Component {...pageProps} />
      )}
      <div id="counters" ref={refCounter} />
    </>
  );
};
MyApp.getInitialProps = async ({ ctx }) => {
  const pageProps = {};
  let UA = null;
  if (ctx.req) {
    UA = ctx.req.headers['user-agent'] ?? '';
  } else {
    UA = navigator.userAgent ?? '';
  }

  if (typeof window === 'undefined') {
    const url = ctx.req?.url || '';
    const redirect = await apiGetRedirects(url);
    if (redirect.length > 0) {
      ctx.res.writeHead(redirect[0].status_code, { Location: redirect[0].to });
      ctx.res.end();
      return { pageProps: {} };
    }
  }

  const isMobile = !!(UA.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
  ctx.store.dispatch(setIsMobileFlag(isMobile));

  if (typeof window === 'undefined') {
    const [
      nav,
      socialLinks,
      percentScrollTopForShowBannerFix,
      pushBannersLimitMinutes,
      pushBannersFullLimitMinutes,
      pushBannerSecondAfterTime,
      pushBannerThirdAfterTime,
      bannerFixAfterTime,
      cookiesNotification,
      disableRegistration,
      agreement,
      displayAgeCensor,
      settingSuggestNews,
      settingHideMetric,
      settingTitleButtonMenu,
      domain,
      domainsWhiteList,
      logoMain,
    ]:any = await Promise.all([
      apiGetAllNav(),
      apiGetSocialList(),
      apiGetPercentScrollTopForShowBannerFix(),
      apiGetMinutesLimitPushBanner(),
      getMinutesLimitPushFullBanner(),
      apiGetDelayPushBannerSecond(),
      apiGetDelayPushBannerThird(),
      apiGetDelayBannerFixSecond(),
      apiGetCookiesNotification(),
      apiGetDisableRegistration(),
      apiGetAgreementText(),
      apiGetAgeCensor(),
      apiGetSuggestNews(),
      apiGetHideMetric(),
      apiGetTitleButtonMenu(),
      apiGetDomain(),
      apiGetDomainsWhiteList(),
      apiGetLogos('file-logotip-main'),
    ]);

    const [
      mainSeoMainTitle,
      mainSeoKeywords,
      mainSeoSiteDescription,
      mainSeoCityName,
      mainSeoSiteName,
    ] = await Promise.all([
      apiGetSeoSettingsMain('main-title'),
      apiGetSeoSettingsMain('keywords'),
      apiGetSeoSettingsMain('description'),
      apiGetSeoSettingsMain('cityname'),
      apiGetSeoSettingsMain('site-name'),
    ]);

    const [
      settingCensor,
      settingCommenttext,
      settingEditors,
      settingCopyright,
      settingCounters,
      settingCountersInformers,
      yandexId,
      googleId,
      mailruId,
    ] = await Promise.all([
      apiGetFooterInfo('censor'),
      apiGetFooterInfo('commenttext'),
      apiGetFooterInfo('editors'),
      apiGetFooterInfo('copyright'),
      apiGetFooterInfo('counters'),
      apiGetFooterInfo('counters-informers'),
      apiGetYandexMetricaId(),
      apiGetGoogleMetricaId(),
      apiGetMailruMetricaId(),
    ]);

    const banersTotalCount = await getBannersCountInPosition(apiHeadBanner, {
      bannerIdTop: BannerKeys.BANNER_TOP,
    });

    getOnlySelectedKeys([
      ...socialLinks || [],
    ], SocialListKey);

    ctx.store.dispatch(setSocialLinks(socialLinks));
    ctx.store.dispatch(setBannersCountInPosition(banersTotalCount));
    ctx.store.dispatch(setPercentScrollTopForShowBannerFix(percentScrollTopForShowBannerFix));
    ctx.store.dispatch(setPushBannersLimitMinutes(pushBannersLimitMinutes));
    ctx.store.dispatch(setPushBannersFullLimitMinutes(pushBannersFullLimitMinutes));
    ctx.store.dispatch(setPushBannerSecondAfterTime(pushBannerSecondAfterTime));
    ctx.store.dispatch(setPushBannerThirdAfterTime(pushBannerThirdAfterTime));
    ctx.store.dispatch(setBannerFixAfterTime(bannerFixAfterTime));//
    ctx.store.dispatch(setCookiesNotification(cookiesNotification));
    ctx.store.dispatch(setDisableRegistration(disableRegistration));
    ctx.store.dispatch(setAgreementText(agreement));
    ctx.store.dispatch(setAgeCensor(displayAgeCensor));
    ctx.store.dispatch(setSuggestNews(settingSuggestNews));
    ctx.store.dispatch(setHideMetric(settingHideMetric));
    ctx.store.dispatch(setTitleButtonMenu(settingTitleButtonMenu));

    ctx.store.dispatch(setNav(nav.id_1 || []));
    ctx.store.dispatch(setSubMenu(nav.id_8 || []));
    ctx.store.dispatch(setCities(nav.id_3 || []));
    ctx.store.dispatch(setFooterNav(nav.id_2 || []));
    ctx.store.dispatch(setModalNavCities(nav.id_11 || []));

    ctx.store.dispatch(setDomain(domain));
    ctx.store.dispatch(setWhiteDomainList(domainsWhiteList));

    ctx.store.dispatch(setMainSeoParameters({
      mainTitle: mainSeoMainTitle,
      keywords: mainSeoKeywords,
      description: mainSeoSiteDescription,
      cityName: mainSeoCityName,
      siteName: mainSeoSiteName,
    }));

    ctx.store.dispatch(setFooterInfo({
      settingCensor,
      settingCommenttext,
      settingEditors,
      settingCopyright,
      settingCounters,
      settingCountersInformers,
    }));
    ctx.store.dispatch(setYandexId(yandexId));
    ctx.store.dispatch(setGoogleId(googleId));
    ctx.store.dispatch(setMailruId(mailruId));
    ctx.store.dispatch(setLogoMain(logoMain));
  }

  return {
    pageProps: { ...pageProps },
  };
};

export default wrapper.withRedux(MyApp);
