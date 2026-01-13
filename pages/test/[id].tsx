import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProjectLayout } from '../../layouts/project-layout';
import { ProjectCol2Layout } from '../../layouts/project-col2-layout';
import { RowsLayout } from '../../layouts/rows-layout';
import { Quiz } from '../../components/quiz';
import { wrapper } from '../../store/store';
import { apiGetSuperPromotionNews, apiGetPicModerateYear, apiGetAllNews } from '../../services/services';
import { apiGetQuizById } from '../../services/quiz';
import { PageTitle } from '../../components/page-title';
import { NewsCard } from '../../components/news-card';
import { NewsColumn } from '../../components/news-column';
import { Banner } from '../../components/banner';
import { bannersCountInPositionSelector } from '../../store/banner-position/banner-position-selectors';
import { apiGetBanner, apiPostBannerStat } from '../../services/banner';
import { getBanners } from '../../utils/get-banners';
import { getOnlySelectedKeys } from '../../utils/get-only-selected-keys';
import { ArticleInColumns, BannerKeys } from '../../utils/consts';

type Props = {
  fetchData: any,
  popularNews: any,
};

const Test: React.FC<Props> = ({ fetchData, popularNews }) => {
  const { quizData, superPromotion, picModerateYear } = fetchData;
  const [popularColumnHeight, setPopularColumnHeight] = useState(0);
  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);

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

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setPopularColumnHeight(node.getBoundingClientRect().height);
    }
  }, [quizData]);

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
        <div ref={measuredRef}>
          <PageTitle
            type="rubric"
            title={`Тест: ${quizData.name}`}
            description={quizData.description}
          />
          <Quiz {...quizData} />
        </div>
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
          <NewsColumn
            title="Популярное"
            news={[...popularNews]}
            columnHeight={popularColumnHeight - 870}
          />
        </RowsLayout>
      </ProjectCol2Layout>
    </ProjectLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const { id } = context.query;
  let popularNews = null;

  const fetchData = {
    quizData: {},
    superPromotion: [],
    picModerateYear: null,
  };

  try {
    const superPromotionNews = await apiGetSuperPromotionNews();
    const quizData = await apiGetQuizById(id);
    fetchData.quizData = await quizData;
    fetchData.superPromotion = await superPromotionNews;

    const picModerateYear = await apiGetPicModerateYear();
    fetchData.picModerateYear = await picModerateYear;

    const news = await apiGetAllNews();
    popularNews = 'most_viewed' in news && Array.isArray(news.most_viewed) ? news.most_viewed : [];

    getOnlySelectedKeys([
      ...popularNews || [],
    ], ArticleInColumns);

    if (quizData?.code === 0 || !('id' in quizData)) {
      return {
        notFound: true,
      };
    }
  } catch (err) {
    console.log(`${err?.status}, ${err?.message}`);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      fetchData,
      popularNews,
    },
  };
});

export default Test;
