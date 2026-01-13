import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { getSubstrByWord } from '../../utils/get-substr-by-word';
import { ProjectLayout } from '../../layouts/project-layout';
import { ServiceLayout } from '../../layouts/service-layout';
import { SimpleLayout } from '../../layouts/simple-layout';
import { ArticleSocial } from '../../components/article-social';
import { Chat } from '../../components/chat';

import { getComplaint } from '../../services/peoplecontrol';
import { apiGetAllNews, apiGetChatSettings, apiGetPicModerateYear } from '../../services/services';
import { PeoplecontrolExpert, PeoplecontrolWrap } from '../../components/services/peoplecontrol';
import { Banner } from '../../components/banner';
import { getBanners } from '../../utils/get-banners';
import { getOnlySelectedKeys } from '../../utils/get-only-selected-keys';
import { apiGetBanner, apiPostBannerStat } from '../../services/banner';
import { ArticleInColumns, BannerKeys } from '../../utils/consts';
import { bannersCountInPositionSelector } from '../../store/banner-position/banner-position-selectors';

const PeopleControlIdPage = ({ fetchData, popularNews }) => {
  const { id, text } = fetchData.content;
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
  }, [fetchData]);

  const subTitle = `${getSubstrByWord(text.replace(/(<(\/?[^>]+)>)/g, ''), 65)}`;
  const description = `Жалоба №${id} | В рубрике «Народный контроль» редакция портала Про Город принимает жалобы, обрабатывает их и решает проблемы горожан в режиме онлайн`;
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
        <>
          <div ref={measuredRef}>
            <SimpleLayout title={`Жалоба №${id}`} type="transparent">
              <PeoplecontrolWrap {...fetchData.content} />
              <div style={
                {
                  backgroundColor: '#F7F9FA',
                  margin: '0 -40px',
                  padding: '0 40px',
                  overflow: 'hidden',
                }
              }
              >
                <ArticleSocial uri={`/peoplecontrol/${id}`} disableComment={fetchData.disableComment} />
              </div>
              {fetchData.content?.answers.length > 0 ? (
                <PeoplecontrolWrap
                  id={fetchData.content.id}
                  text={fetchData.content.answers[0].text}
                  date={fetchData.content.answers[0].date}
                  author_anon_name={fetchData.content.answers[0].expert?.name}
                  likes={fetchData.content.likes}
                  type="answer"
                />
              ) : <p>Еще нет ответа на эту жалобу</p>}
              {fetchData.content?.answers.length > 0 && (
                <PeoplecontrolExpert {...fetchData.content.answers[0].expert} />
              )}
              <div style={{
                marginLeft: '-40px',
                marginRight: '-40px',
                marginBottom: '20px',
                marginTop: '20px',
                overflow: 'hidden',
                borderRadius: '20px',
              }}
              >
                {bannerInServices.length > 0 && <Banner {...bannerInServices[0]} />}
              </div>
              <div style={{ margin: '0 -40px' }}>
                <Chat
                  link="peoplecontrolComplaints"
                  disableComment={fetchData.disableComment}
                  disableCommentForAnonim={fetchData.disableCommentForAnonim}
                />
              </div>
            </SimpleLayout>
          </div>
        </>
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
    disableCommentForAnonim: null,
    picModerateYear: null,
  };

  try {
    const complaintData = await getComplaint(id);
    const disableComment = await apiGetChatSettings('disableComment');
    const disableCommentForAnonim = await apiGetChatSettings('disableCommentForAnonim');
    const picModerateYear = await apiGetPicModerateYear();

    fetchData.content = await complaintData;
    fetchData.disableComment = await disableComment;
    fetchData.disableCommentForAnonim = await disableCommentForAnonim;
    fetchData.picModerateYear = await picModerateYear;

    const news = await apiGetAllNews();
    popularNews = 'most_viewed' in news && Array.isArray(news.most_viewed) ? news.most_viewed : [];

    getOnlySelectedKeys([
      ...popularNews || [],
    ], ArticleInColumns);

    if (!('id' in complaintData)) {
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

export default PeopleControlIdPage;
