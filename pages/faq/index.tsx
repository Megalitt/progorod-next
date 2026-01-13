import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { wrapper } from '../../store/store';
import { seoMainParametersSelector } from '../../store/seo/seo-selectors';
import { bannersCountInPositionSelector } from '../../store/banner-position/banner-position-selectors';

import { ProjectLayout } from '../../layouts/project-layout';
import { ProjectCol2Layout } from '../../layouts/project-col2-layout';
import { RowsLayout } from '../../layouts/rows-layout';
import { NewsCard } from '../../components/news-card';
import { NewsColumn } from '../../components/news-column';
import { Banner } from '../../components/banner';

import {
  QuestionNav,
  Tape,
  TapeMode,
  TapeModeItem,
} from '../../components/services/faq';

import { apiGetThemes, apiGetFaqSortByPopular, apiGetFaqSortByTime } from '../../services/faq';
import { apiGetSuperPromotionNews, apiGetPicModerateYear, apiGetAllNews } from '../../services/services';
import { apiGetBanner, apiPostBannerStat } from '../../services/banner';

import { getBanners } from '../../utils/get-banners';
import { getOnlySelectedKeys } from '../../utils/get-only-selected-keys';
import { ArticleInColumns, BannerKeys } from '../../utils/consts';
import { WithLoadMore } from '../../hocs/with-load-more/with-load-more';

const PaginationWithLoadMore = dynamic(
  () => import('../../components/pagination-with-load-more/pagination-with-load-more'),
  { loading: () => <p>...</p> },
);

const LoadMore = WithLoadMore(TapeModeItem);

type Props = {
  fetchData: any,
  popularNews: any,
  currentPage: any,
};

const Faq: React.FC<Props> = React.memo(({
  fetchData,
  popularNews,
  currentPage,
}) => {
  const { query, push, asPath } = useRouter();

  const {
    superPromotion,
    themes,
    faqSortByTime,
    faqSortByPopular,
    picModerateYear,
  } = fetchData;

  const { cityName } = useSelector(seoMainParametersSelector);
  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);
  const [popularColumnHeight, setPopularColumnHeight] = useState(0);

  const [bannersTop, setBannersTop] = React.useState([]);
  const [bannersPush, setBannersPush] = React.useState([]);
  const [bannersPushFullSecond, setBannersPushFullSecond] = React.useState([]);
  const [bannersPushFullThird, setBannersPushFullThird] = React.useState([]);
  const [bannersFix, setBannersFix] = React.useState([]);
  const [bannersFixSecond, setBannersFixSecond] = React.useState([]);
  const [bannersInServices, setInServicesBanners] = React.useState([]);
  const [rightMainBanners, setRightMainBanners] = React.useState([]);

  React.useEffect(() => {
    let countServices = 0;

    if (query || asPath === '/faq?order=__views') {
      if (faqSortByPopular.data.length < 4) {
        countServices = 0;
      }

      if (faqSortByPopular.data.length === 4 || (
        faqSortByPopular.data.length <= 8
        && faqSortByPopular.data.length > 4
      )) {
        countServices = 1;
      }

      if (faqSortByPopular.data.length > 8) {
        countServices = 2;
      }
    }

    if (query || asPath === '/faq?order=timestamp') {
      countServices = faqSortByTime.data.length;

      if (faqSortByTime.data.length < 4) {
        countServices = 0;
      }

      if (faqSortByTime.data.length === 4 || (
        faqSortByTime.data.length < 8
        && faqSortByTime.data.length > 4
      )) {
        countServices = 1;
      }

      if (faqSortByTime.data.length > 8) {
        countServices = 2;
      }
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
      setInServicesBanners(bannersInServices);

      setTimeout(() => {
        apiPostBannerStat(formData);
      }, 10000);
    });
  }, [query, asPath]);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const totalHeight = node.getBoundingClientRect().height - 900;
      return totalHeight < 415
        ? setPopularColumnHeight(415)
        : setPopularColumnHeight(totalHeight);
    }
    return false;
  }, [themes]);

  const subTitle = 'value' in cityName && `Темы вопросов | ${cityName.value}`;
  const description = `Специалисты и эксперты отвечают на вопросы пользователей на разные темы ${cityName.value}`;
  return (
    <>
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
          <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
        </Head>
        <ProjectCol2Layout>
          <div ref={measuredRef}>
            <QuestionNav />
            {asPath.indexOf('faq?order=__views') !== -1 && (
              <>
                <TapeMode dataTape={faqSortByPopular} bannersInServices={bannersInServices} />
                <PaginationWithLoadMore
                  searchRequest={query}
                  totalCountPages={fetchData.totalCountPagesByPopular}
                  currentPage={currentPage}
                  routerPush={push}
                  rubric="faq?order=__views"
                  LoadMoreComponent={LoadMore}
                  loadDataApi={apiGetFaqSortByPopular}
                />
              </>
            )}
            {asPath.indexOf('faq?order=timestamp') !== -1 && (
              <>
                <TapeMode dataTape={faqSortByTime} bannersInServices={bannersInServices} />
                <PaginationWithLoadMore
                  searchRequest={query}
                  totalCountPages={fetchData.totalCountPagesByTime}
                  currentPage={currentPage}
                  routerPush={push}
                  rubric="faq?order=timestamp"
                  LoadMoreComponent={LoadMore}
                  loadDataApi={apiGetFaqSortByTime}
                />
              </>
            )}
            {asPath.indexOf('faq?order=__views') === -1
              && asPath.indexOf('faq?order=timestamp') === -1
              && <Tape dataTape={themes} type="theme" />}

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
    </>
  );
});

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const { page }: any = context.query;
  let popularNews = null;

  const fetchData = {
    themes: [],
    faqSortByTime: null,
    faqSortByPopular: null,
    superPromotion: [],
    totalCountPagesByTime: null,
    totalCountPagesByPopular: null,
    picModerateYear: null,
  };
  try {
    const superPromotionNews = await apiGetSuperPromotionNews();
    const themes = await apiGetThemes();
    const faqSortByTime: any = await apiGetFaqSortByTime(page);
    const faqSortByPopular: any = await apiGetFaqSortByPopular(page);

    fetchData.superPromotion = await superPromotionNews;
    fetchData.themes = await themes;

    fetchData.faqSortByTime = {
      data: faqSortByTime.data,
    };

    fetchData.faqSortByPopular = {
      data: faqSortByPopular.data,
    };

    fetchData.totalCountPagesByTime = faqSortByTime.headers['x-pagination-page-count'];
    fetchData.totalCountPagesByPopular = faqSortByPopular.headers['x-pagination-page-count'];
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

export default Faq;
