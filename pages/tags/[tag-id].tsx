import React from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ProjectLayout } from '../../layouts/project-layout';
import { ProjectInnerLayout } from '../../layouts/project-inner-layout';
import { PageTitle } from '../../components/page-title';
import { NewsLine } from '../../components/news-line';
import { apiGetTagName, apiGetTags } from '../../services/tag';
import { apiGetSeoModuleSettings } from '../../services/seo';
import {
  apiGetAllNews,
  apiGetPicModerateYear,
  apiGetChatSettings,
  apiGetRedirects,
} from '../../services/services';
import { WithLoadMore } from '../../hocs/with-load-more/with-load-more';
import { apiGetBanner, apiPostBannerStat } from '../../services/banner';
import { getBanners } from '../../utils/get-banners';
import { getOnlySelectedKeys } from '../../utils/get-only-selected-keys';
import { ArticleInColumns, BannerKeys, NewsLineKeys } from '../../utils/consts';
import { bannersCountInPositionSelector } from '../../store/banner-position/banner-position-selectors';

const LoadMore = WithLoadMore(NewsLine);

const PaginationWithLoadMore = dynamic(
  () => import('../../components/pagination-with-load-more/pagination-with-load-more'),
  { loading: () => <p>...</p> },
);

type Props = {
  tagName: any,
  tagNews: any,
  tagId: number,
  totalCountPages: number,
  lastNews: any,
  disableComment: string | number,
  picModerateYear: number,
  currentPage: number,
  seoParametersProps: any,
};

const TagPage: React.FC<Props> = React.memo(({
  tagId,
  tagNews,
  tagName,
  totalCountPages,
  lastNews,
  disableComment,
  picModerateYear,
  currentPage,
  seoParametersProps,
}) => {
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
  const [fetchDataContent, setFetchDataContent] = React.useState(null);
  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);

  const { query, push } = useRouter();

  const tag = tagName.length > 0 ? tagName[0].name : null;
  const subTitle = 'title' in seoParametersProps && seoParametersProps?.title?.length > 0 ? seoParametersProps.title : `${tag}`;
  const titleH1 = 'h1' in seoParametersProps && seoParametersProps?.h1?.length > 0 && seoParametersProps.h1;
  const description = `Последние новости по тегу ${tag} | Главные события города и области`;

  const getFetchContent = async (queryProps) => {
    const { page } = queryProps;
    if (page) {
      await apiGetTags(queryProps)
        .then(({ data }: any) => {
          setFetchDataContent(data);
        });
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
        bannerIdRight: BannerKeys.BANNER_RIGHT,
        bannerIdCentral: BannerKeys.BANNER_CENTRAL,
        bannerIdMediaMetrika: BannerKeys.BANNER_MEDIAMETRIKA,
        countCentral: Math.floor(tagNews.length / 5),
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

    getFetchContent(query);
  }, [query]);

  const fetchContentData = !fetchDataContent ? tagNews : fetchDataContent;

  return (
    <ProjectLayout
      subTitle={subTitle}
      description={description}
      currentPage={currentPage}
      bannersTop={bannersTop}
      bannersPush={bannersPush}
      bannersPushFullSecond={bannersPushFullSecond}
      bannersPushFullThird={bannersPushFullThird}
      bannersFix={bannersFix}
      bannersFixSecond={bannersFixSecond}
    >
      <PageTitle
        title={!titleH1 ? 'Новости по тэгу' : titleH1}
        type="tag"
        tag={!titleH1 && tag}
      />
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
            fetchContentData && fetchContentData
              .slice(0, 5)
              .map((item) => <NewsLine {...item} key={`rubric-${item.id}`} disableComment={disableComment} picModerateYear={picModerateYear} />)
          }
        </>
        <>
          {
            fetchContentData && fetchContentData
              .slice(5, 10)
              .map((item) => <NewsLine {...item} key={`rubric-${item.id}`} disableComment={disableComment} picModerateYear={picModerateYear} />)
          }
        </>
        <>
          {
            fetchContentData && fetchContentData
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
        rubric={`tags/${tagId}`}
        LoadMoreComponent={LoadMore}
        loadDataApi={apiGetTags}
      />
    </ProjectLayout>
  );
});

export const getServerSideProps = (async (context) => {
  const { resolvedUrl }: any = context;
  const { page }: any = context.query;
  const tagId = context.query['tag-id'];

  let tagNews = [];
  let tagName = '';
  let totalCountPages = 0;
  let disableComment = 0;
  let picModerateYear = null;
  let seoParametersProps = null;
  let lastNews = null;

  try {
    const redirect = await apiGetRedirects(`/${tagId}`);
    if (redirect.length > 0) {
      return {
        props: {},
        redirect: {
          permanent: true,
          destination: redirect[0].to,
        },
      };
    }
  } catch (err) {
    console.log(null);
  }

  try {
    const { data: tags, headers }:any = await apiGetTags(context.query);
    tagNews = tags;
    getOnlySelectedKeys(tagNews || [], NewsLineKeys);
    totalCountPages = headers['x-pagination-page-count'];
    tagName = await apiGetTagName(tagId);
    disableComment = await apiGetChatSettings('disableComment');
    picModerateYear = await apiGetPicModerateYear();

    const news = await apiGetAllNews();
    lastNews = 'left_bar' in news && Array.isArray(news.left_bar) ? news.left_bar : [];

    getOnlySelectedKeys([
      ...lastNews || [],
    ], ArticleInColumns);

    if (tagNews.length === 0) {
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
      tagId,
      tagNews,
      tagName,
      totalCountPages,
      lastNews,
      disableComment,
      picModerateYear,
      seoParametersProps,
      currentPage: page || 1,
    },
  };
});

export default TagPage;
