import React from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { ProjectLayout } from '../../layouts/project-layout';
import { ProjectInnerLayout } from '../../layouts/project-inner-layout';
import { ProjectCol2Layout } from '../../layouts/project-col2-layout';
import { ArticleLayout } from '../../layouts/article-layout';
import { RowsLayout } from '../../layouts/rows-layout';
import { StaticLayout } from '../../layouts/static-layout';

import { PageTitle } from '../../components/page-title';
import { NewsCard } from '../../components/news-card';
import { NewsColumn } from '../../components/news-column';
import { NewsLine } from '../../components/news-line';
import { Banner } from '../../components/banner';

import {
  apiGetAllNews,
  apiGetRedirects,
  apiGetChatSettings,
  apiGetPicModerateYear,
} from '../../services/services';
import {
  apiGetRubricCards,
  apiGetStaticReviewNews,
  apiGetRubricDescription,
  apiGetStaticNews,
  apiGetRubricCardsAll,
} from '../../services/rubric';
import { apiGetSeoModuleSettings } from '../../services/seo';
import { apiGetBanner, apiPostBannerStat } from '../../services/banner';

import { promotionNewsSelector } from '../../store/general-news/general-news-selectors';
import { bannersCountInPositionSelector } from '../../store/banner-position/banner-position-selectors';
import { createMarkup } from '../../utils/core/create-markup';
import { domainSelector } from '../../store/seo/seo-selectors';
import { WithLoadMore } from '../../hocs/with-load-more/with-load-more';

import {
  ArticleInColumns,
  BannerKeys,
  NewsLineKeys,
  NewsLineReviewKeys,
  PAGES_IMAGE_RELEASE_DATE,
} from '../../utils/consts';
import { getBanners } from '../../utils/get-banners';
import { NewsLineReview } from '../../components/news-line-review';
import { getSubstrByWord } from '../../utils/get-substr-by-word';
import { getOnlySelectedKeys } from '../../utils/get-only-selected-keys';

const LoadMore = WithLoadMore(NewsLine);

const PaginationWithLoadMore = dynamic(
  () => import('../../components/pagination-with-load-more/pagination-with-load-more'),
  { loading: () => <p>...</p> },
);

type Props = {
  fetchData: any,
  lastNews: any,
  popularNews: any,
  currentPage: number,
  resolvedUrl: string,
};

