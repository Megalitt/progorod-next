import React from 'react';
import { useSelector } from 'react-redux';
import { wrapper } from '../../store/store';

import { ProjectLayout } from '../../layouts/project-layout';
import { SimpleLayout } from '../../layouts/simple-layout';

import { ConcursFormEntry } from '../../components/services/concurs/concurs-form-entry';

import { seoParametersSelector } from '../../store/seo/seo-selectors';
import { bannersCountInPositionSelector } from '../../store/banner-position/banner-position-selectors';
import { setSeoParameters } from '../../store/seo/seo-slice';

import { apiGetSeoModuleSettings } from '../../services/seo';
import { getBanners } from '../../utils/get-banners';
import { BannerKeys } from '../../utils/consts';
import { apiGetBanner, apiPostBannerStat } from '../../services/banner';

type Props = {
  cityfaceId: string
};

const CompetitionEntry: React.FC<Props> = React.memo(({ cityfaceId }) => {
  const seoForPage = useSelector(seoParametersSelector);
  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);
  const subTitle = 'title' in seoForPage && seoForPage?.title?.length > 0 ? seoForPage.title : 'Подать заявку на участие в конкурсе';
  const titleH1 = 'h1' in seoForPage && seoForPage?.h1?.length > 0 ? seoForPage.h1 : 'Подать заявку на участие в конкурсе';

  const [bannersTop, setBannersTop] = React.useState([]);
  const [bannersPush, setBannersPush] = React.useState([]);
  const [bannersPushFullSecond, setBannersPushFullSecond] = React.useState([]);
  const [bannersPushFullThird, setBannersPushFullThird] = React.useState([]);
  const [bannersFix, setBannersFix] = React.useState([]);
  const [bannersFixSecond, setBannersFixSecond] = React.useState([]);

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
      bannersPushFullSecond={bannersPushFullSecond}
      bannersPushFullThird={bannersPushFullThird}
      bannersFix={bannersFix}
      bannersFixSecond={bannersFixSecond}
    >
      <SimpleLayout title={titleH1} align="left">
        <ConcursFormEntry cityfaceId={cityfaceId} />
      </SimpleLayout>
    </ProjectLayout>
  );
});

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const {
    query: {
      cityface_id,
    }, resolvedUrl,
  }: any = context;

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
    await context.store.dispatch(setSeoParameters(seoParameters));
  }

  return {
    props: {
      cityfaceId: cityface_id || 0,
    },
  };
});

export default CompetitionEntry;
