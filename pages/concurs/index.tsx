import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { ProjectLayout } from '../../layouts/project-layout';
import { ProjectCol2Layout } from '../../layouts/project-col2-layout';
import { ServiceLentaLayout } from '../../layouts/service-lenta-layout';
import { RowsLayout } from '../../layouts/rows-layout';

import { PageTitle } from '../../components/page-title';
import { NewsCard } from '../../components/news-card';
import { NewsColumn } from '../../components/news-column';
import { Banner } from '../../components/banner';
import { ServiceCard } from '../../components/services/service-card';

import { apiGetPhotoConcurs } from '../../services/concurs';
import { apiGetSeoModuleSettings } from '../../services/seo';
import { apiGetAllNews, apiGetSuperPromotionNews, apiGetPicModerateYear } from '../../services/services';

import { seoMainParametersSelector } from '../../store/seo/seo-selectors';
import { bannersCountInPositionSelector } from '../../store/banner-position/banner-position-selectors';

import { WithLoadMore } from '../../hocs/with-load-more/with-load-more';
import { apiGetBanner, apiPostBannerStat } from '../../services/banner';
import { ArticleInColumns, BannerKeys, ConcursList } from '../../utils/consts';
import { getBanners } from '../../utils/get-banners';
import { getOnlySelectedKeys } from '../../utils/get-only-selected-keys';

const PaginationWithLoadMore = dynamic(
  () => import('../../components/pagination-with-load-more/pagination-with-load-more'),
  { loading: () => <p>...</p> },
);

type FetchDataType = {
  type: string,
  content: any, // ВРЕМЕННО
  superPromotion?: any,
  photoConcurs: any,
  totalCountPages: number,
  totalPosts: number,
  page: number,
  category: number,
  dataFrom: number,
  dataTo: number,
  picModerateYear: number,
  seoParameters: any,
};

type Props = {
  fetchData: FetchDataType,
  currentPage: number,
  popularNews: any,
};

const LoadMore = WithLoadMore(ServiceCard);

const Concurs: React.FC<Props> = React.memo(({
  fetchData: {
    content,
    photoConcurs,
    superPromotion,
    totalCountPages,
    picModerateYear,
    seoParameters,
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
  const [bannersPushFull, setBannersPushFull] = React.useState([]);
  const [bannersPushFullSecond, setBannersPushFullSecond] = React.useState([]);
  const [bannersPushFullThird, setBannersPushFullThird] = React.useState([]);
  const [bannersFix, setBannersFix] = React.useState([]);
  const [bannersFixSecond, setBannersFixSecond] = React.useState([]);
  const [rightMainBanners, setRightMainBanners] = React.useState([]);
  const [bannerInServices, setBannerInServices] = React.useState([]);
  const [fetchDataContent, setFetchDataContent] = React.useState(null);

  const getFetchContent = async ({
    page,
  }: any) => {
    if (page) {
      const { data: concurs }: any = await apiGetPhotoConcurs(page);
      setFetchDataContent(concurs);
    }
  };

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
        countServices: Math.floor(photoConcurs.length / 4),
        bannersCountInPosition,
      },
    ).then(({
      bannersTop,
      bannersPush,
      bannersPushFull,
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
      setBannersPushFull(bannersPushFull);
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

  const cityNameValue = 'value' in cityName && cityName.value;
  const siteNameValue = 'value' in mainTitle && mainTitle.value;
  const titleH1 = 'h1' in seoParameters && seoParameters?.h1?.length > 0 ? seoParameters.h1 : 'Конкурсы';

  const subTitle = `Конкурсы в городе ${cityNameValue} ${currentPage > 1 ? `| стр. ${currentPage}` : ''}`;
  const description = `Участвуйте в конкурсах на сайте и получайте призы | ${siteNameValue} ${currentPage > 1 ? `| страница. ${currentPage}` : ''}`;

  const fetchContentData = !fetchDataContent ? photoConcurs : fetchDataContent;

  return (
    <ProjectLayout
      bannersTop={bannersTop}
      bannersPush={bannersPush}
      bannersPushFull={bannersPushFull}
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
      <PageTitle title={titleH1} />
      <ProjectCol2Layout>
        <div ref={measuredRef}>
          <ServiceLentaLayout
            bannerInServices={bannerInServices}
          >
            {
              fetchContentData && fetchContentData
                .slice(0, 4)
                .map((item) => <ServiceCard serviceName="concurs" {...item} key={`complaints-${item.id}`} />)
            }
            {
              fetchContentData && fetchContentData
                .slice(4, 8)
                .map((item) => <ServiceCard serviceName="concurs" {...item} key={`complaints-${item.id}`} />)
            }
            {
              fetchContentData && fetchContentData
                .slice(8, 12)
                .map((item) => <ServiceCard serviceName="concurs" {...item} key={`complaints-${item.id}`} />)
            }
            <PaginationWithLoadMore
              searchRequest={query}
              totalCountPages={totalCountPages}
              currentPage={currentPage}
              routerPush={push}
              rubric="concurs"
              LoadMoreComponent={LoadMore}
              loadDataApi={apiGetPhotoConcurs}
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
  );
});

export const getServerSideProps = (async (context) => {
  const {
    query: {
      page,
    }, resolvedUrl,
  }: any = context;

  let popularNews = null;

  const fetchData = {
    content: 'error',
    superPromotion: [],
    photoConcurs: [],
    totalCountPages: null,
    picModerateYear: null,
    seoParameters: null,
  };

  try {
    const superPromotionNews = await apiGetSuperPromotionNews();
    const { data: concurs, headers }: any = await apiGetPhotoConcurs(page);

    const totalCountPages = headers['x-pagination-page-count'];

    fetchData.superPromotion = await superPromotionNews;
    fetchData.photoConcurs = await concurs;

    getOnlySelectedKeys([
      ...fetchData.photoConcurs || [],
    ], ConcursList);

    fetchData.totalCountPages = await totalCountPages;
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
    fetchData.seoParameters = seoParameters;
  }

  return {
    props: {
      fetchData,
      popularNews,
      currentPage: page || 1,
    },
  };
});

export default Concurs;
