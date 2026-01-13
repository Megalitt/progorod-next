import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { ContainerLayout } from '../container-layout';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { ArticleModal } from '../../components/article-modal';
import BannerTop from '../../components/banner-top/banner-top';

import {
  percentScrollTopForShowBannerFixSelector,
  pushBannersLimitMinutesSelector,
  pushBannersFullLimitMinutesSelector,
  pushBannerSecondAfterTimeSelector,
  pushBannerThirdAfterTimeSelector,
  bannerFixAfterTimeSelector,
  cookiesNotificationSelector,
  logoMainSelector,
} from '../../store/settings/settings-selectors';

import { alertsSelector } from '../../store/alert/alert-selectors';
import { domainSelector, seoMainParametersSelector } from '../../store/seo/seo-selectors';
import { bannersCountInPositionSelector } from '../../store/banner-position/banner-position-selectors';

import { ImagePath, BannerKeys } from '../../utils/consts';
import { setPushBanner } from '../../utils/banners/set-push-banner';

import styles from './project-layout.module.scss';
import { Notifycations } from '../../components/notifycation';

const Alerts = dynamic(
  () => import('../../components/alerts/alerts'),
  { ssr: false },
);

const BannerFix = dynamic(
  () => import('../../components/banner-fix/banner-fix'),
  { ssr: false },
);

const BannerPush = dynamic(
  () => import('../../components/banner-push/banner-push'),
  { ssr: false },
);

type Props = {
  articleTitle?: string, 
  children: JSX.Element[] | JSX.Element,
  superPromotion?: object
  subTitle?: string,
  subTitleImportant?: boolean,
  description?: string,
  keywords?: string,
  refPageTitle?: any,
  currentPage?: number,
  bannersTop?: any,
  bannersFix?: any,
  bannersFixSecond?: any,
  bannersPush?: any,
  bannersPushFull?: any,
  bannersPushFullSecond?: any,
  bannersPushFullThird?: any,
  seoForPage?: any,
};

