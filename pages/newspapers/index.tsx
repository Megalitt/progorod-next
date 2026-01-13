import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { NewsCard } from '../../components/news-card';
import { NewsColumn } from '../../components/news-column';
import { Banner } from '../../components/banner';
import { NewsPdf } from '../../components/news-pdf';
import { FormSearchNewspaper } from '../../components/form-search-newspaper';

import { ProjectLayout } from '../../layouts/project-layout';
import { ProjectCol2Layout } from '../../layouts/project-col2-layout';
import { SimpleLayout } from '../../layouts/simple-layout';
import { RowsLayout } from '../../layouts/rows-layout';

import { getReleseYearsNewspapers } from '../../utils/time/get-relese-years-newspapers';
import { getMonthsList } from '../../utils/time/get-months-list';

import { apiGetNewsPapers, apiGetFisrtReliseYear } from '../../services/pdf';
import { apiGetSuperPromotionNews, apiGetPicModerateYear, apiGetAllNews } from '../../services/services';
import { apiGetSeoModuleSettings } from '../../services/seo';
import { apiGetBanner, apiPostBannerStat } from '../../services/banner';

import { getBanners } from '../../utils/get-banners';
import { getOnlySelectedKeys } from '../../utils/get-only-selected-keys';
import { ArticleInColumns, BannerKeys } from '../../utils/consts';
import { bannersCountInPositionSelector } from '../../store/banner-position/banner-position-selectors';

type Props = {
  fetchData: any,
  popularNews: any,
};

const NewsPapers: React.FC<Props> = React.memo(({ fetchData, popularNews }) => {
  const [bannersTop, setBannersTop] = React.useState([]);
  const [bannersPush, setBannersPush] = React.useState([]);
  const [bannersPushFullSecond, setBannersPushFullSecond] = React.useState([]);
  const [bannersPushFullThird, setBannersPushFullThird] = React.useState([]);
  const [bannersFix, setBannersFix] = React.useState([]);
  const [bannersFixSecond, setBannersFixSecond] = React.useState([]);
  const [rightMainBanners, setRightMainBanners] = React.useState([]);
  const [fetchDataContent, setFetchDataContent] = React.useState(null);
  const [popularColumnHeight, setPopularColumnHeight] = useState(0);

  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);

  const { query } = useRouter();

  const {
    superPromotion,
    newsPapers,
    firstReleaseYear,
    picModerateYear,
  } = fetchData;

  const yearsReleseNewspaper = [{
    id: 0,
    title: 'Не задано',
  }, ...getReleseYearsNewspapers(firstReleaseYear)];

  const months = [{
    id: 0,
    title: 'Не задано',
  }, ...getMonthsList()];

  const titleH1 = 'h1' in fetchData.seoParameters && fetchData.seoParameters?.h1?.length > 0 ? fetchData.seoParameters.h1 : 'PDF версия газет';

  const getFetchContent = async ({ date }: any) => {
    if (date) {
      await apiGetNewsPapers(date)
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

  React.useEffect(() => {
    getFetchContent(query);
  }, [query]);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setPopularColumnHeight(node.getBoundingClientRect().height);
    }
  }, [newsPapers]);

  const fetchContentData = !fetchDataContent ? newsPapers : fetchDataContent;

  return (
    <ProjectLayout
      bannersTop={bannersTop}
      bannersPush={bannersPush}
      bannersPushFullSecond={bannersPushFullSecond}
      bannersPushFullThird={bannersPushFullThird}
      bannersFix={bannersFix}
      bannersFixSecond={bannersFixSecond}
    >
      <ProjectCol2Layout>
        <div ref={measuredRef}>
          <SimpleLayout title={titleH1} align="center">
            <FormSearchNewspaper
              months={months}
              yearsReleseNewspaper={yearsReleseNewspaper}
            />
            {fetchContentData && (fetchContentData.length > 0 ? <NewsPdf news={[...fetchContentData]} /> : 'Ничего не нашлось')}
          </SimpleLayout>
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

export const getServerSideProps = (async ({
  resolvedUrl,
  query: {
    date,
  },
}:any) => {
  let popularNews = null;
  const fetchData = {
    superPromotion: [],
    newsPapers: [],
    firstReleaseYear: null,
    picModerateYear: null,
    seoParameters: null,
  };

  try {
    const { data: newspapers }: any = await apiGetNewsPapers(date);
    fetchData.newsPapers = await newspapers;
    const firstRelease = await apiGetFisrtReliseYear();
    fetchData.firstReleaseYear = await firstRelease;
    const superPromotionNews = await apiGetSuperPromotionNews();
    fetchData.superPromotion = await superPromotionNews;
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
    fetchData.seoParameters = seoParameters;
  }

  return {
    props: {
      fetchData,
      popularNews,
    },
  };
});

export default NewsPapers;
