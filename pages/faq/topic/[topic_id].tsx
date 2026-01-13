import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { wrapper } from '../../../store/store';

import { seoMainParametersSelector } from '../../../store/seo/seo-selectors';
import { bannersCountInPositionSelector } from '../../../store/banner-position/banner-position-selectors';

import { ProjectLayout } from '../../../layouts/project-layout';
import { ProjectCol2Layout } from '../../../layouts/project-col2-layout';
import { RowsLayout } from '../../../layouts/rows-layout';

import { NewsCard } from '../../../components/news-card';
import { NewsColumn } from '../../../components/news-column';
import { Banner } from '../../../components/banner';

import { apiGetThemeById, apiGetFaqItemsByTopicId } from '../../../services/faq';
import { apiGetAllNews, apiGetSuperPromotionNews, apiGetPicModerateYear } from '../../../services/services';
import { QuestionNav, TapeMode, TapeModeItem } from '../../../components/services/faq';

import { WithLoadMore } from '../../../hocs/with-load-more/with-load-more';
import { getBanners } from '../../../utils/get-banners';
import { getOnlySelectedKeys } from '../../../utils/get-only-selected-keys';
import { apiGetBanner, apiPostBannerStat } from '../../../services/banner';
import { ArticleInColumns, BannerKeys } from '../../../utils/consts';

const PaginationWithLoadMore = dynamic(
  () => import('../../../components/pagination-with-load-more/pagination-with-load-more'),
  { loading: () => <p>...</p> },
);

const LoadMore = WithLoadMore(TapeModeItem);

type Props = {
  fetchData: any,
  popularNews: any,
  currentPage: any,
};

const TopicId: React.FC<Props> = React.memo(({ fetchData, popularNews, currentPage }) => {
  const { query, push } = useRouter();

  const { cityName } = useSelector(seoMainParametersSelector);
  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);

  const {
    superPromotion,
    cards,
    theme,
    picModerateYear,
  } = fetchData;

  const [popularColumnHeight, setPopularColumnHeight] = useState(0);

  const [bannersTop, setBannersTop] = React.useState([]);
  const [bannersPush, setBannersPush] = React.useState([]);
  const [bannersPushFullSecond, setBannersPushFullSecond] = React.useState([]);
  const [bannersPushFullThird, setBannersPushFullThird] = React.useState([]);
  const [bannersFix, setBannersFix] = React.useState([]);
  const [bannersFixSecond, setBannersFixSecond] = React.useState([]);
  const [rightMainBanners, setRightMainBanners] = React.useState([]);
  const [bannerInServices, setBannerInServices] = React.useState([]);

  React.useEffect(() => {
    let countServices = 0;

    if (cards.data.length < 4) {
      countServices = 0;
    }

    if (cards.data.length === 4 || (
      cards.data.length <= 8
      && cards.data.length > 4
    )) {
      countServices = 1;
    }

    if (cards.data.length > 8) {
      countServices = 2;
    }

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
        countServices,
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
  }, [query]);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const totalHeight = node.getBoundingClientRect().height - 870;
      return totalHeight < 415
        ? setPopularColumnHeight(415)
        : setPopularColumnHeight(totalHeight);
    }
    return false;
  }, [cards]);

  const cityNameValue = 'value' in cityName && cityName.value;
  const subTitle = `Ответы на вопросы по теме ${theme} ${cityNameValue}`;
  const description = `Ответы специалистов и экспертов на вопросы ${theme} ${cityNameValue} | Задать вопрос специалисту на сайте`;

  return (
    <ProjectLayout
      bannersTop={bannersTop}
      bannersPush={bannersPush}
      bannersPushFullSecond={bannersPushFullSecond}
      bannersPushFullThird={bannersPushFullThird}
      bannersFix={bannersFix}
      bannersFixSecond={bannersFixSecond}
    >
      <Head>
        <title>{subTitle}</title>
        <meta name="description" content={description} key="description" />
        <meta property="og:title" content={subTitle} key="og:title" />
        <meta property="og:description" content={description} key="og:description" />
        <meta name="twitter:title" content={subTitle} key="twitter:title" />
        <meta name="twitter:description" content={description} key="twitter:description" />
      </Head>
      <ProjectCol2Layout>
        <div ref={measuredRef}>
          <QuestionNav />
          <TapeMode dataTape={cards} bannersInServices={bannerInServices} />
          <PaginationWithLoadMore
            searchRequest={query}
            totalCountPages={fetchData.totalCountPagesByTopicId}
            currentPage={currentPage}
            routerPush={push}
            rubric={`faq/topic/${query.topic_id}`}
            LoadMoreComponent={LoadMore}
            loadDataApi={apiGetFaqItemsByTopicId}
          />
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
            columnHeight={popularColumnHeight}
          />
        </RowsLayout>
      </ProjectCol2Layout>
    </ProjectLayout>
  );
});

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const { page }: any = context.query;
  let popularNews = null;

  const id = context.query.topic_id;
  const fetchData = {
    cards: null,
    superPromotion: [],
    theme: '',
    totalCountPagesByTopicId: 0,
    picModerateYear: null,
  };

  try {
    const superPromotionNews = await apiGetSuperPromotionNews();
    const cards: any = await apiGetFaqItemsByTopicId(id, page);
    const [theme] = await apiGetThemeById(id);

    fetchData.superPromotion = await superPromotionNews;
    fetchData.theme = await theme.name;
    fetchData.cards = {
      data: cards.data,
    };
    fetchData.totalCountPagesByTopicId = cards.headers['x-pagination-page-count'];

    const picModerateYear = await apiGetPicModerateYear();
    fetchData.picModerateYear = await picModerateYear;

    const news = await apiGetAllNews();
    popularNews = 'most_viewed' in news && Array.isArray(news.most_viewed) ? news.most_viewed : [];

    getOnlySelectedKeys([
      ...popularNews || [],
    ], ArticleInColumns);
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      fetchData,
      popularNews,
      currentPage: page || 1,
    },
  };
});

export default TopicId;
