import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { wrapper } from '../../../store/store';

import { seoMainParametersSelector } from '../../../store/seo/seo-selectors';
import { bannersCountInPositionSelector } from '../../../store/banner-position/banner-position-selectors';

import { ProjectLayout } from '../../../layouts/project-layout';
import { ProjectCol2Layout } from '../../../layouts/project-col2-layout';
import { RowsLayout } from '../../../layouts/rows-layout';

import { NewsCard } from '../../../components/news-card';
import { NewsColumn } from '../../../components/news-column';
import { Banner } from '../../../components/banner';

import { QuestionNav, Tape } from '../../../components/services/faq';
import { apiGetThemes } from '../../../services/faq';
import { apiGetAllNews, apiGetSuperPromotionNews, apiGetPicModerateYear } from '../../../services/services';
import { getBanners } from '../../../utils/get-banners';
import { getOnlySelectedKeys } from '../../../utils/get-only-selected-keys';
import { apiGetBanner, apiPostBannerStat } from '../../../services/banner';
import { ArticleInColumns, BannerKeys } from '../../../utils/consts';

type Props = {
  fetchData: any,
  popularNews: any,
};

const FaqTopic: React.FC<Props> = React.memo(({ fetchData, popularNews }) => {
  const { superPromotion, content, picModerateYear } = fetchData;
  const { cityName } = useSelector(seoMainParametersSelector);
  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);
  const [popularColumnHeight, setPopularColumnHeight] = useState(0);

  const [bannersTop, setBannersTop] = React.useState([]);
  const [bannersPush, setBannersPush] = React.useState([]);
  const [bannersPushFullSecond, setBannersPushFullSecond] = React.useState([]);
  const [bannersPushFullThird, setBannersPushFullThird] = React.useState([]);
  const [bannersFix, setBannersFix] = React.useState([]);
  const [bannersFixSecond, setBannersFixSecond] = React.useState([]);
  const [rightMainBanners, setRightMainBanners] = React.useState([]);

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
      formData,
    }: any) => {
      setBannersTop(bannersTop);
      setBannersPush(bannersPush);
      setBannersPushFullSecond(bannersPushFullSecond);
      setBannersPushFullThird(bannersPushFullThird);
      setBannersFix(bannersFix);
      setBannersFixSecond(bannersFixSecond);
      setRightMainBanners(bannersRightMain);

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

  const subTitle = 'value' in cityName && `Темы вопросов | ${cityName.value}`;
  const description = `Специалисты и эксперты отвечают на вопросы пользователей на разные темы ${cityName.value}`;

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
      </Head>
      <ProjectCol2Layout>
        <div ref={measuredRef}>
          <QuestionNav />
          <Tape dataTape={content} type="theme" />
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
            columnHeight={popularColumnHeight}
          />
        </RowsLayout>
      </ProjectCol2Layout>
    </ProjectLayout>
  );
});

export const getServerSideProps = wrapper.getServerSideProps(async () => {
  let popularNews = null;

  const fetchData = {
    content: [],
    superPromotion: [],
    picModerateYear: null,
  };

  try {
    const superPromotionNews = await apiGetSuperPromotionNews();
    const themes = await apiGetThemes();

    fetchData.superPromotion = await superPromotionNews;
    fetchData.content = await themes;

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
    },
  };
});

export default FaqTopic;
