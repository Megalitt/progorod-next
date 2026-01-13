import React from 'react';
import { useSelector } from 'react-redux';
import { wrapper } from '../../store/store';

import { ProjectLayout } from '../../layouts/project-layout';
import { ProjectCol2Layout } from '../../layouts/project-col2-layout';
import { SimpleLayout } from '../../layouts/simple-layout';
import { RowsLayout } from '../../layouts/rows-layout';

import { NewsCard } from '../../components/news-card';
import { Banner } from '../../components/banner';

import { apiGetCategoriesComplaints } from '../../services/search';
import { apiGetSuperPromotionNews, apiGetPicModerateYear } from '../../services/services';
import { PeoplecontrolFormComplaint } from '../../components/services/peoplecontrol/peoplecontrol-form-complaint';
import { getBanners } from '../../utils/get-banners';
import { apiGetBanner, apiPostBannerStat } from '../../services/banner';
import { BannerKeys } from '../../utils/consts';
import { bannersCountInPositionSelector } from '../../store/banner-position/banner-position-selectors';

type FetchDataType = {
  type: string,
  content: any, // ВРЕМЕННО
  pinned?: any,
  superPromotion?: any,
  categories?: any,
  picModerateYear?: number,
};

type Props = {
  fetchData: FetchDataType,
};

const SendComplaint: React.FC<Props> = React.memo(({ fetchData }) => {
  const [bannersTop, setBannersTop] = React.useState([]);
  const [bannersPush, setBannersPush] = React.useState([]);
  const [bannersPushFullSecond, setBannersPushFullSecond] = React.useState([]);
  const [bannersPushFullThird, setBannersPushFullThird] = React.useState([]);
  const [bannersFix, setBannersFix] = React.useState([]);
  const [bannersFixSecond, setBannersFixSecond] = React.useState([]);
  const [rightMainBanners, setRightMainBanners] = React.useState([]);
  const [bannerInServices, setBannerInServices] = React.useState([]);

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
        bannerIdRightMain: BannerKeys.BANNER_MAIN_RIGHT,
        bannerIdInServices: BannerKeys.BANNER_IN_SERVICES,
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
      bannersInServices,
      formData,
    }: any) => {
      setBannersTop(bannersTop);
      setBannersPush(bannersPush);
      setBannersPushFullSecond(bannersPushFullSecond);
      setBannersPushFullThird(bannersPushFullThird);
      setBannersFix(bannersFix);
      setBannersFixSecond(bannersFixSecond);
      setRightMainBanners(bannersRightMain);
      setBannerInServices(bannersInServices);

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
        <>
          <SimpleLayout title="Подать жалобу" align="left">
            <PeoplecontrolFormComplaint categories={fetchData.categories} />
          </SimpleLayout>
          <div style={{
            marginBottom: '20px',
            overflow: 'hidden',
            borderRadius: '20px',
          }}
          >
            {bannerInServices.length > 0 && <Banner {...bannerInServices[0]} />}
          </div>
        </>
        <RowsLayout>
          {rightMainBanners.length > 0 && (
            <div className="contentRightMainBanner">
              <Banner {...rightMainBanners[0]} />
            </div>
          )}
          {
            fetchData.superPromotion.length > 0
            && <NewsCard {...fetchData.superPromotion[0]} picModerateYear={fetchData.picModerateYear} />
          }
        </RowsLayout>
      </ProjectCol2Layout>
    </ProjectLayout>
  );
});

export const getServerSideProps = wrapper.getServerSideProps(async () => {
  const fetchData = {
    superPromotion: [],
    categories: [],
    picModerateYear: null,
  };

  try {
    const superPromotionNews = await apiGetSuperPromotionNews();
    const { data: categoriesComplaints }: any = await apiGetCategoriesComplaints();

    fetchData.superPromotion = await superPromotionNews;
    fetchData.categories = await categoriesComplaints;

    fetchData.categories.unshift({
      id: 0,
      title: 'Выберите категорию',
    });

    const picModerateYear = await apiGetPicModerateYear();
    fetchData.picModerateYear = await picModerateYear;
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }

  return {
    props: { fetchData },
  };
});

export default SendComplaint;
