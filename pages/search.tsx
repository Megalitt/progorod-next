import React from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { apiGetSearchResult } from '../services/search';
import { ProjectLayout } from '../layouts/project-layout';
import { WithSearchLive } from '../hocs/with-search-live/with-search-live';
import { getBanners } from '../utils/get-banners';
import { apiGetBanner, apiPostBannerStat } from '../services/banner';
import { ArticleInColumns, BannerKeys } from '../utils/consts';
import { apiGetPicModerateYear, apiGetChatSettings, apiGetAllNews } from '../services/services';
import { bannersCountInPositionSelector } from '../store/banner-position/banner-position-selectors';
import { getOnlySelectedKeys } from '../utils/get-only-selected-keys';

const SearchLiveResult = dynamic(
  () => import('../components/search/search-live').then((mod) => mod.SearchLiveResult),
  {
    loading: () => <p>...</p>,
    ssr: false,
  },
);

type PostsType = {
  id: number,
  title: string,
  image: string,
  uri: string,
  empty_template: boolean | number,
  comments_count: number,
  publish_at: number,
  tags: string,
};

type SearchResultProps = {
  posts: Array<PostsType>;
  lastNews: any,
  searchRequest: string;
  totalCountPages: number;
  currentPage: number;
  disableComment: string | number;
  picModerateYear: number;
};

const SearchLive = WithSearchLive(SearchLiveResult);
const Search: React.FC<SearchResultProps> = React.memo(({
  posts,
  lastNews,
  searchRequest,
  totalCountPages,
  disableComment,
  picModerateYear,
  currentPage,
}) => {
  const { query } = useRouter();
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
  const [fetchDataContent, setFetchDataContent] = React.useState(null);
  const [fetchTotalCountPages, setFetchTotalCountPages] = React.useState(totalCountPages);

  const handleGetFetchContent = async ({ page = 1, searchRequest }: any) => {
    if (page) {
      await apiGetSearchResult({ searchRequest }, page, 15)
        .then(({ data, headers }: any) => {
          setFetchDataContent(data);
          setFetchTotalCountPages(headers['x-pagination-page-count']);
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
        countCentral: Math.floor(posts.length / 5),
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
  }, [posts, query]);

  React.useEffect(() => {
    handleGetFetchContent(query);
  }, [query]);

  return (
    <ProjectLayout
      currentPage={currentPage}
      bannersTop={bannersTop}
      bannersPush={bannersPush}
      bannersPushFullSecond={bannersPushFullSecond}
      bannersPushFullThird={bannersPushFullThird}
      bannersFix={bannersFix}
      bannersFixSecond={bannersFixSecond}
    >
      <SearchLive
        lastNews={lastNews}
        posts={!fetchDataContent ? posts : fetchDataContent}
        searchRequest={searchRequest}
        totalCountPages={fetchTotalCountPages}
        currentPage={currentPage}
        rightMainBanners={rightMainBanners}
        bannersRight={bannersRight}
        bannersCentral={bannersCentral}
        bannersMediaMetrika={bannersMediaMetrika}
        disableComment={disableComment}
        picModerateYear={picModerateYear}
      />
    </ProjectLayout>
  );
});

export const getServerSideProps = async ({
  query: {
    page,
    searchRequest,
  },
}: any) => {
  let posts = [];
  let totalCountPages = 0;
  let disableComment = 0;
  let picModerateYear = null;
  let lastNews = null;

  try {
    const { data, headers }: any = await apiGetSearchResult({ searchRequest }, page, 15);
    posts = data;
    totalCountPages = headers['x-pagination-page-count'];
    disableComment = await apiGetChatSettings('disableComment');
    picModerateYear = await apiGetPicModerateYear();

    const news = await apiGetAllNews();
    lastNews = 'left_bar' in news && Array.isArray(news.left_bar) ? news.left_bar : [];

    getOnlySelectedKeys([
      ...lastNews || [],
    ], ArticleInColumns);
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts,
      lastNews,
      searchRequest: searchRequest || '',
      currentPage: page || 1,
      totalCountPages,
      disableComment,
      picModerateYear,
    },
  };
};

export default Search;
