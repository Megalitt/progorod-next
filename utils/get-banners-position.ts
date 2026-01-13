export const getBannersCountInPosition = async (
  bannerApi, {
    bannerIdTop,
  }: any,
) => {
  let bannerTop = 0;

  if (bannerIdTop) {
    const [BannersTotalCount] = await Promise.all([bannerApi(bannerIdTop)]);
    bannerTop = BannersTotalCount;
  }

  return {
    bannerTop,
    bannerFix: 0,
    bannerCentral: 0,
    bannerRight: 0,
    bannerMainRight: 0,
    bannerPush: 0,
    bannerPushFull: 0,
    bannerPartners: 0,
    bannerAmpTop: 0,
    bannerAmpMiddle: 0,
    bannerAmpBottom: 0,
    bannerInnerArticle: 0,
    bannerMediametrika: 0,
    bannerInServices: 0,
    bannerPuls: 0,
    bannerInnerArticleTop: 0,
    bannerInnerArticleAfterTags: 0,
    bannerInsteadRelatedArticles: 0,
    bannerinsteadMainImageArticles: 0,
    bannerPushFullSecond: 0,
  };
};
