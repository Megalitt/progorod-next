import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { wrapper } from '../../../store/store';

import { ProjectLayout } from '../../../layouts/project-layout';
import { ProjectCol2Layout } from '../../../layouts/project-col2-layout';
import { RowsLayout } from '../../../layouts/rows-layout';
import { ServiceLentaLayout } from '../../../layouts/service-lenta-layout';

import { PageTitle } from '../../../components/page-title';
import { NewsCard } from '../../../components/news-card';
import { NewsColumn } from '../../../components/news-column';
import { Banner } from '../../../components/banner';
import { ServiceCard } from '../../../components/services/service-card';
import { AfishaArticle } from '../../../components/services/afisha';
import { Chat } from '../../../components/chat';

import { bannersCountInPositionSelector } from '../../../store/banner-position/banner-position-selectors';

import { apiGetAfishaItemById, apiGetAfishaByCategory } from '../../../services/afisha';
import { apiGetSeoModuleSettings } from '../../../services/seo';
import {
  apiGetSuperPromotionNews,
  apiGetPicModerateYear,
  apiGetChatSettings,
  apiGetAllNews,
} from '../../../services/services';
import { apiGetBanner, apiPostBannerStat } from '../../../services/banner';

import { getBanners } from '../../../utils/get-banners';
import { getOnlySelectedKeys } from '../../../utils/get-only-selected-keys';
import { AfishaList, ArticleInColumns, BannerKeys } from '../../../utils/consts';
import { WithLoadMore } from '../../../hocs/with-load-more/with-load-more';

const LoadMore = WithLoadMore(ServiceCard);

const PaginationWithLoadMore = dynamic(
  () => import('../../../components/pagination-with-load-more/pagination-with-load-more'),
  { loading: () => <p>...</p> },
);

type Props = {
  fetchData: any,
  popularNews: any,
  currentPage: any,
};

const MainAfishaArticle: React.FC<Props> = ({ fetchData, currentPage, popularNews }) => {
  const { superPromotion, content, categoryCards } = fetchData;

  const { query, push } = useRouter();

  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);
  const [popularColumnHeight, setPopularColumnHeight] = useState(0);
  const titleH1 = 'h1' in fetchData.seoParameters && fetchData.seoParameters?.h1?.length > 0 ? fetchData.seoParameters.h1 : categoryCards[0]?.category?.title;

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
    id,
    page,
  }: any) => {
    if (page) {
      const { data: afishaDataCategory }: any = await apiGetAfishaByCategory(id, page);
      setFetchDataContent(afishaDataCategory);
    }
  };

  const countServices = categoryCards.length > 0 ? 3 : 1;
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
  }, [countServices, query]);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setPopularColumnHeight(node.getBoundingClientRect().height);
    }
  }, [content]);

  if ('id' in content) {
    return (
      <ProjectLayout
        bannersTop={bannersTop}
        bannersPush={bannersPush}
        bannersPushFullSecond={bannersPushFullSecond}
        bannersFix={bannersFix}
        bannersFixSecond={bannersFixSecond}
      >
        {content && (
          <Head>
            { content?.seo_title && <title key="title">{content?.seo_title}</title> }
            { content?.seo_desc && <meta name="description" content={content?.seo_desc} key="description" /> }
            { content?.seo_title && <meta property="og:title" content={content?.seo_title} key="og:title" /> }
            { content?.seo_desc && <meta property="og:description" content={content?.seo_desc} key="og:description" /> }
            { content?.seo_title && <meta name="twitter:title" content={content?.seo_title} key="twitter:title" /> }
            { content?.seo_desc && <meta name="twitter:description" content={content?.seo_desc} key="twitter:description" /> }
            <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
          </Head>
        )}
        <ProjectCol2Layout>
          <div ref={measuredRef}>
            <AfishaArticle {...content} disableComment={fetchData.disableComment} />
            <div style={{
              marginBottom: '20px',
              marginTop: '20px',
              overflow: 'hidden',
              borderRadius: '20px',
            }}
            >
              {bannerInServices.length > 0 && <Banner {...bannerInServices[0]} />}
            </div>
            <Chat
              link="afishaEvent"
              disableComment={fetchData.disableComment}
              disableCommentForAnonim={fetchData.disableCommentForAnonim}
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
              && <NewsCard {...superPromotion[0]} picModerateYear={fetchData.picModerateYear} />
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
  }

  if (categoryCards.length > 0) {
    const fetchContentData = !fetchDataContent ? categoryCards : fetchDataContent;

    return (
      <ProjectLayout
        bannersTop={bannersTop}
        bannersPush={bannersPush}
        bannersPushFullSecond={bannersPushFullSecond}
        bannersPushFullThird={bannersPushFullThird}
        bannersFix={bannersFix}
      >
        <PageTitle title={titleH1} />
        <ProjectCol2Layout>
          <div ref={measuredRef}>
            <ServiceLentaLayout
              bannerInServices={bannerInServices}
            >
              {
                fetchContentData && fetchContentData
                  .slice(0, 4)
                  .map((item) => <ServiceCard serviceName="afisha" {...item} key={`afisha-${item.id}`} />)
                }
              {
                fetchContentData && fetchContentData
                  .slice(4, 8)
                  .map((item) => <ServiceCard serviceName="afisha" {...item} key={`afisha-${item.id}`} />)
               }
              {
                fetchContentData && fetchContentData
                  .slice(8, 12)
                  .map((item) => <ServiceCard serviceName="afisha" {...item} key={`afisha-${item.id}`} />)
               }
              <PaginationWithLoadMore
                searchRequest={query}
                totalCountPages={fetchData.totalCountPages}
                currentPage={currentPage}
                routerPush={push}
                rubric={`afisha/events/${query.id}`}
                LoadMoreComponent={LoadMore}
                loadDataApi={apiGetAfishaByCategory}
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
              && <NewsCard {...superPromotion[0]} picModerateYear={fetchData.picModerateYear} />
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
  }

  return (
    <p>Возникла внутренняя ошибка</p>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const { id, page }: any = context.query;
  const { resolvedUrl }: any = context;
  let popularNews = null;

  const fetchData = {
    content: {},
    categoryCards: [],
    superPromotion: [],
    totalCountPages: null,
    disableComment: null,
    disableCommentForAnonim: null,
    picModerateYear: null,
    seoParameters: null,
  };

  try {
    const superPromotionNews = await apiGetSuperPromotionNews();
    const afishaData = await apiGetAfishaItemById(id);

    const { data: afishaDataCategory, headers }: any = await apiGetAfishaByCategory(id, page);
    const totalCountPages = headers['x-pagination-page-count'];

    const disableComment = await apiGetChatSettings('disableComment');
    const disableCommentForAnonim = await apiGetChatSettings('disableCommentForAnonim');
    const picModerateYear = await apiGetPicModerateYear();

    fetchData.disableComment = await disableComment;
    fetchData.disableCommentForAnonim = await disableCommentForAnonim;
    fetchData.picModerateYear = await picModerateYear;

    fetchData.superPromotion = await superPromotionNews;
    fetchData.content = await afishaData;
    fetchData.categoryCards = await afishaDataCategory;
    fetchData.totalCountPages = await totalCountPages;

    const news = await apiGetAllNews();
    popularNews = 'most_viewed' in news && Array.isArray(news.most_viewed) ? news.most_viewed : [];

    getOnlySelectedKeys([
      ...popularNews || [],
    ], ArticleInColumns);

    getOnlySelectedKeys([
      fetchData.content || [],
    ], AfishaList);

    if (afishaDataCategory.length === 0 && !('id' in afishaData)) {
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

export default MainAfishaArticle;
