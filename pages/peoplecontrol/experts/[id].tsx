import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { ProjectLayout } from '../../../layouts/project-layout';
import { ServiceLentaLayout } from '../../../layouts/service-lenta-layout';
import { ServiceLayout } from '../../../layouts/service-layout';
import { PeoplecontrolCard, PeoplecontrolExpertSub } from '../../../components/services/peoplecontrol';
import { getExpert } from '../../../services/peoplecontrol';
import { getBanners } from '../../../utils/get-banners';
import { getOnlySelectedKeys } from '../../../utils/get-only-selected-keys';
import { apiGetBanner, apiPostBannerStat } from '../../../services/banner';
import { apiGetAllNews, apiGetPicModerateYear } from '../../../services/services';
import { ArticleInColumns, BannerKeys } from '../../../utils/consts';
import { bannersCountInPositionSelector } from '../../../store/banner-position/banner-position-selectors';

type Props = {
  expertData: any,
  picModerateYear: null,
  popularNews: any,
};

const ExpertIdPage: React.FC<Props> = ({ expertData, picModerateYear, popularNews }) => {
  const { complaints } = expertData;
  const [popularColumnHeight, setPopularColumnHeight] = useState(0);

  const [bannersTop, setBannersTop] = React.useState([]);
  const [bannersPush, setBannersPush] = React.useState([]);
  const [bannersPushFullSecond, setBannersPushFullSecond] = React.useState([]);
  const [bannersPushFullThird, setBannersPushFullThird] = React.useState([]);
  const [bannersFix, setBannersFix] = React.useState([]);
  const [bannersFixSecond, setBannersFixSecond] = React.useState([]);
  const [rightMainBanners, setRightMainBanners] = React.useState([]);
  const [bannerInServices, setBannerInServices] = React.useState([]);
  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);

  React.useEffect(() => {
    let countServices = 0;

    if (complaints.length < 4) {
      countServices = 0;
    }

    if (complaints.length === 4 || (
      complaints.length <= 8
        && complaints.length > 4
    )) {
      countServices = 1;
    }

    if (complaints.length > 8) {
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
  }, [expertData]);

  const subTitle = `${expertData.name} | Специалист народного контроля`;
  const description = `${expertData.description} Специалист народного контроля ${expertData.name}`;

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
      <ServiceLayout
        popularColumnHeight={popularColumnHeight}
        rightMainBanners={rightMainBanners}
        picModerateYear={picModerateYear}
        popularNews={popularNews}
      >
        <>
          <PeoplecontrolExpertSub {...expertData} />
          <div ref={measuredRef}>
            <ServiceLentaLayout bannerInServices={bannerInServices.slice(0, 2)}>
              {
                complaints && complaints
                  .slice(0, 4)
                  .map((item) => <PeoplecontrolCard {...item} key={`complaints-${item.id}`} />)
              }
              {
                complaints && complaints
                  .slice(4, 8)
                  .map((item) => <PeoplecontrolCard {...item} key={`complaints-${item.id}`} />)
              }
              {
                complaints && complaints
                  .slice(8, 12)
                  .map((item) => <PeoplecontrolCard {...item} key={`complaints-${item.id}`} />)
              }
            </ServiceLentaLayout>
          </div>
        </>
      </ServiceLayout>
    </ProjectLayout>
  );
};

export const getServerSideProps = (async (context) => {
  const { id } = context.query;
  let expertData = [];
  let picModerateYear = null;
  let popularNews = null;

  try {
    expertData = await getExpert(id);
    picModerateYear = await apiGetPicModerateYear();

    const news = await apiGetAllNews();
    popularNews = 'most_viewed' in news && Array.isArray(news.most_viewed) ? news.most_viewed : [];

    getOnlySelectedKeys([
      ...popularNews || [],
    ], ArticleInColumns);

    if (expertData.length === 0) {
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
      expertData,
      picModerateYear,
      popularNews,
    },
  };
});

export default ExpertIdPage;