const Rubric: React.FC<Props> = React.memo(({
  fetchData,
  lastNews,
  popularNews,
  currentPage,
  resolvedUrl,
}) => {
  const promotionNews = useSelector(promotionNewsSelector);//TODO не используется, нужно убрать
  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);
  const domain = useSelector(domainSelector);
  const refContent = React.useRef(null);
  const refRightColumn = React.useRef(null);

  const { query, push } = useRouter();

  const [bannersTop, setBannersTop] = React.useState([]);
  const [bannersPush, setBannersPush] = React.useState([]);
  const [bannersPushFull, setBannersPushFull] = React.useState([]);
  const [bannersPushFullSecond, setBannersPushFullSecond] = React.useState([]);
  const [bannersPushFullThird, setBannersPushFullThird] = React.useState([]);
  const [bannersFix, setBannersFix] = React.useState([]);
  const [bannersFixSecond, setBannersFixSecond] = React.useState([]);
  const [rightMainBanners, setRightMainBanners] = React.useState([]);
  const [bannersRight, setBannersRight] = React.useState([]);
  const [bannersCentral, setBannersCentral] = React.useState([]);
  const [bannersMediaMetrika, setBannersMediaMetrika] = React.useState([]);
  const [fetchDataContent, setFetchDataContent] = React.useState(null);

  const getFetchContent = async (query: any) => {
    if (query) {
      await apiGetRubricCards(query)
        .then(({ data }: any) => {
          if (Array.isArray(data) && data.length > 0) {
            setFetchDataContent(data);
          }
        });
    }
  };

  React.useEffect(() => {
    if (fetchData.type === 'rubrics') {
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
          countCentral: Math.floor(fetchData.content.length / 5),
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
        setBannersPush(bannersPush);
        setBannersPushFullSecond(bannersPushFullSecond);
        setBannersPushFullThird(bannersPushFullThird);
        setBannersFix(bannersFix);
        setBannersFixSecond(bannersFixSecond);
        setRightMainBanners(bannersRightMain);
        setBannersRight(bannersRight);
        setBannersCentral(bannersCentral);
        setBannersMediaMetrika(bannersMediaMetrika);

        setTimeout(() => {
          apiPostBannerStat(formData);
        }, 10000);
      });

      getFetchContent(query);
    }

    if (fetchData.type === 'static') {
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
        bannersPushFull,
        bannersPushFullSecond,
        bannersPushFullThird,
        bannersFix,
        bannersFixSecond,
        bannersRightMain,
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

        setTimeout(() => {
          apiPostBannerStat(formData);
        }, 10000);
      });
    }
  }, [query]);

  switch (fetchData.type) {
    case 'rubrics': {
      let subTitle = '';
      let titleH1 = '';

      if (fetchData.rubric === 'articles') {
        subTitle = fetchData.seoParameters?.title?.length > 0 ? fetchData.seoParameters.title : 'Все новости';
        titleH1 = fetchData.seoParameters?.h1?.length > 0 ? fetchData.seoParameters.h1 : 'Все новости';
      } else if (Array.isArray(fetchData.content) && fetchData.content.length > 0 && fetchData.content[0]) {
        subTitle = fetchData.seoParameters?.title?.length > 0 ? fetchData.seoParameters.title : `${fetchData.content[0]?.rubric_name}`;
        titleH1 = fetchData.seoParameters?.h1?.length > 0 ? fetchData.seoParameters.h1 : `${fetchData.content[0]?.rubric_name}`;
      }
      const fetchContentData = !fetchDataContent ? fetchData.content : fetchDataContent;
      return (
        <>
          <ProjectLayout
            subTitle={subTitle}
            currentPage={currentPage}
            bannersTop={bannersTop}
            bannersPush={bannersPush}
            bannersPushFull={bannersPushFull}
            bannersPushFullSecond={bannersPushFullSecond}
            bannersPushFullThird={bannersPushFullThird}
            bannersFix={bannersFix}
            bannersFixSecond={bannersFixSecond}
            seoForPage={fetchData.seoParameters}
          >
            <PageTitle
              title={titleH1}
              type="rubric"
              description={fetchData.description.length > 0 ? fetchData.description[0] : null}
            />
            <ProjectInnerLayout
              bannersRight={bannersRight}
              rightMainBanners={rightMainBanners}
              bannersCentral={bannersCentral}
              bannersMediaMetrika={bannersMediaMetrika}
              picModerateYear={fetchData.picModerateYear}
              lastNews={lastNews}
            >
              <>
                {
                  fetchContentData && fetchContentData
                    .slice(0, 5)
                    .map((item) => <NewsLine {...item} key={`rubric-${item.id}`} disableComment={fetchData.disableComment} picModerateYear={fetchData.picModerateYear} />)
                }
              </>
              <>
                {
                  fetchContentData && fetchContentData
                    .slice(5, 10)
                    .map((item) => <NewsLine {...item} key={`rubric-${item.id}`} disableComment={fetchData.disableComment} picModerateYear={fetchData.picModerateYear} />)
                }
              </>
              <>
                {
                  fetchContentData && fetchContentData
                    .slice(10, 15)
                    .map((item) => <NewsLine {...item} key={`rubric-${item.id}`} disableComment={fetchData.disableComment} picModerateYear={fetchData.picModerateYear} />)
                }
              </>
            </ProjectInnerLayout>
            <PaginationWithLoadMore
              searchRequest={query}
              totalCountPages={fetchData.totalCountPages}
              currentPage={currentPage}
              routerPush={push}
              rubric={fetchData.rubric}
              LoadMoreComponent={LoadMore}
              loadDataApi={apiGetRubricCards}
            />
          </ProjectLayout>
        </>
      );
    }
    case 'static': {
      return (
        <>
          <ProjectLayout
            bannersTop={bannersTop}
            bannersPush={bannersPush}
            bannersPushFull={bannersPushFull}
            bannersPushFullSecond={bannersPushFullSecond}
            bannersFix={bannersFix}
            bannersFixSecond={bannersFixSecond}
          >
            <Head>
              <title key="title">{fetchData.content.title}</title>
              <meta name="keywords" content={fetchData.content.kw} />
              <meta name="description" content={fetchData.content.ds} key="description" />
              <meta property="og:type" content="article" key="og:type" />
              <meta property="og:title" content={fetchData.content?.title} key="og:title" />
              <meta property="og:description" content={fetchData.content?.ds} key="og:description" />
              <meta name="twitter:title" content={fetchData.content?.title} key="twitter:title" />
              <meta name="twitter:description" content={fetchData.content?.ds} key="twitter:description" />
              <meta
                property="twitter:image:src"
                content={`${+fetchData.content?.data > PAGES_IMAGE_RELEASE_DATE
                  ? `https://${domain}${fetchData?.content?.image_pagepictitle}`
                  : `https://${domain}/img/no-photo-schema-org.jpg`}`}
                key="twitter:image:src"
              />
              <meta
                property="og:image"
                content={`${+fetchData.content?.data > PAGES_IMAGE_RELEASE_DATE
                  ? `https://${domain}${fetchData?.content?.image_pagepictitle}`
                  : `https://${domain}/img/no-photo-schema-org.jpg`}`}
                key="og:image"
              />
              <meta property="og:image:width" content="800" key="og:image:width" />
              <meta property="og:image:height" content="400" key="og:image:height" />
              {resolvedUrl === '/page64' && domain === 'progorod43.ru' && <meta name="robots" content="noindex" />}
              <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={createMarkup(`{
                "@context":"http://schema.org",
                "startDate": "",
                "@graph": [
                    {
                      "@type": "NewsArticle",
                      "@id": "https://${domain}/${fetchData?.rubric}",
                      "headline": "${getSubstrByWord(fetchData.content?.title.replace(/(<(\/?[^>]+)>)/g, '').replace(/"/g, '\\"'))}",
                      "datePublished":"${new Date(+fetchData.content?.data * 1000).toISOString()}",
                      "text": "${getSubstrByWord(fetchData.content?.text.replace(/(<(\/?[^>]+)>)/g, '').replace(/"/g, '\\"'))}",
                      "url": "https://${domain}/${fetchData?.rubric}",
                      "image": "${+fetchData.content?.data > PAGES_IMAGE_RELEASE_DATE
                  ? `https://${domain}${fetchData?.content?.image_pagepictitle}`
                  : `https://${domain}/img/no-photo-schema-org.jpg`}"
                    }
                  ]
               }
              `)}
                key="product-jsonld"
              />
            </Head>
            <ProjectCol2Layout>
              <StaticLayout refContent={refContent}>
                <ArticleLayout>
                  <h1>{fetchData.content.name}</h1>
                  <div dangerouslySetInnerHTML={createMarkup(fetchData.content.text)} />
                </ArticleLayout>
              </StaticLayout>
              <RowsLayout>
                <div ref={refRightColumn}>
                  {rightMainBanners.length > 0 && (
                    <div className="contentRightMainBanner">
                      <Banner {...rightMainBanners[0]} />
                    </div>
                  )}
                  {/* TODO не используется, нужно убрать */}
                  {promotionNews.length > 0 && <NewsCard {...promotionNews[0]} picModerateYear={fetchData.picModerateYear} />}
                </div>
                <NewsColumn
                  title="Популярное"
                  news={[...popularNews]}
                  columnHeight={750}
                />
              </RowsLayout>
            </ProjectCol2Layout>
          </ProjectLayout>
        </>
      );
    }
    case 'static_0': {
      return (
        <>
          <ProjectLayout
            bannersTop={bannersTop}
            bannersPush={bannersPush}
            bannersPushFull={bannersPushFull}
            bannersPushFullSecond={bannersPushFullSecond}
            bannersFix={bannersFix}
            bannersFixSecond={bannersFixSecond}
          >
            <Head>
              <title key="title">{fetchData.content.title}</title>
              <meta name="keywords" content={fetchData.content?.kw} />
              <meta name="description" content={fetchData.content?.ds} key="description" />
              <meta property="og:type" content="article" key="og:type" />
              <meta property="og:title" content={fetchData.content?.title} key="og:title" />
              <meta property="og:description" content={fetchData.content?.ds} key="og:description" />
              <meta name="twitter:title" content={fetchData.content?.title} key="twitter:title" />
              <meta name="twitter:description" content={fetchData.content?.ds} key="twitter:description" />
              <meta
                property="twitter:image:src"
                content={`${+fetchData.content?.data > PAGES_IMAGE_RELEASE_DATE
                  ? `https://${domain}${fetchData?.content?.image_pagepictitle}`
                  : `https://${domain}/img/no-photo-schema-org.jpg`}`}
                key="twitter:image:src"
              />
              <meta
                property="og:image"
                content={`${+fetchData.content?.data > PAGES_IMAGE_RELEASE_DATE
                  ? `https://${domain}${fetchData?.content?.image_pagepictitle}`
                  : `https://${domain}/img/no-photo-schema-org.jpg`}`}
                key="og:image"
              />
              <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={createMarkup(`{
                "@context":"http://schema.org",
                "startDate": "",
                "@graph": [
                    {
                      "@type":"BreadcrumbList",
                      "itemListElement":[
                          {
                            "@type":"ListItem",
                            "position":1,
                            "item":{
                              "@id":"//${domain}/${fetchData?.rubric}",
                              "name":"${fetchData.content?.title}"
                              }
                            }
                          ]
                      },
                      {
                      "@type": "NewsArticle",
                      "@id": "https://${domain}/${fetchData?.rubric}",
                      "headline": "${getSubstrByWord(fetchData.content?.title.replace(/(<(\/?[^>]+)>)/g, '').replace(/"/g, '\\"'))}",
                      "datePublished":"${new Date(+fetchData.content?.data * 1000).toISOString()}",
                      "text": "${getSubstrByWord(fetchData.content?.text.replace(/(<(\/?[^>]+)>)/g, '').replace(/"/g, '\\"'))}",
                      "url": "https://${domain}/${fetchData?.rubric}",
                      "image": "${+fetchData.content?.data > PAGES_IMAGE_RELEASE_DATE
                  ? `https://${domain}${fetchData?.content?.image_pagepictitle}`
                  : `https://${domain}/img/no-photo-schema-org.jpg`}"
                      }
                  ]
               }
              `)}
                key="product-jsonld"
              />
            </Head>
            <StaticLayout>
              <ArticleLayout>
                <h1>{fetchData.content.name}</h1>
                <div dangerouslySetInnerHTML={createMarkup(fetchData.content.text)} />
              </ArticleLayout>
            </StaticLayout>
          </ProjectLayout>
        </>
      );
    }
    case 'article_review': {
      const subTitle = 'title' in fetchData.seoParameters && fetchData.seoParameters?.title?.length > 0 ? fetchData.seoParameters.title : 'Материалы';
      const titleH1 = 'h1' in fetchData.seoParameters && fetchData.seoParameters?.h1?.length > 0 ? fetchData.seoParameters.h1 : 'Материалы';
      return (
        <ProjectLayout
          subTitle={subTitle}
          bannersTop={bannersTop}
          bannersPush={bannersPush}
          bannersPushFullSecond={bannersPushFullSecond}
          bannersFix={bannersFix}
          bannersFixSecond={bannersFixSecond}
        >
          <PageTitle
            title={titleH1}
            type="rubric"
          />
          <ProjectInnerLayout
            rightMainBanners={rightMainBanners}
            bannersRight={bannersRight}
            bannersCentral={bannersCentral}
            bannersMediaMetrika={bannersMediaMetrika}
            picModerateYear={fetchData.picModerateYear}
            lastNews={lastNews}
          >
            <>
              {
              fetchData.content && fetchData.content
                .slice(0, 5)
                .map((item) => <NewsLineReview {...item} key={`rubric-${item.id}`} />)
            }
            </>
            <>
              {
              fetchData.content && fetchData.content
                .slice(5, 10)
                .map((item) => <NewsLineReview {...item} key={`rubric-${item.id}`} />)
            }
            </>
            <>
              {
              fetchData.content && fetchData.content
                .slice(10, 15)
                .map((item) => <NewsLineReview {...item} key={`rubric-${item.id}`} />)
            }
            </>
          </ProjectInnerLayout>

          <PaginationWithLoadMore
            searchRequest={query}
            totalCountPages={fetchData.totalCountPages}
            currentPage={currentPage}
            routerPush={push}
            rubric={`${fetchData.rubric}?key=article_review`}
            LoadMoreComponent={LoadMore}
            loadDataApi={apiGetStaticReviewNews}
          />
        </ProjectLayout>
      );
    }

    default: {
      return <p>404</p>;
    }
  }
});

export const getServerSideProps = (async (context) => {
  const { rubric, page, key }: any = context.query;
  const { resolvedUrl }: any = context;
  let lastNews = null;
  let popularNews = null;

  if (rubric === 'cityfaces') {
    try {
      return {
        props: {},
        redirect: {
          permanent: false,
          destination: '/concurs',
        },
      };
    } catch (err) {
      console.log(err);
      return {
        notFound: true,
      };
    }
  }

  const fetchData = {
    type: 'error',
    content: null,
    description: [],
    rubric,
    totalCountPages: null,
    disableComment: null,
    picModerateYear: null,
    seoParameters: null,
  };

  try {
    const redirect = await apiGetRedirects(`/${rubric}`);
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
    const getNewsCards = async (rubric) => {
      if (rubric === 'articles') {
        return apiGetRubricCardsAll(page);
      }
      return apiGetRubricCards(context.query);
    };
    const { data: newsList, headers }: any = await getNewsCards(rubric);
    const staticNews = await apiGetStaticNews(rubric);
    const disableComment = await apiGetChatSettings('disableComment');
    fetchData.disableComment = disableComment;
    const picModerateYear = await apiGetPicModerateYear();
    fetchData.picModerateYear = picModerateYear;
    const news = await apiGetAllNews();
    popularNews = 'most_viewed' in news && Array.isArray(news.most_viewed) ? news.most_viewed : [];
    lastNews = 'left_bar' in news && Array.isArray(news.left_bar) ? news.left_bar : [];

    getOnlySelectedKeys([
      ...lastNews || [],
      ...popularNews || [],
    ], ArticleInColumns);

    if ('name' in staticNews) {
      if (staticNews.design === '0') {
        fetchData.type = 'static';
      } else if (staticNews.design === 'empty') {
        fetchData.type = 'empty';
        return {
          props: {},
          redirect: {
            permanent: true,
            destination: `/pages/${rubric}`,
          },
        };
      } else {
        fetchData.type = 'static_0';
      }
      fetchData.content = await staticNews;
    } else if (key) {
      fetchData.type = 'article_review';
      const { data: newsList, headers }: any = await apiGetStaticReviewNews(key, page);
      const newsAwait = await newsList;
      getOnlySelectedKeys(newsAwait || [], NewsLineReviewKeys);
      fetchData.content = await newsList;
      fetchData.totalCountPages = headers ? headers['x-pagination-page-count'] : 0;
      if (!newsList) {
        return {
          notFound: true,
        };
      }
    } else {
      fetchData.type = 'rubrics';
      fetchData.description = await apiGetRubricDescription(rubric);
      const newsAwait = await newsList;
      getOnlySelectedKeys(newsAwait || [], NewsLineKeys);
      fetchData.content = newsAwait;
      fetchData.totalCountPages = headers ? headers['x-pagination-page-count'] : 0;
      if (!newsList) {
        return {
          notFound: true,
        };
      }
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
    fetchData.seoParameters = seoParameters;
  }
  return {
    props: {
      fetchData: JSON.parse(JSON.stringify(fetchData)),
      lastNews,
      popularNews,
      currentPage: page || 1,
      resolvedUrl,
    },
  };
});

export default Rubric;
