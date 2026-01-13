import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { wrapper } from '../../store/store';

import { seoMainParametersSelector } from '../../store/seo/seo-selectors';
import { bannersCountInPositionSelector } from '../../store/banner-position/banner-position-selectors';

import { ProjectLayout } from '../../layouts/project-layout';
import { ProjectCol2Layout } from '../../layouts/project-col2-layout';
import { RowsLayout } from '../../layouts/rows-layout';
import { NewsCard } from '../../components/news-card';
import { NewsColumn } from '../../components/news-column';
import { Banner } from '../../components/banner';
import { FaqArticle } from '../../components/services/faq';
import { Chat } from '../../components/chat';

import { apiGetThemeById, apiGetFaqItemById } from '../../services/faq';
import {
  apiGetAllNews,
  apiGetSuperPromotionNews,
  apiGetPicModerateYear,
  apiGetChatSettings,
} from '../../services/services';
import { getBanners } from '../../utils/get-banners';
import { getOnlySelectedKeys } from '../../utils/get-only-selected-keys';
import { apiGetBanner, apiPostBannerStat } from '../../services/banner';
import { ArticleInColumns, BannerKeys } from '../../utils/consts';

type Props = {
  fetchData: any,
  popularNews: any,
};

const FaqInner: React.FC<Props> = ({ fetchData, popularNews }) => {
  const { superPromotion, content, theme } = fetchData;
  const [popularColumnHeight, setPopularColumnHeight] = useState(0);
  const { cityName } = useSelector(seoMainParametersSelector);
  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);

  const [bannersTop, setBannersTop] = React.useState([]);
  const [bannersPush, setBannersPush] = React.useState([]);
  const [bannersPushFullSecond, setBannersPushFullSecond] = React.useState([]);
  const [bannersPushFullThird, setBannersPushFullThird] = React.useState([]);
  const [bannersFix, setBannersFix] = React.useState([]);
  const [bannersFixSecond, setBannersFixSecond] = React.useState([]);
  const [rightMainBanners, setRightMainBanners] = React.useState([]);
  const [bannerInServices, setBannerInServices] = React.useState([]);

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
  }, []);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const totalHeight = node.getBoundingClientRect().height - 870;
      return totalHeight < 415
        ? setPopularColumnHeight(415)
        : setPopularColumnHeight(totalHeight);
    }
    return false;
  }, [content]);

  const cityNameValue = 'value' in cityName && cityName.value;
  const subTitle = `${content.question} | Ответ по теме ${theme}`;
  const description = `Ответ на вопрос: ${content.question} | от эксперта ${content.expert && content.expert.fio && content.expert.fio} ${cityNameValue}`;

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
        <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
      </Head>
      <ProjectCol2Layout>
        <div ref={measuredRef}>
          <FaqArticle {...content} />
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
            link="faq"
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
            columnHeight={popularColumnHeight}
          />
        </RowsLayout>
      </ProjectCol2Layout>
    </ProjectLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const { id } = context.query;
  let popularNews = null;

  const fetchData = {
    content: [],
    superPromotion: [],
    theme: '',
    company: '',
    disableComment: null,
    disableCommentForAnonim: null,
    picModerateYear: null,
  };

  try {
    const superPromotionNews = await apiGetSuperPromotionNews();
    const faqData = await apiGetFaqItemById(id);

    const disableComment = await apiGetChatSettings('disableComment');
    const disableCommentForAnonim = await apiGetChatSettings('disableCommentForAnonim');

    fetchData.superPromotion = await superPromotionNews;
    fetchData.content = await faqData;
    fetchData.disableComment = await disableComment;
    fetchData.disableCommentForAnonim = await disableCommentForAnonim;
    const picModerateYear = await apiGetPicModerateYear();
    fetchData.picModerateYear = await picModerateYear;

    const news = await apiGetAllNews();
    popularNews = 'most_viewed' in news && Array.isArray(news.most_viewed) ? news.most_viewed : [];

    getOnlySelectedKeys([
      ...popularNews || [],
    ], ArticleInColumns);

    if (faqData.expert && faqData.expert.faq_topic_id) {
      const [theme] = await apiGetThemeById(faqData.expert.faq_topic_id);
      fetchData.theme = theme.name;
    }
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
    },
  };
});

export default FaqInner;
