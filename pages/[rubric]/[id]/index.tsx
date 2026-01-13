import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { ProjectLayout } from '../../../layouts/project-layout';
import { ProjectCol2Layout } from '../../../layouts/project-col2-layout';
import { ProjectCol3Layout } from '../../../layouts/project-col3-layout';
import { RowsLayout } from '../../../layouts/rows-layout';
import { SimpleLayout } from '../../../layouts/simple-layout';

import { Head404 } from '../../../components/head-404';
import { ErrorCustom } from '../../../components/error-custom';
import { NewsCard } from '../../../components/news-card';
import { NewsColumn } from '../../../components/news-column';
import { NewsLine } from '../../../components/news-line';
import { Banner } from '../../../components/banner';
import { Article } from '../../../components/article';
import { Chat } from '../../../components/chat';
import ArticleScrollWrap from '../../../components/article/article-scroll-wrap/article-scroll-wrap';

import { changeOrderInArray } from '../../../utils/banners/change-order-in-array';
import { setNewsViaCount } from '../../../utils/index-news/set-news-via-count';
import {
  apiGetArticle,
  getArticleCaption,
  getPinnedNews,
  getShortUrl,
} from '../../../services/article';
import { apiGetArticleRubricNameById } from '../../../services/amp';
import {
  apiGetAllNews,
  apiGetSuperPromotionNews,
  apiGetBannerInsteadRelatedArticles,
  apiGetPicModerateYear,
  apiGetChatSettings,
  apiGetMinCharacterArticleForShowBanner,
  apiGetCharacterSpacingBannerInArticle,
  apiGetSettingBannerCommArticles,
} from '../../../services/services';

import {
  BannerKeys,
  ImagePath,
  ArticleInnerKeys,
  ArticleRelatedKeys,
  ArticleSuperPromotionKeys,
  ArticleInColumns,
} from '../../../utils/consts';
import { getBanners } from '../../../utils/get-banners';
import { apiGetBanner, apiPostBannerStat } from '../../../services/banner';

import {
  lastNewsCommSelector,
  popularNewsCommSelector,
  promotionComm2NewsSelector,
  promotionCommNewsSelector,
  promotionNewsSelector,
} from '../../../store/general-news/general-news-selectors';
import { loginUserData } from '../../../store/login/login-selectors';

import { columnCenterSelector } from '../../../store/column-height/column-height-selector';
import { domainSelector, seoMainParametersSelector } from '../../../store/seo/seo-selectors';
import { bannersCountInPositionSelector } from '../../../store/banner-position/banner-position-selectors';
import { createMarkup } from '../../../utils/core/create-markup';
import { getTagsArray } from '../../../utils/get-tags-array';
import { getSubstrByWord } from '../../../utils/get-substr-by-word';
import { getTagsMicroData } from '../../../utils/get-tags-micro-data';
import { getOnlySelectedKeys } from '../../../utils/get-only-selected-keys';

type FetchDataType = {
  type: string,
  content: any,
  pinned?: any,
  superPromotion?: any,
  disableComment: number,
  picModerateYear: number,
  disableCommentForAnonim: number,
  isBnnerInsteadRelatedArticles: number | string,
  isSettingBannerCommArticles: number | string,
  minCharacterArticleForShowBanner: number | string,
  characterSpacingBannerInArticle: number | string,
  articleCaption: any,
};

type Props = {
  fetchData: FetchDataType,
  isPreview: boolean,
  isNotFound: boolean,
  rubric: string,
  id: number,
  popularNews: any,
  lastNews: any,
};

