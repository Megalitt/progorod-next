import React from 'react';
import { useSelector } from 'react-redux';
import { wrapper } from '../../../store/store';

import { ProjectLayout } from '../../../layouts/project-layout';
import { ProjectCol2Layout } from '../../../layouts/project-col2-layout';
import { RowsLayout } from '../../../layouts/rows-layout';
import { SimpleLayout } from '../../../layouts/simple-layout';

import { NewsCard } from '../../../components/news-card';
import { Banner } from '../../../components/banner';
import { FormSpecialist } from '../../../components/services/faq/form-specialist';

import { seoParametersSelector } from '../../../store/seo/seo-selectors';
import { bannersCountInPositionSelector } from '../../../store/banner-position/banner-position-selectors';
import { setSeoParameters } from '../../../store/seo/seo-slice';

import { apiGetFaqCompanies } from '../../../services/faq';
import { apiGetSeoModuleSettings } from '../../../services/seo';
import { apiGetSuperPromotionNews, apiGetPicModerateYear } from '../../../services/services';
import { apiGetBanner, apiPostBannerStat } from '../../../services/banner';
import { BannerKeys } from '../../../utils/consts';
import { getBanners } from '../../../utils/get-banners';

type Props = {
  fetchData: any,
};

const SendForm: React.FC<Props> = ({ fetchData }) => {
  const { superPromotion, companies, picModerateYear } = fetchData;
  const seoForPage = useSelector(seoParametersSelector);
  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);
  const titleH1 = 'h1' in seoForPage && seoForPage?.h1?.length > 0 ? seoForPage.h1 : 'Стать специалистом';

  const [bannersTop, setBannersTop] = React.useState([]);
  const [bannersPush, setBannersPush] = React.useState([]);
  const [bannersPushFullSecond, setBannersPushFullSecond] = React.useState([]);
  const [bannersPushFullThird, setBannersPushFullThird] = React.useState([]);
  const [bannersFix, setBannersFix] = React.useState([]);
  const [bannersFixSecond, setBannersFixSecond] = React.useState([]);
  const [rightMainBanners, setRightMainBanners] = React.useState([]);

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
        bannerIdRightMain: BannerKeys.BANNER_MAIN_RIGHT,
        bannersCountInPosition,
      },
    ).then(({
      bannersTop,
      bannersPush,
      bannersPushFullSecond,
      bannersPushFullThird,
      bannersFix,
      bannersFixSecond,
      bannersRightMain,
      formData,
    }: any) => {
      setBannersTop(bannersTop);
      setBannersPush(bannersPush);
      setBannersPushFullSecond(bannersPushFullSecond);
      setBannersPushFullThird(bannersPushFullThird);
      setBannersFix(bannersFix);
      setBannersFixSecond(bannersFixSecond);
      setRightMainBanners(bannersRightMain);

      setTimeout(() => {
        apiPostBannerStat(formData);
      }, 10000);
    });
  }, []);

  return (
    <ProjectLayout
      bannersTop={bannersTop}
      bannersPush={bannersPush}
      bannersPushFullSecond={bannersPushFullSecond}
      bannersPushFullThird={bannersPushFullThird}
      bannersFix={bannersFix}
      bannersFixSecond={bannersFixSecond}
    >
      <ProjectCol2Layout>
        <SimpleLayout title={titleH1} align="center">
          <FormSpecialist companies={companies} />
        </SimpleLayout>
        <RowsLayout>
          {rightMainBanners.length > 0 && (
            <div className="contentRightMainBanner">
              <Banner {...rightMainBanners[0]} />
            </div>
          )}
          {
            superPromotion.length > 0
            && <NewsCard {...superPromotion[0]} picModerateYear={picModerateYear} />
          }
        </RowsLayout>
      </ProjectCol2Layout>
    </ProjectLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const { resolvedUrl }: any = context;

  const fetchData = {
    superPromotion: [],
    companies: [],
    picModerateYear: null,
  };

  try {
    const superPromotionNews = await apiGetSuperPromotionNews();
    const companies = await apiGetFaqCompanies();
    fetchData.superPromotion = await superPromotionNews;
    fetchData.companies = await companies;
    const picModerateYear = await apiGetPicModerateYear();
    fetchData.picModerateYear = await picModerateYear;
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }

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
      fetchData,
    },
  };
});

export default SendForm;
