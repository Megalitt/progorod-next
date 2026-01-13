import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProjectLayout } from '../../layouts/project-layout';
import { ProjectCol2Layout } from '../../layouts/project-col2-layout';
import { RowsLayout } from '../../layouts/rows-layout';
import { apiGetAfishaPerMonth } from '../../services/afisha';
import { apiGetSeoModuleSettings } from '../../services/seo';
import { apiGetSuperPromotionNews, apiGetPicModerateYear, apiGetAllNews } from '../../services/services';
import { wrapper } from '../../store/store';
import { PageTitle } from '../../components/page-title';
import { NewsCard } from '../../components/news-card';
import { NewsColumn } from '../../components/news-column';
import { Banner } from '../../components/banner';
import { ServiceCard } from '../../components/services/service-card';
import { TabBar, TabBarItem } from '../../components/tab-bar';

import { seoParametersSelector } from '../../store/seo/seo-selectors';
import { bannersCountInPositionSelector } from '../../store/banner-position/banner-position-selectors';
import { setSeoParameters } from '../../store/seo/seo-slice';
import { afishaTabs } from '../../utils/afisha-tabs';
import { getBanners } from '../../utils/get-banners';
import { ArticleInColumns, BannerKeys } from '../../utils/consts';
import { getOnlySelectedKeys } from '../../utils/get-only-selected-keys';

import { apiGetBanner, apiPostBannerStat } from '../../services/banner';

type Props = {
  fetchData: any,
  popularNews: any
};

const Afisha: React.FC<Props> = React.memo(({ fetchData, popularNews }) => {
  const {
    superPromotion,
    tab1,
    tab2,
    tab3,
    tab4,
    tab5,
    tab6,
    picModerateYear,
  } = fetchData;
  const seoForPage = useSelector(seoParametersSelector);
  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);
  const [popularColumnHeight, setPopularColumnHeight] = useState(0);
  const titleH1 = 'h1' in seoForPage && seoForPage?.h1?.length > 0 ? seoForPage.h1 : 'Афиша';

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
      setBannersFix(bannersFix);
      setBannersFixSecond(bannersFixSecond);
      setBannersPush(bannersPush);
      setRightMainBanners(bannersRightMain);
      setBannersPushFullSecond(bannersPushFullSecond);
      setBannersPushFullThird(bannersPushFullThird);

      setTimeout(() => {
        apiPostBannerStat(formData);
      }, 10000);
    });
  }, []);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setPopularColumnHeight(node.getBoundingClientRect().height);
    }
  }, [tab1]);

  return (
    <ProjectLayout
      bannersTop={bannersTop}
      bannersPush={bannersPush}
      bannersPushFullSecond={bannersPushFullSecond}
      bannersPushFullThird={bannersPushFullThird}
      bannersFix={bannersFix}
      bannersFixSecond={bannersFixSecond}
    >
      <PageTitle title={titleH1} />
      <ProjectCol2Layout>
        <div ref={measuredRef}>
          <TabBar>
            <TabBarItem label={afishaTabs[0].monthName}>
              {
                tab1.length > 0
                  ? tab1.map((item) => <ServiceCard serviceName="afisha" {...item} key={`afisha-${item.id}`} />)
                  : <p style={{ textAlign: 'center' }}>В этом месяце нет мероприятий</p>
              }
            </TabBarItem>

            <TabBarItem label={afishaTabs[1].monthName}>
              {
                tab2.length > 0
                  ? tab2.map((item) => <ServiceCard serviceName="afisha" {...item} key={`afisha-${item.id}`} />)
                  : <p style={{ textAlign: 'center' }}>В этом месяце нет мероприятий</p>
              }
            </TabBarItem>

            <TabBarItem label={afishaTabs[2].monthName}>
              {
                tab3.length > 0
                  ? tab3.map((item) => <ServiceCard serviceName="afisha" {...item} key={`afisha-${item.id}`} />)
                  : <p style={{ textAlign: 'center' }}>В этом месяце нет мероприятий</p>
              }
            </TabBarItem>

            <TabBarItem label={afishaTabs[3].monthName}>
              {
                tab4.length > 0
                  ? tab4.map((item) => <ServiceCard serviceName="afisha" {...item} key={`afisha-${item.id}`} />)
                  : <p style={{ textAlign: 'center' }}>В этом месяце нет мероприятий</p>
              }
            </TabBarItem>

            <TabBarItem label={afishaTabs[4].monthName}>
              {
                tab5.length > 0
                  ? tab5.map((item) => <ServiceCard serviceName="afisha" {...item} key={`afisha-${item.id}`} />)
                  : <p style={{ textAlign: 'center' }}>В этом месяце нет мероприятий</p>
              }
            </TabBarItem>

            <TabBarItem label={afishaTabs[5].monthName}>
              {
                tab6.length > 0
                  ? tab6.map((item) => <ServiceCard serviceName="afisha" {...item} key={`afisha-${item.id}`} />)
                  : <p style={{ textAlign: 'center' }}>В этом месяце нет мероприятий</p>
              }
            </TabBarItem>

          </TabBar>
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

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const { resolvedUrl }: any = context;
  let popularNews = null;

  const fetchData = {
    categoryCards: [],
    superPromotion: [],
    tab1: [],
    tab2: [],
    tab3: [],
    tab4: [],
    tab5: [],
    tab6: [],
    picModerateYear: null,
  };

  try {
    const superPromotionNews = await apiGetSuperPromotionNews();
    const afishaTab1 = await apiGetAfishaPerMonth(afishaTabs[0].from, afishaTabs[0].till);
    const afishaTab2 = await apiGetAfishaPerMonth(afishaTabs[1].from, afishaTabs[1].till);
    const afishaTab3 = await apiGetAfishaPerMonth(afishaTabs[2].from, afishaTabs[2].till);
    const afishaTab4 = await apiGetAfishaPerMonth(afishaTabs[3].from, afishaTabs[3].till);
    const afishaTab5 = await apiGetAfishaPerMonth(afishaTabs[4].from, afishaTabs[4].till);
    const afishaTab6 = await apiGetAfishaPerMonth(afishaTabs[5].from, afishaTabs[5].till);

    fetchData.superPromotion = await superPromotionNews;
    fetchData.tab1 = await afishaTab1;
    fetchData.tab2 = await afishaTab2;
    fetchData.tab3 = await afishaTab3;
    fetchData.tab4 = await afishaTab4;
    fetchData.tab5 = await afishaTab5;
    fetchData.tab6 = await afishaTab6;

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
    await context.store.dispatch(setSeoParameters(seoParameters));
  }

  return {
    props: {
      fetchData,
      popularNews,
    },
  };
});

export default Afisha;
