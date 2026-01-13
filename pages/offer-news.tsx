import React from 'react';
import { useSelector } from 'react-redux';
import { ProjectLayout } from '../layouts/project-layout';
import { SimpleLayout } from '../layouts/simple-layout';
import { FormOfferNews } from '../components/form-offer-news';

import { apiGetSeoModuleSettings } from '../services/seo';
import { getBanners } from '../utils/get-banners';
import { apiPostBannerStat, apiGetBanner } from '../services/banner';
import { BannerKeys } from '../utils/consts';
import { apiGetSuggestNews } from '../services/services';

import { bannersCountInPositionSelector } from '../store/banner-position/banner-position-selectors';

type Props = {
  seoParametersProps: any,
};

const OfferNews: React.FC<Props> = React.memo(({ seoParametersProps }) => {
  const subTitle = 'title' in seoParametersProps && seoParametersProps?.title?.length > 0 ? seoParametersProps.title : 'Предложить новость';
  const titleH1 = 'h1' in seoParametersProps && seoParametersProps?.h1?.length > 0 ? seoParametersProps.h1 : 'Предложить новость';

  const [bannersTop, setBannersTop] = React.useState([]);
  const [bannersPush, setBannersPush] = React.useState([]);
  const [bannersPushFullSecond, setBannersPushFullSecond] = React.useState([]);
  const [bannersPushFullThird, setBannersPushFullThird] = React.useState([]);
  const [bannersFix, setBannersFix] = React.useState([]);
  const [bannersFixSecond, setBannersFixSecond] = React.useState([]);
  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);

  React.useEffect(() => {
    getBanners(
      apiGetBanner,
      {
        bannerIdTop: BannerKeys.BANNER_TOP,
        bannerIdPuhs: BannerKeys.BANNER_PUSH,
        bannerIdPuhsFull: BannerKeys.BANNER_PUSH_FULL,
        bannerIdPuhsFullSecond: BannerKeys.BANNER_PUSH_FULL_SECOND,
        bannerIdPuhsFullThird: BannerKeys.BANNER_PUSH_FULL_THIRD,
        bannerIdFix: BannerKeys.BANNER_FIX,
        bannerIdFixSecond: BannerKeys.BANNER_FIX_SECOND,
        bannersCountInPosition,
      },
    ).then(({
      bannersTop,
      bannersPush,
      bannersPushFullSecond,
      bannersPushFullThird,
      bannersFix,
      bannersFixSecond,
      formData,
    }: any) => {
      setBannersTop(bannersTop);
      setBannersFix(bannersFix);
      setBannersFixSecond(bannersFixSecond);
      setBannersPush(bannersPush);
      setBannersPushFullSecond(bannersPushFullSecond);
      setBannersPushFullThird(bannersPushFullThird);

      setTimeout(() => {
        apiPostBannerStat(formData);
      }, 10000);
    });
  }, []);

  return (
    <ProjectLayout
      subTitle={subTitle}
      bannersTop={bannersTop}
      bannersPush={bannersPush}
      bannersFix={bannersFix}
      bannersFixSecond={bannersFixSecond}
      bannersPushFullSecond={bannersPushFullSecond}
      bannersPushFullThird={bannersPushFullThird}
    >
      <SimpleLayout title={titleH1} align="left">
        <FormOfferNews />
      </SimpleLayout>
    </ProjectLayout>
  );
});

export const getServerSideProps = (async (context) => {
  const { resolvedUrl }: any = context;
  let seoParametersProps = null;

  if (
    resolvedUrl.toLowerCase().indexOf('.svg') === -1
    && resolvedUrl.toLowerCase().indexOf('.png') === -1
    && resolvedUrl.toLowerCase().indexOf('.jpg') === -1
    && resolvedUrl.toLowerCase().indexOf('.jpeg') === -1
    && resolvedUrl.toLowerCase().indexOf('.gif') === -1
    && resolvedUrl.toLowerCase().indexOf('/bs/s/') === -1
  ) {
    const seoPath = resolvedUrl.indexOf('?') === -1 ? resolvedUrl : resolvedUrl.slice(0, resolvedUrl.indexOf('?'));
    const seoParameters = await apiGetSeoModuleSettings(seoPath);
    seoParametersProps = seoParameters;
  }

  const settingSuggestNews = await apiGetSuggestNews();
  if (+settingSuggestNews === 0) {
    context.res.statusCode = 404;
    if (context.res.statusCode === 404) {
      return {
        notFound: true,
      };
    }
  }

  return {
    props: {
      seoParametersProps,
    },
  };
});

export default OfferNews;
