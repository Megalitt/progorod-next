import React from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { apiGetArticles, apiGetRedactorUserData } from '../../services/redactor';
import { apiGetSeoModuleSettings } from '../../services/seo';
import { apiGetBanner, apiPostBannerStat } from '../../services/banner';
import { ProjectLayout } from '../../layouts/project-layout';
import { ProjectInnerLayout } from '../../layouts/project-inner-layout';
import { PageTitle } from '../../components/page-title';
import { NewsLine } from '../../components/news-line';
import { ArticleInColumns, BannerKeys, NewsLineKeys } from '../../utils/consts';
import { getBanners } from '../../utils/get-banners';
import { apiGetAllNews, apiGetPicModerateYear, apiGetChatSettings } from '../../services/services';
import { getOnlySelectedKeys } from '../../utils/get-only-selected-keys';
import { AuthorProfile } from '../../components/author-profile';
import { bannersCountInPositionSelector } from '../../store/banner-position/banner-position-selectors';
import { WithLoadMore } from '../../hocs/with-load-more/with-load-more';

const LoadMore = WithLoadMore(NewsLine);

const PaginationWithLoadMore = dynamic(
  () => import('../../components/pagination-with-load-more/pagination-with-load-more'),
  { loading: () => <p>...</p> },
);

type Props = {
  redactorId: number | string,
  redactorNews: any,
  redactorUserData: any,
  disableComment: string | number,
  picModerateYear: number,
  seoParametersProps: any,
  currentPage: number,
  totalCountPages: number | string,
  lastNews: any,
};

const RedactorPage: React.FC<Props> = React.memo(({
  redactorId,
  redactorNews,
  redactorUserData,
  disableComment,
  picModerateYear,
  seoParametersProps,
  currentPage,
  totalCountPages,
  lastNews,
}) => {
  const subTitle = 'title' in seoParametersProps && seoParametersProps?.title?.length > 0 ? seoParametersProps.title : `${redactorNews[0]?.redactor}`;
  const titleH1 = 'h1' in seoParametersProps && seoParametersProps?.h1?.length > 0 ? seoParametersProps.h1 : `Автор материалов: ${redactorNews[0]?.redactor}`;

  const [bannersTop, setBannersTop] = React.useState([]);
  const [bannersPush, setBannersPush] = React.useState([]);
  const [bannersPushFullSecond, setBannersPushFullSecond] = React.useState([]);
  const [bannersPushFullThird, setBannersPushFullThird] = React.useState([]);
  const [bannersFix, setBannersFix] = React.useState([]);
  const [bannersFixSecond, setBannersFixSecond] = React.useState([]);
  const [rightMainBanners, setRightMainBanners] = React.useState([]);
  const [bannersRight, setBannersRight] = React.useState([]);
  const [bannersCentral, setBannersCentral] = React.useState([]);
  const [bannersMediaMetrika, setBannersMediaMetrika] = React.useState([]);

  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);

  const { query, push } = useRouter();

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
        bannerIdRight: BannerKeys.BANNER_RIGHT,
        bannerIdCentral: BannerKeys.BANNER_CENTRAL,
        bannerIdMediaMetrika: BannerKeys.BANNER_MEDIAMETRIKA,
        countCentral: Math.floor(redactorNews.length / 5),
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
      bannersRight,
      bannersCentral,
      bannersMediaMetrika,
      formData,
    }: any) => {
      setBannersTop(bannersTop);
      setBannersFix(bannersFix);
      setBannersFixSecond(bannersFixSecond);
      setBannersPush(bannersPush);
      setBannersPushFullSecond(bannersPushFullSecond);
      setBannersPushFullThird(bannersPushFullThird);
      setRightMainBanners(bannersRightMain);
      setBannersRight(bannersRight);
      setBannersCentral(bannersCentral);
      setBannersMediaMetrika(bannersMediaMetrika);

      setTimeout(() => {
        apiPostBannerStat(formData);
      }, 10000);
    });
  }, [query]);

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
      <AuthorProfile {...redactorUserData} />
      <PageTitle title={titleH1} type="redactorsNews" />
      <ProjectInnerLayout
        rightMainBanners={rightMainBanners}
        bannersRight={bannersRight}
        bannersCentral={bannersCentral}
        bannersMediaMetrika={bannersMediaMetrika}
        picModerateYear={picModerateYear}
        lastNews={lastNews}
      >
        <>
          {
            redactorNews
              .slice(0, 5)
              .map((item) => <NewsLine {...item} key={`rubric-${item.id}`} disableComment={disableComment} picModerateYear={picModerateYear} />)
          }
        </>
        <>
          {
            redactorNews
              .slice(5, 10)
              .map((item) => <NewsLine {...item} key={`rubric-${item.id}`} disableComment={disableComment} picModerateYear={picModerateYear} />)
          }
        </>
        <>
          {
            redactorNews
              .slice(10, 15)
              .map((item) => <NewsLine {...item} key={`rubric-${item.id}`} disableComment={disableComment} picModerateYear={picModerateYear} />)
          }
        </>
      </ProjectInnerLayout>
      <PaginationWithLoadMore
        searchRequest={query}
        totalCountPages={totalCountPages}
        currentPage={currentPage}
        routerPush={push}
        rubric={`redactors/${redactorId}`}
        LoadMoreComponent={LoadMore}
        loadDataApi={apiGetArticles}
      />
    </ProjectLayout>
  );
});

export const getServerSideProps = (async (context) => {
  const { resolvedUrl }: any = context;
  const { page }: any = context.query;
  const redactorId = context.query['redactor-id'];
  let redactorNews = [];
  let redactorUserData = [];
  let disableComment = 0;
  let picModerateYear = null;
  let seoParametersProps = null;
  let totalCountPages = null;
  let lastNews = null;

  try {
    const { data: newsList, headers }: any = await apiGetArticles(redactorId, page);
    redactorNews = newsList;
    totalCountPages = headers ? headers['x-pagination-page-count'] : 0;
    redactorUserData = await apiGetRedactorUserData(redactorId);
    getOnlySelectedKeys(redactorNews || [], NewsLineKeys);
    disableComment = await apiGetChatSettings('disableComment');
    picModerateYear = await apiGetPicModerateYear();

    const news = await apiGetAllNews();
    lastNews = 'left_bar' in news && Array.isArray(news.left_bar) ? news.left_bar : [];

    getOnlySelectedKeys([
      ...lastNews || [],
    ], ArticleInColumns);

    if (redactorNews.length === 0) {
      return {
        notFound: true,
      };
    }

    if ('statusCode' in redactorUserData && redactorUserData.statusCode === 404) {
      return {
        notFound: true,
      };
    }
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
    seoParametersProps = seoParameters;
  }
  return {
    props: {
      redactorId,
      redactorNews,
      redactorUserData,
      disableComment,
      picModerateYear,
      seoParametersProps,
      totalCountPages,
      lastNews,
      currentPage: page || 1,
    },
  };
});

export default RedactorPage;