const ProjectLayout: React.FC<Props> = React.memo(({
  children,
  subTitle = '',
  subTitleImportant = false,
  description = '',
  superPromotion,
  currentPage,
  bannersTop,
  bannersFix,
  bannersFixSecond,
  bannersPush,
  bannersPushFullSecond,
  bannersPushFullThird,
  seoForPage,
  articleTitle,
}) => {
  const router = useRouter();
  const domain = useSelector(domainSelector);
  const alerts = useSelector(alertsSelector);
  const [userAgent, setUserAgent] = React.useState(false);
  const seoDefault = useSelector(seoMainParametersSelector);
  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);
  const percentScrollTopForShowBannerFix = useSelector(percentScrollTopForShowBannerFixSelector);
  const pushBannersAfterSecond = useSelector(pushBannerSecondAfterTimeSelector);
  const pushBannersAfterThird = useSelector(pushBannerThirdAfterTimeSelector);
  const pushBannersLimitMinutes = useSelector(pushBannersLimitMinutesSelector);
  const pushBannersFullLimitMinutes = useSelector(pushBannersFullLimitMinutesSelector);
  const bannerFixAfterLimitTime = useSelector(bannerFixAfterTimeSelector);
  const cookiesNotification = useSelector(cookiesNotificationSelector);
  const [bannerPushCookie, setBannerPushCookie] = useState(null);
  const [isPushBannerOpened, setPushBannerOpenedFlag] = useState(true);
  const [isShowBannerFix, setShowBannerFix] = React.useState(false);
  const [isShowBannerFixAfterSecond, setShowBannerFixAfterSecond] = React.useState(false);
  const [currentPushBannerSecond, setCurrentPushBannerSecond] = React.useState(null);
  const [currentPushBannerThird, setCurrentPushBannerThird] = React.useState(null);
  const logoMain = useSelector(logoMainSelector);
  
  const imageUrl = seoDefault?.image_url || logoMain;

  const handleRouteChange = () => {
    setPushBannerOpenedFlag(true);
    setShowBannerFix(false);
  };

  const handleWindowScroll = () => {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.clientHeight;
    const percentScroll = (scrollTop / (documentHeight - windowHeight)) * 100;

    if (percentScroll > percentScrollTopForShowBannerFix) {
      setShowBannerFix(true);
    }
  };

  const onCloseBannerPushClick = () => {
    setBannerPushCookie(null);
    setPushBannerOpenedFlag(false);
  };

  useEffect(() => {
    let isShowBannerPush = false;

    if (bannersPush && bannersPush.length > 0 && !bannerPushCookie) {
      const currentPushBanner = setPushBanner(bannersPush, pushBannersLimitMinutes, pushBannersFullLimitMinutes);
      if (currentPushBanner) {
        setBannerPushCookie(currentPushBanner);
        if (currentPushBanner.position_key === BannerKeys.BANNER_PUSH_FULL) {
          isShowBannerPush = true;
        }
      }
    }

    const setBannerAfterSecond = setTimeout(() => {
      if (isShowBannerPush) {
        if (bannersPushFullSecond.length > 0) {
          setCurrentPushBannerSecond(bannersPushFullSecond[0]);
        }
      }
    }, +pushBannersAfterSecond * 1000);

    const setBannerAfterThird = setTimeout(() => {
      if (isShowBannerPush) {
        if (Array.isArray(bannersPushFullThird) && bannersPushFullThird.length > 0) {
          setCurrentPushBannerThird(bannersPushFullThird[0]);
        }
      }
    }, +pushBannersAfterThird * 1000);

    return () => {
      clearTimeout(setBannerAfterSecond);
      clearTimeout(setBannerAfterThird);
      setBannerPushCookie(null);
    };
  }, [bannersPush]);

  useEffect(()=> {
    const bannerFixSecondAfterTimer = setTimeout(() => {
      setShowBannerFixAfterSecond(true);
    }, +bannerFixAfterLimitTime * 1000);

    return () => {
      clearTimeout(bannerFixSecondAfterTimer);
    };
  }, [bannersFix]);

  useEffect(() => {
    setUserAgent(window.navigator.userAgent.indexOf('moto g power') !== -1);
    router.events.on('routeChangeStart', handleRouteChange);

    if (percentScrollTopForShowBannerFix > 0) {
      window.addEventListener('scroll', handleWindowScroll);
    } else {
      setShowBannerFix(true);
    }

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  let pageTitle = '';

  if (seoForPage && 'title' in seoForPage && seoForPage?.title?.length > 0) {
    pageTitle = seoForPage.title;
  } else if (subTitle && subTitleImportant) {
    pageTitle = subTitle;
  } else if (subTitle && !subTitleImportant) {
    pageTitle = `${subTitle} | ${seoDefault?.mainTitle?.value}`;
  } else {
    pageTitle = seoDefault?.mainTitle?.value;
  }
  const pageKeywords = seoForPage && 'keywords' in seoForPage && seoForPage?.keywords?.length > 0 ? seoForPage.keywords
    : seoDefault?.keywords?.value;

  // eslint-disable-next-line no-nested-ternary
  const pageDescription = seoForPage && 'description' in seoForPage && seoForPage.description.length > 0 ? seoForPage.description
    : description && description.length > 0
      ? description
      : seoDefault?.description?.value;

  return (
    <>
      <Head>
        {!articleTitle && <title key="title">{currentPage && currentPage > 1 ? `${pageTitle} | Стр. ${currentPage}` : `${pageTitle}`}</title>}
        {articleTitle && <title key="title">{articleTitle}</title>}
        <meta name="keywords" content={pageKeywords} key="keywords" />
        <meta name="description" content={`${pageDescription} ${currentPage && currentPage > 1 ? `| Страница ${currentPage}` : ''}`} key="description" />
        <meta property="og:image:width" content="730" key="og:image:width" />
        <meta property="og:image:height" content="400" key="og:image:height" />
        <meta property="og:url" content={`https://${domain}${router.asPath}`} />
        <meta property="og:type" content={imageUrl} key="og:type" />
        <meta property="og:title" content={pageTitle} key="og:title" />
        <meta property="og:description" content={pageDescription} key="og:description" />
        <meta property="og:image" content={imageUrl} key="og:image" />
        <meta name="twitter:card" content="summary" key="summary" />
        <meta name="twitter:title" content={pageTitle} key="twitter:title" />
        <meta name="twitter:description" content={pageDescription} key="twitter:description" />
        <meta name="twitter:image:src" content={imageUrl} key="twitter:image:src" />
        <link key="canonical" rel="canonical" href={`https://${domain}${router.asPath}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
      </Head>
      <div className={styles.projectLayout}>
        {bannersCountInPosition.bannerTop > 0 && <BannerTop bannerData={bannersTop} />}
        
        <Header />
        {process.env.NEXT_PUBLIC_COOKIE_NOTIFY === 'true' && <Notifycations cookiesNotification={cookiesNotification} />}
        {superPromotion && <ArticleModal {...superPromotion} />}
        <main>
          <ContainerLayout>
            {children}
          </ContainerLayout>
        </main>
        <Footer />

        {bannersFix && bannersFix.length > 0 && !userAgent && (
          <>
            <BannerFix
              bannerData={bannersFix[0]}
              isShowBannerFix={isShowBannerFix}
            />
          </>
        )}
        
        {bannersFixSecond && bannersFixSecond.length > 0 && isShowBannerFixAfterSecond && !userAgent && (
          <>
            <BannerFix
              bannerData={bannersFixSecond[0]}
              isShowBannerFix={isShowBannerFix}
            />
          </>
        )}
        
        {bannersPush && bannersPush.length > 0 && bannerPushCookie && isPushBannerOpened && !userAgent && (
          <BannerPush bannerDataPush={bannerPushCookie} onCloseBannerPushClick={onCloseBannerPushClick} />
        )}

        {bannersPushFullSecond && bannersPushFullSecond.length > 0 && currentPushBannerSecond && isPushBannerOpened && !userAgent && (
          <BannerPush bannerDataPush={currentPushBannerSecond} onCloseBannerPushClick={onCloseBannerPushClick} />
        )}

        {bannersPushFullThird && bannersPushFullThird.length > 0 && currentPushBannerThird && isPushBannerOpened && !userAgent && (
          <BannerPush bannerDataPush={currentPushBannerThird} onCloseBannerPushClick={onCloseBannerPushClick} />
        )}

        {alerts.length > 0 && <Alerts alerts={alerts} />}
      </div>
    </>
  );
});

export default ProjectLayout;