const Inner: React.FC<Props> = React.memo(({
  fetchData,
  isPreview,
  isNotFound,
  rubric,
  id,
  popularNews,
  lastNews,
}) => {
  const router = useRouter();

  const [pinnedNews, setPinnedNews] = useState([]);
  const [superPromotionNews, setSuperPromotionNews] = useState([]);
  const [popularColumnHeight, setPopularColumnHeight] = useState(0);
  const [fetchDataContent, setFetchDataContent] = useState(null);
  const [isNoFound, setIsNoFound] = useState(isNotFound);

  const [bannersPush, setBannersPush] = React.useState([]);
  const [bannersPushFullSecond, setBannersPushFullSecond] = React.useState([]);
  const [bannersPushFullThird, setBannersPushFullThird] = React.useState([]);
  const [bannersCentral, setBannersCentral] = React.useState([]);
  const [bannersFix, setBannersFix] = React.useState([]);
  const [bannersFixSecond, setBannersFixSecond] = React.useState([]);
  const [bannersRight, setBannersRight] = React.useState([]);
  const [bannersMediaMetrika, setBannersMediaMetrika] = React.useState([]);
  const [bannersTop, setBannersTop] = React.useState([]);
  const [rightMainBanners, setRightMainBanners] = React.useState([]);
  const [bannersPuls, setPulsBanners] = React.useState([]);
  const [bannersPartner, setPartnerBanners] = React.useState([]);
  const [bannersPartnerFirst, setPartnerBannersFirst] = React.useState([]);
  const [bannersPartnerSecond, setPartnerBannersSecond] = React.useState([]);
  const [bannersPartnerThird, setPartnerBannersThird] = React.useState([]);
  const [bannersPartnerFourth, setPartnerBannersFourth] = React.useState([]);
  const [bannersInnerArticle, setInnerArticleBanners] = React.useState([]);
  const [bannersInnerArticleTop, setInnerArticleTopBanners] = React.useState([]);
  const [bannersInnerArticleAfterTags, setInnerArticleAfterTagsBanners] = React.useState([]);
  const [bannersInsteadMainImageArticles, setBannerInsteadMainImageArticle] = React.useState([]);
  const [bannerInsteadRelatedArticles, setBannerInsteadRelatedArticles] = React.useState([]);

  const domain = useSelector(domainSelector);
  const { cityName, siteName } = useSelector(seoMainParametersSelector);
  const lastNewsHeight = useSelector(columnCenterSelector);
  const userData = useSelector(loginUserData);
  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);

  const popularComm = useSelector(popularNewsCommSelector);
  const lastComm = useSelector(lastNewsCommSelector);
  const rightColumn = useSelector(promotionNewsSelector);//TODO не используется, нужно убрать
  const rightColumnComm = useSelector(promotionCommNewsSelector);
  const rightColumnComm2 = useSelector(promotionComm2NewsSelector);

  const popularNewsMixedWithComm = popularComm.length > 0
    ? setNewsViaCount(popularNews, popularComm, 4)
    : popularNews;
  const lastNewsMixedWithComm = lastComm.length > 0
    ? setNewsViaCount(lastNews, lastComm, 4)
    : lastNews;

  const rightColumnAdvNews = rightColumnComm.length > 0
    ? rightColumnComm.slice(0, 1)
    : rightColumn.slice(0, 1);
  // eslint-disable-next-line no-nested-ternary
  const rightColumnAdvNews2 = rightColumnComm2.length > 0
    ? rightColumnComm2.slice(0, 1)
    : rightColumnComm.length > 0
      ? rightColumn.slice(0, 1)
      : rightColumn.slice(1, 2);

  const handleGetBanners = useCallback((article = {}, isPreview = false) => {
    const articlePreviewContent = article;
    getBanners(
      apiGetBanner,
      {
        bannerIdTop: BannerKeys.BANNER_TOP,
        bannerIdRightMain: BannerKeys.BANNER_MAIN_RIGHT,
        bannerIdRight: BannerKeys.BANNER_RIGHT,
        bannerIdFix: BannerKeys.BANNER_FIX,
        bannerIdFixSecond: BannerKeys.BANNER_FIX_SECOND,
        bannerIdPuhs: BannerKeys.BANNER_PUSH,
        bannerIdPuhsFull: BannerKeys.BANNER_PUSH_FULL,
        bannerIdPuhsFullSecond: BannerKeys.BANNER_PUSH_FULL_SECOND,
        bannerIdPuhsFullThird: BannerKeys.BANNER_PUSH_FULL_THIRD,
        bannerIdCentral: BannerKeys.BANNER_CENTRAL,
        bannerIdMediaMetrika: BannerKeys.BANNER_MEDIAMETRIKA,
        bannerIdPuls: BannerKeys.BANNER_PULS,
        bannerIdPartner: BannerKeys.BANNER_PARTNERS,
        bannerIdPartnerFirst: BannerKeys.BANNER_PARTNERS_FIRST,
        bannerIdPartnerSecond: BannerKeys.BANNER_PARTNERS_SECOND,
        bannerIdPartnerThird: BannerKeys.BANNER_PARTNERS_THIRD,
        bannerIdPartnerFourth: BannerKeys.BANNER_PARTNERS_FOURTH,
        bannerIdInnerArticle: BannerKeys.BANNER_INNER_ARTICLE,
        bannerIdInnerArticleTop: BannerKeys.BANNER_INNER_ARTICLE_TOP,
        bannerIdInnerArticleAfterTags: BannerKeys.BANNER_INNER_ARTICLE_AFTER_TAGS,
        bannerIdInsteadRelatedArticles: BannerKeys.BANNER_INSTEAD_RELATED_ARTICLES,
        bannerIdInsteadMainImageArticles: BannerKeys.BANNER_INSTEAD_MAIN_IMAGE_ARTICLES,
        countArticleInnerTop: 3,
        countCentral: 2,
        bannerRightEnable: fetchData.isSettingBannerCommArticles === 1 ? false : true,
        bannersCountInPosition,
      },
      fetchData,
      articlePreviewContent,
      isPreview,
    ).then(({
      bannersTop,
      bannersRightMain,
      bannersRight,
      bannersFix,
      bannersFixSecond,
      bannersCentral,
      bannersPush,
      bannersPushFullSecond,
      bannersPushFullThird,
      bannersMediaMetrika,
      bannersPuls,
      bannersPartner,
      bannersPartnerFirst,
      bannersPartnerSecond,
      bannersPartnerThird,
      bannersPartnerFourth,
      bannersInnerArticle,
      bannersInnerArticleTop,
      bannersInnerArticleAfterTags,
      bannersInsteadRelatedArticles,
      bannersInsteadMainImageArticles,
      formData,
    }: any) => {
      setBannersTop(bannersTop);
      setRightMainBanners(bannersRightMain);
      setBannersRight(bannersRight);
      setBannersFix(bannersFix);
      setBannersFixSecond(bannersFixSecond);
      setBannersPush(bannersPush);
      setBannersPushFullSecond(bannersPushFullSecond);
      setBannersPushFullThird(bannersPushFullThird);
      setBannersCentral(bannersCentral);
      setBannersMediaMetrika(bannersMediaMetrika);
      setPulsBanners(bannersPuls);
      setPartnerBanners(bannersPartner);
      setPartnerBannersFirst(bannersPartnerFirst);
      setPartnerBannersSecond(bannersPartnerSecond);
      setPartnerBannersThird(bannersPartnerThird);
      setPartnerBannersFourth(bannersPartnerFourth);
      setInnerArticleBanners(bannersInnerArticle);
      setInnerArticleTopBanners(bannersInnerArticleTop);
      setInnerArticleAfterTagsBanners(bannersInnerArticleAfterTags);
      setBannerInsteadRelatedArticles(bannersInsteadRelatedArticles);
      setBannerInsteadMainImageArticle(bannersInsteadMainImageArticles);

      setTimeout(() => {
        apiPostBannerStat(formData);
      }, 10000);
    });
  }, []);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setPopularColumnHeight(0);

      window.addEventListener('load', () => {
        setTimeout(() => {
          setPopularColumnHeight(node.getBoundingClientRect().height - 870);
        }, 3000);
      });

      setTimeout(() => {
        setPopularColumnHeight(node.getBoundingClientRect().height - 870);
      }, 3000);
    }
  }, [fetchData]);

  const handleShowBannersByScroll = () => {
    const articleMainWrap = document.querySelector('#article-main');
    const articleBannersAfterComments = document.querySelector<HTMLElement>('#banners-after-comments');

    if (articleMainWrap && articleBannersAfterComments) {
      if (window.scrollY + window.innerHeight > articleMainWrap.getBoundingClientRect().bottom + window.pageYOffset) {
        setTimeout(() => {
          articleBannersAfterComments.style.cssText = 'max-height: none';
        }, 500);
      }
    }
  };

  const handleGetSuperPromotionNews = useCallback(async () => {
    await apiGetSuperPromotionNews()
      .then((articleSuperPromotion) => {
        getOnlySelectedKeys(articleSuperPromotion, ArticleSuperPromotionKeys);
        if (Array.isArray(articleSuperPromotion) && articleSuperPromotion.length > 0) {
          setSuperPromotionNews(changeOrderInArray(articleSuperPromotion, 'supper_promo'));
        }
      });
  }, []);

  const isArticleMainContainerRef = React.useRef(null);

  useEffect(() => {
    if (!isPreview) {
      handleGetBanners();
    }

    if (window) {
      window.addEventListener('scroll', handleShowBannersByScroll);
    }

    return () => {
      if (window) {
        window.removeEventListener('scroll', handleShowBannersByScroll);
      }
    };
  }, [fetchData, isPreview]);

  useEffect(() => {
    handleGetSuperPromotionNews();
  }, [fetchData]);

  useEffect(() => {
    setPinnedNews(changeOrderInArray(fetchData.pinned, 'pinned_news'));

    return () => setPinnedNews([]);
  }, [fetchData.pinned]);

  const handleGetArticlePreview = useCallback(async () => {
    await apiGetArticle(+router.query.id, router.query.rubric)
      .then(({ article, statusCode }: { article: any, statusCode: number }) => {
        if (statusCode === 200) {
          setFetchDataContent(article);
          setIsNoFound(false);
          handleGetBanners(article, true);
        }
      });
  }, []);

  useEffect(() => {
    if (userData.canModerate) {
      handleGetArticlePreview();
    }
  }, [userData]);

  switch (fetchData.type) {
    case 'article': {
      return !isNoFound ? (
        <>
          <ProjectLayout
            superPromotion={superPromotionNews[0]}
            bannersTop={bannersTop}
            bannersFix={bannersFix}
            bannersFixSecond={bannersFixSecond}
            bannersPush={bannersPush}
            bannersPushFullSecond={bannersPushFullSecond}
            bannersPushFullThird={bannersPushFullThird}
            articleTitle={fetchDataContent?.nameya}
          >
            <div id="article-main">
              {!fetchDataContent && (
              <Head>
                <title key="title">{fetchDataContent ? fetchDataContent.nameya : fetchData.content?.nameya}</title>
                <meta name="keywords" content={fetchData.content?.kw} key="keywords" />
                <meta name="description" content={fetchData.content?.ds} key="description" />
                <meta property="og:type" content="article" key="og:type" />
                <meta property="og:title" content={fetchData.content?.title} key="og:title" />
                <meta property="og:description" content={fetchData.content?.ds} key="og:description" />
                {fetchData.content?.image !== '' && <meta property="og:image" content={`${fetchData.content?.image_picfullsize}`} key="og:image" />}
                {fetchData.content?.image === '' && <meta property="og:image" content={`${ImagePath.IMG_OG}${id}.png`} key="og:image" />}
                <meta property="og:image:width" content="800" key="og:image:width" />
                <meta property="og:image:height" content="400" key="og:image:height" />
                <meta property="og:site_name" content={`${siteName?.value} ${cityName?.value}`.trim()} />
                <meta name="twitter:title" content={fetchData.content?.title} key="twitter:title" />
                <meta name="twitter:description" content={fetchData.content?.ds} key="twitter:description" />
                {fetchData.content?.image !== '' && <meta name="twitter:image:src" content={`${fetchData.content?.image_picfullsize}`} key="twitter:image:src" />}
                {fetchData.content?.image === '' && <meta name="twitter:image:src" content={`${ImagePath.IMG_OG}${id}.png`} key="twitter:image:src" />}
                <link
                  key="canonical"
                  rel="canonical"
                  href={`https://${domain}/${rubric}/${router.query.id}${fetchData.content && fetchData.content.erid && fetchData.content.erid.length > 0 ? `?erid=${fetchData.content.erid}` : ''}`}
                />
                <link
                  rel="amphtml"
                  href={`https://${domain}/amp/${router.query.id}${fetchData.content && fetchData.content.erid && fetchData.content.erid.length > 0 ? `?erid=${fetchData.content.erid}` : ''}`}
                />
                <meta name="robots" content="max-image-preview:large" key="robots" />
                <meta name="author" content={`https://${domain}/redactors/${fetchData.content?.uid}`} key="author" />
                <meta property="og:locale" content="ru_RU" />
                <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />

                {fetchData.content && (
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={createMarkup(`{
                  "@context":"http://schema.org",
                  "@type": "Article",
                  "headline": "${getSubstrByWord(fetchData.content?.title.replace(/(<(\/?[^>]+)>)/g, '').replace(/"/g, '\\"'))}",
                  "image": "${fetchData.content?.image !== '' ? `https://${domain}${fetchData.content?.image_picfullsize}` : `https://${domain}${ImagePath.IMG_OG}${id}.png`}",
                  "author": [
                    {
                      "@type":"Person",
                      "name":"${fetchData.content?.redactor}",
                      "url": "https://${domain}/redactors/${fetchData.content?.uid}"
                    }
                  ],
                  "@graph": [
                      {
                        "@type":"BreadcrumbList",
                        "itemListElement":[
                            {
                              "@type":"ListItem",
                              "position":1,
                              "item":{
                                "@id":"https://${domain}/${rubric}",
                                "name":"${fetchData.content?.rubric_name}"
                               }
                             }
                           ]
                       },
                       {
                        "@type": "NewsArticle",
                        "@id": "https://${domain}/${rubric}/${id}",
                        "headline": "${fetchData.content?.title && getSubstrByWord(fetchData.content?.title.replace(/(<(\/?[^>]+)>)/g, '').replace(/"/g, '\\"'))}",
                        "datePublished":"${new Date(+fetchData.content?.publish_at * 1000).toISOString()}",
                        "dateModified":"${new Date(+fetchData.content?.updated_at * 1000).toISOString()}",
                        "text": "${fetchData.content?.text && getSubstrByWord(fetchData.content?.text.replace(/(<(\/?[^>]+)>)/g, '').replace(/"/g, '\\"'))}",
                        "author": [
                             {
                               "@type":"Person",
                               "name":"${fetchData.content?.redactor}",
                               "url": "https://${domain}/redactors/${fetchData.content?.uid}"
                              }
                          ],
                        "about": [${getTagsMicroData(getTagsArray(fetchData.content?.tags))}],
                        "url": "https://${domain}/${rubric}/${id}",
                        "image": "${fetchData.content?.image !== '' ? `https://${domain}${fetchData.content?.image_picfullsize}` : `https://${domain}${ImagePath.IMG_OG}${id}.png`}"
                       }
                   ]
               }
              `)}
                  key="product-jsonld"
                />
                )}
              </Head>
              )}
              <div className="article-next is-current" data-article-id={id} ref={isArticleMainContainerRef}>
                <ProjectCol2Layout>
                  <div ref={measuredRef}>
                    <Article
                      {...fetchDataContent ? { ...fetchDataContent } : { ...fetchData.content }}
                      superPromotion={superPromotionNews[0]}
                      disableComment={fetchData.disableComment}
                      picModerateYear={fetchData.picModerateYear}
                      bannerInsteadRelatedArticles={bannerInsteadRelatedArticles}
                      bannerInsteadMainImageArticles={bannersInsteadMainImageArticles}
                      bannersInnerArticle={bannersInnerArticle}
                      bannersInnerArticleTop={bannersInnerArticleTop}
                      bannersInnerArticleAfterTags={bannersInnerArticleAfterTags}
                      isBnnerInsteadRelatedArticles={fetchData.isBnnerInsteadRelatedArticles}
                      minCharacterArticleForShowBanner={fetchData.minCharacterArticleForShowBanner}
                      characterSpacingBannerInArticle={fetchData.characterSpacingBannerInArticle}
                      isPreview={isPreview}
                      articleCaption={fetchData.articleCaption}
                    />
                  </div>
                  <RowsLayout>
                    <div className="contentRightMainBanner">
                      {rightMainBanners.length > 0 && (
                        <Banner {...rightMainBanners[0]} />
                      )}
                    </div>
                    {
                      superPromotionNews.length > 2
                      && <NewsCard {...superPromotionNews[2]} picModerateYear={fetchData.picModerateYear} />
                    }
                    <NewsColumn
                      title="Популярное"
                      news={[...popularNewsMixedWithComm]}
                      columnHeight={popularColumnHeight}
                    />
                  </RowsLayout>
                </ProjectCol2Layout>
                <ProjectCol3Layout className="project-col3-layout-news">
                  <NewsColumn
                    title="Последние новости"
                    news={[...lastNewsMixedWithComm]}
                    columnHeight={lastNewsHeight}
                  />
                  {
                    fetchData.pinned.length > 0 && fetchData.isSettingBannerCommArticles !== 1 && (
                      pinnedNews.slice(0, 3).map((item) => <NewsLine {...item} key={`line-${item.id}`} disableComment={fetchData.disableComment} picModerateYear={fetchData.picModerateYear} />)
                    )
                  }
                  {bannersRight.length > 0 && fetchData.isSettingBannerCommArticles !== 1 && (
                  <div className={process.env.NEXT_PUBLIC_TITLE_LENGTH === '120' ? 'contentRightStretchBanner120' : 'contentRightStretchBanner140'}>
                    <Banner {...bannersRight[0]} />
                  </div>
                  )}

                  <RowsLayout>
                    {bannersCentral.length > 0 && (
                    <div className="contentCentralBanner">
                      <Banner {...bannersCentral[0]} />
                    </div>
                    )}
                    <Chat
                      link="articles"
                      commentsMode={fetchData.content ? fetchData.content.comments_mode : 0}
                      disableComment={fetchData.disableComment}
                      disableCommentForAnonim={fetchData.disableCommentForAnonim}
                    />
                    <div id="banners-after-comments">
                      {bannersCentral.length > 1 && (
                      <div className="contentCentralBanner">
                        <Banner {...bannersCentral[1]} />
                      </div>
                      )}
                      {bannersPartner.length > 0 && (
                      <div className="contentAfterCommentBanner">
                        <Banner {...bannersPartner[0]} />
                      </div>
                      )}
                      {bannersPartnerFirst.length > 0 && (
                      <div className="contentAfterCommentBanner">
                        <Banner {...bannersPartnerFirst[0]} />
                      </div>
                      )}
                      {bannersPartnerSecond.length > 0 && (
                      <div className="contentAfterCommentBanner">
                        <Banner {...bannersPartnerSecond[0]} />
                      </div>
                      )}
                      {bannersPartnerThird.length > 0 && (
                      <div className="contentAfterCommentBanner">
                        <Banner {...bannersPartnerThird[0]} />
                      </div>
                      )}
                      {bannersPartnerFourth.length > 0 && (
                      <div className="contentAfterCommentBanner">
                        <Banner {...bannersPartnerFourth[0]} />
                      </div>
                      )}
                      {bannersPuls.length > 0 && <Banner {...bannersPuls[0]} />}
                    </div>
                  </RowsLayout>
                  <RowsLayout>
                    {rightColumnAdvNews2.length > 0 && <NewsCard {...rightColumnAdvNews2[0]} picModerateYear={fetchData.picModerateYear} />}
                    {rightColumnAdvNews.length > 0 && <NewsCard {...rightColumnAdvNews[0]} picModerateYear={fetchData.picModerateYear} />}
                    {bannersMediaMetrika.length > 0 && (
                    <div className={process.env.NEXT_PUBLIC_TITLE_LENGTH === '120' ? 'contentRightStretchBanner120' : 'contentRightStretchBanner140'}>
                      <Banner {...bannersMediaMetrika[0]} />
                    </div>
                    )}
                  </RowsLayout>
                </ProjectCol3Layout>
              </div>
              {!isPreview && (
              <ArticleScrollWrap
                id={id}
                isPreview={isPreview}
                lastNews={lastNewsMixedWithComm}
                rightMainBanners={rightMainBanners}
                superPromotionNews={superPromotionNews}
                popularNews={popularNewsMixedWithComm}
                lastNewsHeight={lastNewsHeight}
                disableComment={fetchData.disableComment}
                picModerateYear={fetchData.picModerateYear}
                disableCommentForAnonim={fetchData.disableCommentForAnonim}
                fetchDataPinnedNews={fetchData.pinned}
                fetchArticleCaption={fetchData.articleCaption}
                isBnnerInsteadRelatedArticles={fetchData.isBnnerInsteadRelatedArticles}
                minCharacterArticleForShowBanner={fetchData.minCharacterArticleForShowBanner}
                characterSpacingBannerInArticle={fetchData.characterSpacingBannerInArticle}
              />
              )}
            </div>
          </ProjectLayout>
        </>
      ) : (
        <ProjectLayout>
          <Head404 />
          <SimpleLayout title="404. Страница не найдена">
            <ErrorCustom />
          </SimpleLayout>
        </ProjectLayout>
      );
    }
    default: {
      return (
        <ProjectLayout>
          <Head404 />
          <SimpleLayout title="404. Страница не найдена">
            <ErrorCustom />
          </SimpleLayout>
        </ProjectLayout>
      );
    }
  }
});

export const getServerSideProps = (async (context) => {
  const { rubric, id } = context.query;
  let isPreview = false;
  let isNotFound = true;
  let popularNews = null;
  let lastNews = null;

  const fetchData = {
    type: 'error',
    content: null,
    pinned: [],
    superPromotion: [],
    disableComment: null,
    disableCommentForAnonim: null,
    articleCaption: null,
    picModerateYear: null,
    isBnnerInsteadRelatedArticles: null,
    isSettingBannerCommArticles: null,
    minCharacterArticleForShowBanner: 600,
    characterSpacingBannerInArticle: 700,
  };

  if (rubric === 't') {
    try {
      const shortUrl = await getShortUrl(id);

      if (shortUrl.length > 0) {
        return {
          props: {},
          redirect: {
            permanent: false,
            destination: shortUrl[0].link,
          },
        };
      }
    } catch (err) {
      console.log(err);
      return {
        notFound: true,
      };
    }
  }

  if (rubric === 'cityfaces') {
    try {
      return {
        props: {},
        redirect: {
          permanent: false,
          destination: `/concurs/view/${encodeURIComponent(id.toString())}`,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        notFound: true,
      };
    }
  }

  if (rubric === 'articles') {
    try {
      const rubricName = await apiGetArticleRubricNameById(id);

      return {
        props: {},
        redirect: {
          permanent: false,
          destination: `/${rubricName}/${encodeURIComponent(id.toString())}`,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        notFound: true,
      };
    }
  }

  try {
    const pinnedNews = await getPinnedNews();
    fetchData.pinned = await pinnedNews;

    const articleCaption = await getArticleCaption();
    fetchData.articleCaption = await articleCaption;

    const disableComment = await apiGetChatSettings('disableComment');
    const disableCommentForAnonim = await apiGetChatSettings('disableCommentForAnonim');

    fetchData.disableComment = await disableComment;
    fetchData.disableCommentForAnonim = await disableCommentForAnonim;

    const picModerateYear = await apiGetPicModerateYear();
    fetchData.picModerateYear = picModerateYear;

    const isBnnerInsteadRelatedArticles = await apiGetBannerInsteadRelatedArticles();
    fetchData.isBnnerInsteadRelatedArticles = isBnnerInsteadRelatedArticles;
    const minCharacterArticleForShowBanner = await apiGetMinCharacterArticleForShowBanner();
    fetchData.minCharacterArticleForShowBanner = minCharacterArticleForShowBanner;
    const characterSpacingBannerInArticle = await apiGetCharacterSpacingBannerInArticle();
    fetchData.characterSpacingBannerInArticle = characterSpacingBannerInArticle;
    const isSettingBannerCommArticles = await apiGetSettingBannerCommArticles();
    fetchData.isSettingBannerCommArticles = isSettingBannerCommArticles;

    if (isSettingBannerCommArticles !== 1) {
      const pinnedNews = await getPinnedNews();
      fetchData.pinned = await pinnedNews;
    }

    const news = await apiGetAllNews();
    popularNews = 'most_viewed' in news && Array.isArray(news.most_viewed) ? news.most_viewed : [];
    lastNews = 'left_bar' in news && Array.isArray(news.left_bar) ? news.left_bar : [];

    getOnlySelectedKeys([
      ...lastNews || [],
      ...popularNews || [],
    ], ArticleInColumns);

    await apiGetArticle(id, rubric)
      .then(({ article, statusCode }: { article: any, statusCode: number }) => {
        fetchData.type = 'article';

        if (statusCode === 200) {
          isNotFound = false;
          getOnlySelectedKeys([article] || [], ArticleInnerKeys);

          getOnlySelectedKeys([
            ...article?.relatedArticles || [],
            ...article?.relatedArticles_comm || [],
          ], ArticleRelatedKeys);

          fetchData.content = article;

          if (article && article.publish_until !== null && Date.now() > +article.publish_until * 1000) {
            isPreview = true;
            fetchData.content = null;
            context.res.statusCode = 404;
            isNotFound = true;
          }

          if (+article.isValid === 0) {
            context.res.statusCode = 404;
            isNotFound = true;
          }
        }
      });
  } catch (err) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id,
      fetchData,
      isPreview,
      isNotFound,
      rubric,
      popularNews,
      lastNews,
    },
  };
});

export default Inner;
