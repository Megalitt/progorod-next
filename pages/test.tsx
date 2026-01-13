import React from 'react';
import { useSelector } from 'react-redux';
import { ProjectLayout } from '../layouts/project-layout';
import { Quiz } from '../components/quiz';
import { wrapper } from '../store/store';
import { apiGetQuizById } from '../services/quiz';
import { getBanners } from '../utils/get-banners';
import { apiGetBanner, apiPostBannerStat } from '../services/banner';
import { BannerKeys } from '../utils/consts';
import { bannersCountInPositionSelector } from '../store/banner-position/banner-position-selectors';

type Props = {
  fetchData: any,
};

const Test: React.FC<Props> = ({ fetchData }) => {
  const { quizData } = fetchData;

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
        bannerIdFix: BannerKeys.BANNER_FIX,
        bannerIdFixSecond: BannerKeys.BANNER_FIX_SECOND,
        bannerIdPuhs: BannerKeys.BANNER_PUSH,
        bannerIdPuhsFull: BannerKeys.BANNER_PUSH_FULL,
        bannerIdPuhsFullSecond: BannerKeys.BANNER_PUSH_FULL_SECOND,
        bannerIdPuhsFullThird: BannerKeys.BANNER_PUSH_FULL_THIRD,
        bannersCountInPosition,
      },
    ).then(({
      bannersTop,
      bannersFix,
      bannersFixSecond,
      bannersPush,
      bannersPushFullSecond,
      bannersPushFullThird,
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
      bannersTop={bannersTop}
      bannersFix={bannersFix}
      bannersFixSecond={bannersFixSecond}
      bannersPush={bannersPush}
      bannersPushFullSecond={bannersPushFullSecond}
      bannersPushFullThird={bannersPushFullThird}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <Quiz {...quizData} />
      </div>
    </ProjectLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async () => {
  const fetchData = {
    quizData: {},
  };

  try {
    const quizData = await apiGetQuizById(1);
    fetchData.quizData = await quizData;
  } catch (err) {
    console.log(`page test - quiz - apiGetQuizById - ${err.message}`);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      fetchData,
    },
  };
});

export default Test;
