import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { apiGetPhotoConcursCurrent, apiGetPhotoConcursVotes, apiGetMyVoteInfo } from '../../../services/concurs';
import { apiGetAllNews, apiGetPicModerateYear, apiGetChatSettings } from '../../../services/services';
import { ConcursWrap } from '../../../components/services/concurs';
import { Chat } from '../../../components/chat';

import { ProjectLayout } from '../../../layouts/project-layout';
import { ServiceLayout } from '../../../layouts/service-layout';

import { getSubstrByWord } from '../../../utils/get-substr-by-word';
import { seoMainParametersSelector } from '../../../store/seo/seo-selectors';
import { bannersCountInPositionSelector } from '../../../store/banner-position/banner-position-selectors';

import Banner from '../../../components/banner/banner';
import { getBanners } from '../../../utils/get-banners';
import { getOnlySelectedKeys } from '../../../utils/get-only-selected-keys';
import { apiGetBanner, apiPostBannerStat } from '../../../services/banner';
import { ArticleInColumns, BannerKeys } from '../../../utils/consts';

const Inner = ({ fetchData, popularNews }) => {
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
  const [bannerInServices, setBannerInServices] = React.useState([]);
  const [myVoteId, setVoteId] = useState(null);

  const hendleGetMyVote = async (fetchData) => {
    await apiGetMyVoteInfo(fetchData.content.voting_id)
      .then(({ option_id }: any) => {
        setVoteId(option_id);
      })
      .catch((err) => {
        console.log(err);
        setVoteId(null);
      });
  };

  const hendleResetStatusVote = () => {
    setVoteId(null);
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
      bannersInServices,
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
      setBannerInServices(bannersInServices);

      setTimeout(() => {
        apiPostBannerStat(formData);
      }, 10000);
    });

    hendleGetMyVote(fetchData);
  }, []);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const totalHeight = node.getBoundingClientRect().height - 870;
      return totalHeight < 415
        ? setPopularColumnHeight(415)
        : setPopularColumnHeight(totalHeight);
    }
    return false;
  }, [fetchData]);

  const cityNameValue = 'value' in cityName && cityName.value;
  const subTitle = `${fetchData.content.title} | Конкурс ${cityNameValue}`;
  const description = `${getSubstrByWord(fetchData.content.content.replace(/(<(\/?[^>]+)>)/g, ''), 140)}`;

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
        picModerateYear={fetchData.picModerateYear}
        popularNews={popularNews}
      >
        <div ref={measuredRef}>
          <ConcursWrap {...fetchData.content} disableComment={fetchData.disableComment} myVoteId={myVoteId} onHendleResetStatusVote={hendleResetStatusVote} />
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
            link="cityface"
            disableComment={fetchData.disableComment}
            disableCommentForAnonim={fetchData.disableCommentForAnonim}
          />
        </div>
      </ServiceLayout>
    </ProjectLayout>
  );
};

export const getServerSideProps = (async (context) => {
  const { id } = context.query;
  let popularNews = null;
  const fetchData = {
    content: {},
    disableComment: null,
    picModerateYear: null,
    disableCommentForAnonim: null,
  };
  try {
    const concursData = await apiGetPhotoConcursCurrent(id);
    const concursVotesData = await apiGetPhotoConcursVotes(id);

    const disableComment = await apiGetChatSettings('disableComment');
    const disableCommentForAnonim = await apiGetChatSettings('disableCommentForAnonim');
    const picModerateYear = await apiGetPicModerateYear();
    Object.keys(concursData.items).forEach((key) => {
      concursData.items[key].votes = '0';

      Object.keys(concursVotesData).forEach((keyVotes) => {
        if (concursData.items[key].id === +concursVotesData[keyVotes].cityfaces_item_id) {
          concursData.items[key].votes = concursVotesData[keyVotes].votes;
        }
      });
    });

    fetchData.content = await concursData;
    fetchData.disableComment = await disableComment;
    fetchData.picModerateYear = await picModerateYear;
    fetchData.disableCommentForAnonim = await disableCommentForAnonim;

    const news = await apiGetAllNews();
    popularNews = 'most_viewed' in news && Array.isArray(news.most_viewed) ? news.most_viewed : [];

    getOnlySelectedKeys([
      ...popularNews || [],
    ], ArticleInColumns);

    if (!('id' in concursData)) {
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

export default Inner;
