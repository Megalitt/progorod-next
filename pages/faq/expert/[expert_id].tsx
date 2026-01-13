import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { seoMainParametersSelector } from '../../../store/seo/seo-selectors';
import { bannersCountInPositionSelector } from '../../../store/banner-position/banner-position-selectors';

import { ProjectLayout } from '../../../layouts/project-layout';
import { ProjectCol2Layout } from '../../../layouts/project-col2-layout';
import { RowsLayout } from '../../../layouts/rows-layout';
import { NewsCard } from '../../../components/news-card';
import { NewsColumn } from '../../../components/news-column';
import { Banner } from '../../../components/banner';
import { CardExpert, CardFaq } from '../../../components/services/faq';

import {
  apiGetThemeById,
  apiGetFaqItemsByExpertId,
  apiGetExpertById,
  apiGetFaqCompanyById,
} from '../../../services/faq';
import { apiGetSuperPromotionNews, apiGetPicModerateYear, apiGetAllNews } from '../../../services/services';
import { apiGetBanner, apiPostBannerStat } from '../../../services/banner';
import { getBanners } from '../../../utils/get-banners';
import { getOnlySelectedKeys } from '../../../utils/get-only-selected-keys';
import { ArticleInColumns, BannerKeys } from '../../../utils/consts';

type Props = {
  fetchData: any,
  popularNews: any,
};

const ExpertItem: React.FC<Props> = ({ fetchData, popularNews }) => {
  const {
    superPromotion,
    expert,
    cards,
    theme,
    company,
    picModerateYear,
  } = fetchData;

  const { cityName } = useSelector(seoMainParametersSelector);
  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);

  const [bannersTop, setBannersTop] = React.useState([]);
  const [bannersPush, setBannersPush] = React.useState([]);
  const [bannersPushFullSecond, setBannersPushFullSecond] = React.useState([]);
  const [bannersPushFullThird, setBannersPushFullThird] = React.useState([]);
  const [bannersFix, setBannersFix] = React.useState([]);
  const [bannersFixSecond, setBannersFixSecond] = React.useState([]);
  const [bannersInServices, setBannersInServices] = React.useState([]);
  const [rightMainBanners, setRightMainBanners] = React.useState([]);
  const [popularColumnHeight, setPopularColumnHeight] = useState(0);

  const itemsInPage = (cardsArr, banners) => {
    const items = [];
    let bunnersCounter = 0;

    for (let i = 0; i < cardsArr.length; i += 1) {
      const item = cardsArr[i];
      if (i !== 0 && i % 3 === 0 && bannersInServices.length > bunnersCounter) {
        items.push(<Banner {...banners[bunnersCounter]} key={`banner-${item.id}`} />);
        bunnersCounter += 1;
      }
      items.push(<CardFaq {...item} key={`card-faq-${item.id}`} />);
    }

    return { pageCentralData: items };
  };

  const { pageCentralData } = itemsInPage(cards, bannersInServices);
  React.useEffect(() => {
    let countServices = 0;

    if (cards.length < 3) {
      countServices = 0;
    }

    if (cards.length === 3 || (
      cards.length <= 6
      && cards.length > 3
    )) {
      countServices = 1;
    }

    if (cards.length > 6) {
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
      setBannersInServices(bannersInServices);

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
  }, [expert]);

  const cityNameValue = 'value' in cityName && cityName.value;

  const subTitle = `${expert.fio} специалист по теме ${theme} ${cityNameValue}`;
  const description = `Специалист компании ${company} ${expert.position} ${expert.fio} отвечает на вопросы пользователей по теме ${theme} ${cityNameValue}`;

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
          {
            expert && <CardExpert {...expert} />
          }
          {
            pageCentralData.length > 0
              ? (
                <>
                  {pageCentralData}
                  {/* <div>Навигация</div> */}
                </>
              )
              : <p>Этот эксперт еще не отвечал на вопросы.</p>
          }
        </div>
        <RowsLayout>
          {rightMainBanners.length > 0 && (
            <div className="contentRightMainBanner">
              <Banner {...rightMainBanners[0]} />
            </div>
          )}
          {
            superPromotion.length > 0
            && (
            <div>
              <NewsCard {...superPromotion[0]} picModerateYear={picModerateYear} />
            </div>
            )
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

export const getServerSideProps = (async (context) => {
  const id = context.query.expert_id;
  let popularNews = null;

  const fetchData = {
    expert: [],
    cards: [],
    superPromotion: [],
    theme: '',
    company: '',
    picModerateYear: null,
  };

  try {
    const superPromotionNews = await apiGetSuperPromotionNews();
    const [expert] = await apiGetExpertById(id);
    const cards = await apiGetFaqItemsByExpertId(id);

    fetchData.superPromotion = await superPromotionNews;
    fetchData.cards = await cards;
    fetchData.expert = expert;

    const picModerateYear = await apiGetPicModerateYear();
    fetchData.picModerateYear = await picModerateYear;

    const news = await apiGetAllNews();
    popularNews = 'most_viewed' in news && Array.isArray(news.most_viewed) ? news.most_viewed : [];

    getOnlySelectedKeys([
      ...popularNews || [],
    ], ArticleInColumns);

    if (expert) {
      if (expert.faq_topic_id) {
        const [theme] = await apiGetThemeById(expert.faq_topic_id);
        fetchData.theme = theme && theme.name ? theme.name : '';
      }
      if (expert.faq_company_id) {
        const [company] = await apiGetFaqCompanyById(expert.faq_company_id);
        fetchData.company = company && company.name ? company.name : '';
      }
    }

    if (!fetchData.expert) {
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

  return {
    props: {
      fetchData,
      popularNews,
    },
  };
});

export default ExpertItem;
