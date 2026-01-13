import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { seoMainParametersSelector } from '../../store/seo/seo-selectors';
import { bannersCountInPositionSelector } from '../../store/banner-position/banner-position-selectors';

import { ProjectLayout } from '../../layouts/project-layout';
import { ProjectCol2Layout } from '../../layouts/project-col2-layout';
import { ServiceLentaLayout } from '../../layouts/service-lenta-layout';
import { RowsLayout } from '../../layouts/rows-layout';

import { NewsCard } from '../../components/news-card';
import { NewsColumn } from '../../components/news-column';
import { Banner } from '../../components/banner';
import { PeoplecontrolCard } from '../../components/services/peoplecontrol';
import { PeoplecontrolFormSearch } from '../../components/services/peoplecontrol/peoplecontrol-form-search';

import { apiGetSearchComplaintsResult, apiGetCategoriesComplaints } from '../../services/search';
import { apiGetAllNews, apiGetSuperPromotionNews, apiGetPicModerateYear } from '../../services/services';

import { WithLoadMore } from '../../hocs/with-load-more/with-load-more';
import { getBanners } from '../../utils/get-banners';
import { getOnlySelectedKeys } from '../../utils/get-only-selected-keys';
import { apiPostBannerStat, apiGetBanner } from '../../services/banner';
import { ArticleInColumns, BannerKeys } from '../../utils/consts';

type FetchDataType = {
  type: string,
  content: any, // ВРЕМЕННО
  pinned?: any,
  superPromotion?: any,
  categories?: any,
  complaints: any,
  totalCountPages: number,
  complaintsTotalPosts: number,
  page: number,
  category: number,
  dataFrom: number,
  dataTo: number,
  picModerateYear: number,
};

type Props = {
  fetchData: FetchDataType,
  popularNews: any,
  currentPage: number,
};

const LoadMore = WithLoadMore(PeoplecontrolCard);

const PaginationWithLoadMore = dynamic(
  () => import('../../components/pagination-with-load-more/pagination-with-load-more'),
  { loading: () => <p>...</p> },
);

const ComplaintPage: React.FC<Props> = React.memo(({
  fetchData: {
    content,
    complaints,
    categories,
    superPromotion,
    totalCountPages,
    complaintsTotalPosts,
    picModerateYear,
  },
  popularNews,
  currentPage,
}) => {
  const { query, push } = useRouter();
  const { cityName, mainTitle } = useSelector(seoMainParametersSelector);
  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);

  const [popularColumnHeight, setPopularColumnHeight] = useState(0);

  const [bannersTop, setBannersTop] = React.useState([]);
  const [bannersPush, setBannersPush] = React.useState([]);
  const [bannersPushFullSecond, setBannersPushFullSecond] = React.useState([]);
  const [bannersPushFullThird, setBannersPushFullThird] = React.useState([]);
  const [bannersFix, setBannersFix] = React.useState([]);
  const [bannersFixSecond, setBannersFixSecond] = React.useState([]);
  const [rightMainBanners, setRightMainBanners] = React.useState([]);
  const [bannerInServices, setBannerInServices] = React.useState([]);
  const [fetchDataContent, setFetchDataContent] = React.useState(null);

  const getFetchContent = async ({
    category,
    dataFrom,
    dataTo,
    page,
  }: any) => {
    if (page) {
      const { data }: any = await apiGetSearchComplaintsResult(
        {
          category,
          dataFrom,
          dataTo,
        },
        page,
      );
      setFetchDataContent(data);
    }
  };

  React.useEffect(() => {
    let countServices = 0;

    if (complaints.length < 4) {
      countServices = 0;
    }

    if (complaints.length === 4 || (
      complaints.length <= 8
        && complaints.length > 4
    )) {
      countServices = 1;
    }

    if (complaints.length > 8) {
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

    getFetchContent(query);
  }, [query]);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setPopularColumnHeight(node.getBoundingClientRect().height);
    }
  }, [content]);

  const siteNameValue = 'value' in mainTitle && mainTitle.value;
  const cityNameValue = 'value' in cityName && cityName.value;

  const subTitle = `Народный контроль | Подать жалобу | ${siteNameValue} ${currentPage > 1 ? `| стр. ${currentPage}` : ''}`;
  const description = `Подать жалобу в городе ${cityNameValue} через рубрику "Народный контроль" Прo Город принимает жалобы, обрабатывает их и решает проблемы горожан в режиме онлайн ${currentPage > 1 ? `| страница. ${currentPage}` : ''}`;

  const fetchContentData = !fetchDataContent ? complaints : fetchDataContent;

  return (
    <>
      <ProjectLayout
        currentPage={currentPage}
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
        <PeoplecontrolFormSearch
          complaintsTotalPosts={complaintsTotalPosts}
          categories={categories}
        />
        <ProjectCol2Layout>
          <div ref={measuredRef}>
            <ServiceLentaLayout bannerInServices={bannerInServices.slice(0, 2)}>
              {
                fetchContentData && fetchContentData
                  .slice(0, 4)
                  .map((item) => <PeoplecontrolCard {...item} key={`complaints-${item.id}`} />)
              }
              {
                fetchContentData && fetchContentData
                  .slice(4, 8)
                  .map((item) => <PeoplecontrolCard {...item} key={`complaints-${item.id}`} />)
              }
              {
                fetchContentData && fetchContentData
                  .slice(8, 12)
                  .map((item) => <PeoplecontrolCard {...item} key={`complaints-${item.id}`} />)
              }
              <PaginationWithLoadMore
                searchRequest={query}
                totalCountPages={totalCountPages}
                currentPage={currentPage}
                routerPush={push}
                rubric="peoplecontrol"
                LoadMoreComponent={LoadMore}
                loadDataApi={apiGetSearchComplaintsResult}
              />
            </ServiceLentaLayout>
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
    </>
  );
});

export const getServerSideProps = (async ({
  query: {
    page,
    category,
    dataFrom,
    dataTo,
  },
}:any) => {
  let popularNews = null;

  const fetchData = {
    content: 'error',
    superPromotion: [],
    categories: [],
    complaints: [],
    totalCountPages: null,
    complaintsTotalPosts: null,
    picModerateYear: null,
  };

  try {
    const superPromotionNews = await apiGetSuperPromotionNews();
    const { data: categoriesComplaints }: any = await apiGetCategoriesComplaints();
    const { data, headers }: any = await apiGetSearchComplaintsResult(
      {
        category,
        dataFrom,
        dataTo,
      },
      page,
    );

    const complaintsPosts = data;
    const totalCountPages = headers['x-pagination-page-count'];
    const complaintsTotalPosts = headers['x-pagination-total-count'];

    fetchData.superPromotion = await superPromotionNews;
    fetchData.complaints = await complaintsPosts;
    fetchData.categories = await categoriesComplaints;
    fetchData.totalCountPages = await totalCountPages;
    fetchData.complaintsTotalPosts = await complaintsTotalPosts;

    fetchData.categories.unshift({
      id: 0,
      title: 'Выберите категорию',
    });

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

export default ComplaintPage;
