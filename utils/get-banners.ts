import { changeOrderInArray } from './banners/change-order-in-array';
import { sortByViews } from './banners/sort-by-views';
import { BannerName } from './consts';
import { getCookie } from './cookie/get-cookie';
import { getItemInLocalStorage } from './local-storage/get-item-in-local-storage';

export const getBanners = async (
  bannerApi, {
    bannerIdTop,
    bannerIdRight,
    bannerIdRightMain,
    bannerIdFix,
    bannerIdFixSecond,
    bannerIdPuhs,
    bannerIdPuhsFull,
    bannerIdPuhsFullSecond,
    bannerIdPuhsFullThird,
    bannerIdCentral,
    bannerIdMediaMetrika,
    bannerIdPuls,
    bannerIdPartner,
    bannerIdPartnerFirst,
    bannerIdPartnerSecond,
    bannerIdPartnerThird,
    bannerIdPartnerFourth,
    bannerIdInnerArticle,
    bannerIdInnerArticleTop,
    bannerIdInnerArticleAfterTags,
    bannerIdInsteadRelatedArticles,
    bannerIdInsteadMainImageArticles,
    bannerIdInServices,
    countRight = 1,
    countCentral = 1,
    countServices = 1,
    countArticleInnerTop = 1,
    bannersCountInPosition,
    bannerRightEnable = true,
  }: any,
  articlePromo:any = {
    content: {
      promo: {},
    },
  },
  articlePreviewContent:any = {},
  isPreview = false,
) => {
  let isTopBanner = null;
  let isRightBanner = null;
  let isRightMainBanner = null;
  let isFixBanner = null;
  let isFixBannerSecond = null;
  let isCentralBanner = null;
  let isPushBanner = null;
  let isPushFullSecondBanner = null;
  let isPushFullThirdBanner = null;
  let isMediaMetrikaBanner = null;
  let isPulsBanner = null;
  let isPartnerBanner = null;
  let isPartnerBannerFirst = null;
  let isPartnerBannerSecond = null;
  let isPartnerBannerThird = null;
  let isPartnerBannerFourth = null;
  let isInnerArticleBanner = null;
  let isInnerArticleBannerTop = null;
  let isInnerArticleBannerAfterTags = null;
  let isInsteadRelatedArticles = null;
  let isInsteadMainImageArticles = null;
  let isInServicesBanner = null;
  let screenWidth = +getItemInLocalStorage('screenWidth');

  const formData = new FormData();
  const { bannerTop } = bannersCountInPosition;
  if (bannerIdTop && bannerTop > 0) {
    const [bannersTop] = await Promise.all([bannerApi(bannerIdTop)]);
    if (bannersTop.length > 0) {
      isTopBanner = sortByViews(bannersTop, 'shows_today', false);
      formData.append('ids[]', isTopBanner[0].id);
    }
  }

  if (screenWidth > 1024 && bannerIdRight && countRight !== 0 && bannerRightEnable) {
    const [bannersRight] = await Promise.all([bannerApi(bannerIdRight)]);
    if (bannersRight.length > 0) {
      isRightBanner = changeOrderInArray(bannersRight, BannerName.RIGHT_BANNER);
      for (let i = 0; i < countRight; i += 1) {
        if (isRightBanner[i]) {
          formData.append('ids[]', isRightBanner[i].id);
        }
      }
    }
  }

  if (bannerIdFix) {
    const [bannersFix] = await Promise.all([bannerApi(bannerIdFix)]);

    if (bannersFix.length > 0) {
      isFixBanner = sortByViews(bannersFix, 'shows_today', false);
      formData.append('ids[]', isFixBanner[0].id);
    }
  }

  if (bannerIdFixSecond) {
    const [bannersFixSecond] = await Promise.all([bannerApi(bannerIdFixSecond)]);

    if (bannersFixSecond.length > 0) {
      isFixBannerSecond = sortByViews(bannersFixSecond, 'shows_today', false);
      formData.append('ids[]', isFixBannerSecond[0].id);
    }
  }

  if (bannerIdCentral && countCentral !== 0) {
    const [bannersCentral] = await Promise.all([bannerApi(bannerIdCentral)]);

    if (bannersCentral.length > 0) {
      isCentralBanner = sortByViews(bannersCentral, 'shows_today', false);

      for (let i = 0; i < countCentral; i += 1) {
        if (isCentralBanner[i]) {
          formData.append('ids[]', isCentralBanner[i].id);
        }
      }
    }
  }

  if ((screenWidth < 768 && bannerIdPuhs && bannerIdPuhsFull) || (
    bannerIdPuhs && bannerIdPuhsFull && process.env.NEXT_PUBLIC_FORK_NAME === 'CHEBOKSARY'
  )) {
    const [bannersPush] = await Promise.all([bannerApi(bannerIdPuhs)]);
    const [bannersPushFull] = await Promise.all([bannerApi(bannerIdPuhsFull)]);

    isPushBanner = sortByViews([...bannersPush, ...bannersPushFull], 'shows_today', false);

    if (isPushBanner.length > 0) {
      for (let i = 0; i < isPushBanner.length; i += 1) {
        if (!getCookie(`push${isPushBanner[i].id}`)) {
          if (isPushBanner[i]) {
            formData.append('ids[]', isPushBanner[i].id);
          }
          break;
        }
      }
    }
  }

  if ((screenWidth < 768 && bannerIdPuhsFullSecond) || (
    bannerIdPuhsFullSecond && process.env.NEXT_PUBLIC_FORK_NAME === 'CHEBOKSARY'
  )) {
    const [bannersPushFullSecond] = await Promise.all([bannerApi(bannerIdPuhsFullSecond)]);
    isPushFullSecondBanner = sortByViews(bannersPushFullSecond, 'shows_today', false);

    if (isPushFullSecondBanner.length > 0) {
      for (let i = 0; i < isPushFullSecondBanner.length; i += 1) {
        if (!getCookie(`push${isPushFullSecondBanner[i].id}`)) {
          if (isPushFullSecondBanner[i]) {
            formData.append('ids[]', isPushFullSecondBanner[i].id);
          }
          break;
        }
      }
    }
  }

  if ((screenWidth < 768 && bannerIdPuhsFullThird) || (
    bannerIdPuhsFullThird && process.env.NEXT_PUBLIC_FORK_NAME === 'CHEBOKSARY'
  )) {
    const [bannersPushFullThird] = await Promise.all([bannerApi(bannerIdPuhsFullThird)]);
    isPushFullThirdBanner = sortByViews(bannersPushFullThird, 'shows_today', false);

    if (isPushFullThirdBanner.length > 0) {
      for (let i = 0; i < isPushFullThirdBanner.length; i += 1) {
        if (!getCookie(`push${isPushFullThirdBanner[i].id}`)) {
          if (isPushFullThirdBanner[i]) {
            formData.append('ids[]', isPushFullThirdBanner[i].id);
          }
          break;
        }
      }
    }
  }

  if ((screenWidth > 1024 || screenWidth <= 768) && bannerIdRightMain) {
    const [bannerRightMain] = await Promise.all([bannerApi(bannerIdRightMain)]);

    if (bannerRightMain.length > 0) {
      isRightMainBanner = sortByViews(bannerRightMain, 'shows_today', false);
      formData.append('ids[]', isRightMainBanner[0].id);
    }
  }

  if (screenWidth > 1024 && bannerIdMediaMetrika) {
    const [bannerMediaMetrika] = await Promise.all([bannerApi(bannerIdMediaMetrika)]);

    if (bannerMediaMetrika.length > 0) {
      isMediaMetrikaBanner = bannerMediaMetrika;
      formData.append('ids[]', bannerMediaMetrika[0].id);
    }
  }

  if (bannerIdPuls) {
    const [bannersPuls] = await Promise.all([bannerApi(bannerIdPuls)]);

    if (bannersPuls.length > 0) {
      isPulsBanner = sortByViews(bannersPuls, 'shows_today', false);
      formData.append('ids[]', isPulsBanner[0].id);
    }
  }

  if (bannerIdInsteadRelatedArticles) {
    const [bannerInsteadRelatedArticles] = await Promise.all([bannerApi(bannerIdInsteadRelatedArticles)]);

    if (bannerInsteadRelatedArticles.length > 0) {
      isInsteadRelatedArticles = sortByViews(bannerInsteadRelatedArticles, 'shows_today', false);
      formData.append('ids[]', isInsteadRelatedArticles[0].id);
    }
  }

  if (bannerIdInsteadMainImageArticles) {
    const [bannerInsteadMainImageArticles] = await Promise.all([bannerApi(bannerIdInsteadMainImageArticles)]);

    if (bannerInsteadMainImageArticles.length > 0) {
      isInsteadMainImageArticles = sortByViews(bannerInsteadMainImageArticles, 'shows_today', false);
      formData.append('ids[]', isInsteadMainImageArticles[0].id);
    }
  }

  if (bannerIdPartner) {
    const [bannersPartner] = await Promise.all([bannerApi(bannerIdPartner)]);

    if (bannersPartner.length > 0) {
      isPartnerBanner = sortByViews(bannersPartner, 'shows_today', false);
      formData.append('ids[]', isPartnerBanner[0].id);
    }
  }

  if (bannerIdPartnerFirst) {
    const [bannerPartnerFirst] = await Promise.all([bannerApi(bannerIdPartnerFirst)]);

    if (bannerPartnerFirst.length > 0) {
      isPartnerBannerFirst = sortByViews(bannerPartnerFirst, 'shows_today', false);
      formData.append('ids[]', isPartnerBannerFirst[0].id);
    }
  }

  if (bannerIdPartnerSecond) {
    const [bannerPartnerSecond] = await Promise.all([bannerApi(bannerIdPartnerSecond)]);

    if (bannerPartnerSecond.length > 0) {
      isPartnerBannerSecond = sortByViews(bannerPartnerSecond, 'shows_today', false);
      formData.append('ids[]', isPartnerBannerSecond[0].id);
    }
  }

  if (bannerIdPartnerThird) {
    const [bannerPartnerThird] = await Promise.all([bannerApi(bannerIdPartnerThird)]);

    if (bannerPartnerThird.length > 0) {
      isPartnerBannerThird = sortByViews(bannerPartnerThird, 'shows_today', false);
      formData.append('ids[]', isPartnerBannerThird[0].id);
    }
  }

  if (bannerIdPartnerFourth) {
    const [bannerPartnerFourth] = await Promise.all([bannerApi(bannerIdPartnerFourth)]);

    if (bannerPartnerFourth.length > 0) {
      isPartnerBannerFourth = sortByViews(bannerPartnerFourth, 'shows_today', false);
      formData.append('ids[]', isPartnerBannerFourth[0].id);
    }
  }

  if (bannerIdInnerArticle) {
    let promo = null;

    if ('content' in articlePromo && articlePromo.content) {
      promo = articlePromo.content.promo;
    }

    if ('promo' in articlePromo) {
      promo = articlePromo.promo;
    }

    if ('promo' in articlePreviewContent && isPreview) {
      promo = articlePreviewContent?.promo;
    }

    const [bannersInnerArticle] = await Promise.all([bannerApi(bannerIdInnerArticle, promo !== null ? promo : '')]);

    if (bannersInnerArticle.length > 0) {
      isInnerArticleBanner = sortByViews(bannersInnerArticle, 'shows_today', false);
      formData.append('ids[]', isInnerArticleBanner[0].id);
    }
  }

  if (bannerIdInnerArticleTop) {
    let promo = null;

    if ('content' in articlePromo && articlePromo.content) {
      promo = articlePromo.content.promo;
    }

    if ('promo' in articlePromo) {
      promo = articlePromo.promo;
    }

    if ('promo' in articlePreviewContent && isPreview) {
      promo = articlePreviewContent?.promo;
    }

    const [bannersInnerArticleTop] = await Promise.all([bannerApi(bannerIdInnerArticleTop, promo !== null ? promo : '')]);
    if (bannersInnerArticleTop.length > 0) {
      isInnerArticleBannerTop = changeOrderInArray(bannersInnerArticleTop, BannerName.BANNER_INNER_ARTICLE_TOP);
      for (let i = 0; i < countArticleInnerTop; i += 1) {
        if (isInnerArticleBannerTop[i]) {
          formData.append('ids[]', isInnerArticleBannerTop[i].id);
        }
      }
    }
  }

  if (bannerIdInnerArticleAfterTags) {
    // const bannerKeyPosition = 'banner-passive-before-read-also';
    const [bannersInnerArticleAfterTags] = await Promise.all([bannerApi(bannerIdInnerArticleAfterTags)]);

    if (bannersInnerArticleAfterTags.length > 0) {
      isInnerArticleBannerAfterTags = sortByViews(bannersInnerArticleAfterTags, 'shows_today', false);
      formData.append('ids[]', isInnerArticleBannerAfterTags[0].id);
    }
  }

  if (bannerIdInServices && countServices !== 0) {
    const [bannersInServices] = await Promise.all([bannerApi(bannerIdInServices)]);

    if (bannersInServices.length > 0) {
      isInServicesBanner = changeOrderInArray(bannersInServices, BannerName.BANNER_IN_SERVICES);

      for (let i = 0; i < countServices; i += 1) {
        if (isInServicesBanner[i]) {
          formData.append('ids[]', isInServicesBanner[i].id);
        }
      }
    }
  }

  return {
    bannersTop: isTopBanner || [],
    bannersRight: isRightBanner || [],
    bannersRightMain: isRightMainBanner || [],
    bannersFix: isFixBanner || [],
    bannersFixSecond: isFixBannerSecond || [],
    bannersCentral: isCentralBanner || [],
    bannersPush: isPushBanner || [],
    bannersPushFullSecond: isPushFullSecondBanner || [],
    bannersPushFullThird: isPushFullThirdBanner || [],
    bannersMediaMetrika: isMediaMetrikaBanner || [],
    bannersPuls: isPulsBanner || [],
    bannersPartner: isPartnerBanner || [],
    bannersPartnerFirst: isPartnerBannerFirst || [],
    bannersPartnerSecond: isPartnerBannerSecond || [],
    bannersPartnerThird: isPartnerBannerThird || [],
    bannersPartnerFourth: isPartnerBannerFourth || [],
    bannersInnerArticle: isInnerArticleBanner || [],
    bannersInnerArticleTop: isInnerArticleBannerTop || [],
    bannersInnerArticleAfterTags: isInnerArticleBannerAfterTags || [],
    bannersInsteadRelatedArticles: isInsteadRelatedArticles || [],
    bannersInsteadMainImageArticles: isInsteadMainImageArticles || [],
    bannersInServices: isInServicesBanner || [],
    formData,
  };
};
