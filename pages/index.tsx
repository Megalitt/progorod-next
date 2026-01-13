import React from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ProjectLayout } from '../layouts/project-layout';
import { ProjectCol3Layout } from '../layouts/project-col3-layout';
import { IndexTop } from '../layouts/index-top';
import { RowsLayout } from '../layouts/rows-layout';

import { NewsCard } from '../components/news-card';
import { NewsColumn } from '../components/news-column';
import { NewsLine } from '../components/news-line';
import { NewsCapital } from '../components/news-capital';
import { Banner } from '../components/banner';

import {
  dailyCommNewsSelector,
  lastNewsCommSelector,
  popularNewsCommSelector,
  promotionCommNewsSelector,
  centralNewsComm1Selector,
  centralNewsComm2Selector,
  centralNewsComm3Selector,
  promotionComm2NewsSelector,
  promotionComm3NewsSelector,
  promotionComm4NewsSelector,
  centralNewsComm4Selector,
  centralNewsComm5Selector,
  promotionDailyNewsSelector,
} from '../store/general-news/general-news-selectors';

import { isMobileSelector } from '../store/seo/seo-selectors';
import { columnCenterSelector } from '../store/column-height/column-height-selector';
import { bannersCountInPositionSelector } from '../store/banner-position/banner-position-selectors';
import {
  apiGetAllNews,
  apiGetServiceFlags,
  apiGetChatSettings,
  apiGetPicModerateYear,
} from '../services/services';

import {
  getLeftColumnNews,
  getMainTabNews,
  setPopularNews,
  getCentralColumnTopNews,
  getRightNewsColumn,
  setCentralNews,
  getCentralColumn,
} from '../utils/index-news/news';

import {
  ArticleInColumns,
  ArtilcesInCentralColumn,
  BannerKeys,
} from '../utils/consts';

import { getBanners } from '../utils/get-banners';
import { apiGetBanner, apiPostBannerStat } from '../services/banner';

import styles from '../layouts/project-col3-layout/project-col3-layout.module.scss';

const TabBarItemEmpty = dynamic(() => import('../components/tab-bar').then((mod) => mod.TabBarItemEmpty));
const TabBar = dynamic(() => import('../components/tab-bar').then((mod) => mod.TabBar));
const TabBarItem = dynamic(() => import('../components/tab-bar').then((mod) => mod.TabBarItem));
const NewsTab = dynamic(() => import('../components/news-tab').then((mod) => mod.NewsTab));

let SliderAfisha = null;
let SliderConcurs = null;
let SliderPeoplecontrol = null;
let SliderFaq = null;

type Props = {
  serviceFlags: any,
  disableComment: any,
  picModerateYear: number,
  lastNews: any,
  mainNews: any,
  centralNews: any,
  popularNews: any,
  commentedNews: any,
  dailyNews: any,
  rightBarNews: any,
};

const Index: React.FC<Props> = React.memo(({
  serviceFlags,
  disableComment,
  picModerateYear,
  lastNews,
  mainNews,
  dailyNews,
  popularNews,
  centralNews,
  commentedNews,
}) => {
  const isMobile = useSelector(isMobileSelector);
  const dailyNewsCommSelector = useSelector(dailyCommNewsSelector);
  const lastNewsComm = useSelector(lastNewsCommSelector);
  const popularComm = useSelector(popularNewsCommSelector);
  const rightDailyColumn = useSelector(promotionDailyNewsSelector);
  const rightColumnComm = useSelector(promotionCommNewsSelector);
  const rightColumnComm2 = useSelector(promotionComm2NewsSelector);
  const rightColumnComm3 = useSelector(promotionComm3NewsSelector);
  const rightColumnComm4 = useSelector(promotionComm4NewsSelector);
  const centralNewsComm1 = useSelector(centralNewsComm1Selector);
  const centralNewsComm2 = useSelector(centralNewsComm2Selector);
  const centralNewsComm3 = useSelector(centralNewsComm3Selector);
  const centralNewsComm4 = useSelector(centralNewsComm4Selector);
  const centralNewsComm5 = useSelector(centralNewsComm5Selector);
  const commentedNewsSliced = Array.isArray(commentedNews) && commentedNews.slice(0, 4);
  const dailyNewsSliced = Array.isArray(dailyNews) && dailyNews.slice(0, 4);
  const dailyNewsComm = Array.isArray(dailyNewsCommSelector) && dailyNewsCommSelector.slice(0, 1);

  const lastNewsMixedWithComm = getLeftColumnNews(lastNews, lastNewsComm);
  const mainTabNews = getMainTabNews(dailyNewsSliced, dailyNewsComm);
  const lastTabNews = lastNewsMixedWithComm.slice(0, 4);
  const popularNewsMixedWithComm = setPopularNews(popularNews, popularComm);
  const rightColumnNews = getRightNewsColumn(rightColumnComm, rightColumnComm2, rightColumnComm3, rightColumnComm4, rightDailyColumn);
  const getCentralNewsCountFirst = Array.isArray(centralNewsComm1) && centralNewsComm1.length > 0 ? 4 : 5;
  const centralColumnTopNews = getCentralColumnTopNews(centralNews.slice(0, getCentralNewsCountFirst), centralNewsComm1);
  const lastNewsHeight = useSelector(columnCenterSelector);

  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);
  const [bannersPush, setBannersPush] = React.useState([]);
  const [bannersPushFull, setBannersPushFull] = React.useState([]);
  const [bannersPushFullSecond, setBannersPushFullSecond] = React.useState([]);
  const [bannersPushFullThird, setBannersPushFullThird] = React.useState([]);
  const [bannersTop, setBannersTop] = React.useState([]);
  const [bannersCentral, setBannersCentral] = React.useState([]);
  const [bannersFix, setBannersFix] = React.useState([]);
  const [bannersFixSecond, setBannersFixSecond] = React.useState([]);
  const [bannersRight, setBannersRight] = React.useState([]);
  const [bannersMediaMetrika, setBannersMediaMetrika] = React.useState([]);
  const [rightMainBanners, setRightMainBanners] = React.useState([]);

  const classBannerRight = process.env.NEXT_PUBLIC_TITLE_LENGTH === '120' ? 'contentRightStretchBanner120' : 'contentRightStretchBanner140';

  React.useEffect(() => {
    const countServiceFlags = serviceFlags.filter(({ value }) => value === '1' || value === '-1');
    getBanners(
      apiGetBanner,
      {
        bannerIdTop: BannerKeys.BANNER_TOP,
        bannerIdRight: BannerKeys.BANNER_RIGHT,
        bannerIdRightMain: BannerKeys.BANNER_MAIN_RIGHT,
        bannerIdFix: BannerKeys.BANNER_FIX,
        bannerIdFixSecond: BannerKeys.BANNER_FIX_SECOND,
        bannerIdPuhs: BannerKeys.BANNER_PUSH,
        bannerIdPuhsFull: BannerKeys.BANNER_PUSH_FULL,
        bannerIdPuhsFullSecond: BannerKeys.BANNER_PUSH_FULL_SECOND,
        bannerIdPuhsFullThird: BannerKeys.BANNER_PUSH_FULL_THIRD,
        bannerIdCentral: BannerKeys.BANNER_CENTRAL,
        bannerIdMediaMetrika: BannerKeys.BANNER_MEDIAMETRIKA,
        countRight: countServiceFlags.length >= 2 ? countServiceFlags.length - 1 : 1,
        countCentral: countServiceFlags.length,
        bannersCountInPosition,
      },
    ).then(({
      bannersTop,
      bannersRight,
      bannersRightMain,
      bannersFix,
      bannersFixSecond,
      bannersCentral,
      bannersPush,
      bannersPushFull,
      bannersPushFullSecond,
      bannersPushFullThird,
      bannersMediaMetrika,
      formData,
    }: any) => {
      setBannersTop(bannersTop);
      setBannersRight(bannersRight);
      setBannersFix(bannersFix);
      setBannersFixSecond(bannersFixSecond);
      setBannersPush(bannersPush);
      setBannersPushFull(bannersPushFull);
      setBannersPushFullSecond(bannersPushFullSecond);
      setBannersPushFullThird(bannersPushFullThird);
      setRightMainBanners(bannersRightMain);
      setBannersCentral(bannersCentral);
      setBannersMediaMetrika(bannersMediaMetrika);

      setTimeout(() => {
        apiPostBannerStat(formData);
      }, 10000);
    });
  }, []);

  const getServicesOrder = (serviceFlags) => {
    if (!serviceFlags || (Array.isArray(serviceFlags) && serviceFlags.length < 0)) return [];

    const servicesOrder = ['enablePeopleControl', 'enableFaq', 'enableVoting', 'enableAfisha'];
    const serviceRightArr = [];
    servicesOrder.forEach((item) => {
      const service = serviceFlags.find((value) => value.name === item);
      if (service && +service.value === 1) {
        switch (service.name) {
          case 'enableAfisha': {
            SliderAfisha = dynamic(
              () => import('../components/slider-afisha').then((mod) => mod.SliderAfisha),
              { ssr: false },
            );

            serviceRightArr.push({
              serviceName: 'enableAfisha',
              isEnabled: service.value,
            });
            break;
          }
          case 'enableFaq': {
            SliderFaq = dynamic(
              () => import('../components/slider-faq').then((mod) => mod.SliderFaq),
              { ssr: false },
            );

            serviceRightArr.push({
              serviceName: 'enableFaq',
              isEnabled: service.value,
            });
            break;
          }
          case 'enablePeopleControl': {
            SliderPeoplecontrol = dynamic(
              () => import('../components/slider-peoplecontrol').then((mod) => mod.SliderPeoplecontrol),
              { ssr: false },
            );

            serviceRightArr.push({
              serviceName: 'enablePeopleControl',
              isEnabled: service.value,
            });
            break;
          }
          case 'enableVoting': {
            SliderConcurs = dynamic(
              () => import('../components/slider-concurs').then((mod) => mod.SliderConcurs),
              { ssr: false },
            );

            serviceRightArr.push({
              serviceName: 'enableVoting',
              isEnabled: service.value,
            });
            break;
          }
          default: {
            break;
          }
        }
      }
      if (service && +service.value === -1) {
        switch (service.name) {
          case 'enableAfisha': {
            serviceRightArr.push({
              serviceName: 'enableAfisha',
              isEnabled: service.value,
            });
            break;
          }
          case 'enableFaq': {
            serviceRightArr.push({
              serviceName: 'enableFaq',
              isEnabled: service.value,
            });
            break;
          }
          case 'enablePeopleControl': {
            serviceRightArr.push({
              serviceName: 'enablePeopleControl',
              isEnabled: service.value,
            });
            break;
          }
          case 'enableVoting': {
            serviceRightArr.push({
              serviceName: 'enableVoting',
              isEnabled: service.value,
            });
            break;
          }
          default: {
            break;
          }
        }
      }
    });

    return serviceRightArr;
  };
  const services = React.useMemo(() => getServicesOrder(serviceFlags), []);
  const centralBlockNews = React.useMemo(() => setCentralNews(getCentralColumn(centralNews.slice(getCentralNewsCountFirst), centralNewsComm2, centralNewsComm3, centralNewsComm4, centralNewsComm5)), []);
  return (
    <>
      <ProjectLayout
        bannersTop={bannersTop}
        bannersFix={bannersFix}
        bannersFixSecond={bannersFixSecond}
        bannersPush={bannersPush}
        bannersPushFull={bannersPushFull}
        bannersPushFullSecond={bannersPushFullSecond}
        bannersPushFullThird={bannersPushFullThird}
      >
        <IndexTop>
          <NewsCapital {...mainNews[0]} />
          <TabBar activeTabDefault={0}>
            <TabBarItem label="Последнее">
              {
                lastTabNews.length > 0 ? lastTabNews.map((item) => <NewsTab {...item} key={`news-last-tab-${item.id}`} itemsLength={lastTabNews.length} />) : (
                  <TabBarItemEmpty message="Новостей в данном разделе пока нет" />
                )
              }
            </TabBarItem>
            <TabBarItem label="Главное">
              {
                mainTabNews.length > 0 ? mainTabNews.map((item) => <NewsTab {...item} key={`news-main-tab-${item.id}`} itemsLength={mainTabNews.length} />) : (
                  <TabBarItemEmpty message="Новостей в данном разделе пока нет" />
                )
              }
            </TabBarItem>
            {+disableComment !== 1 && (
              <TabBarItem label="Комментируемое">
                {
                  commentedNewsSliced.length > 0 ? commentedNewsSliced.map((item) => <NewsTab {...item} key={`news-commented-tab-${item.id}`} itemsLength={commentedNewsSliced.length} />) : (
                    <TabBarItemEmpty message="Новостей в данном разделе пока нет" />
                  )
                }
              </TabBarItem>
            )}
          </TabBar>
          <div className="contentRightMainBanner">
            <RowsLayout>
              { rightMainBanners.length > 0 && <Banner {...rightMainBanners[0]} />}
            </RowsLayout>
          </div>
        </IndexTop>
        <ProjectCol3Layout noRows>
          { !isMobile && (
            <NewsColumn
              title="Последние новости"
              news={[...lastNewsMixedWithComm]}
              columnHeight={lastNewsHeight}
            />
          )}
          {/* --- начало центральные 5 шт, популярные --- */}
          <>
            {centralColumnTopNews.map((item) => <NewsLine {...item} key={`news-line-${item.id}`} disableComment={disableComment} picModerateYear={picModerateYear} />)}
          </>
          { !isMobile && (
            <NewsColumn
              title="Популярные новости"
              news={Array.isArray(popularNewsMixedWithComm) ? [...popularNewsMixedWithComm] : []}
              columnHeight={process.env.NEXT_PUBLIC_TITLE_LENGTH === '140' ? 900 : 755}
            />
          )}
          {/* --- конец центральные 5 шт, популярные --- */}
          {services && services.map((item, index) => (
            <div key={`main-${services[index].serviceName}`}>
              <div className={styles.row} key={`row-${services[index]}`}>
                <div className={styles.contentMain}>
                  <RowsLayout>
                    {bannersCentral[index] && (
                      <div className="contentCentralBanner">
                        <Banner {...bannersCentral[index]} />
                      </div>
                    )}
                    {item.serviceName === 'enableAfisha' && +item.isEnabled === 1 && <SliderAfisha />}
                    {item.serviceName === 'enableAfisha' && +item.isEnabled === -1 && (
                      centralBlockNews.arrAfisha.map((item) => <NewsLine {...item} key={`news-line-${item.id}`} disableComment={disableComment} picModerateYear={picModerateYear} />)
                    )}

                    {item.serviceName === 'enableFaq' && +item.isEnabled === 1 && <SliderFaq />}
                    {item.serviceName === 'enableFaq' && +item.isEnabled === -1 && (
                      centralBlockNews.arrFaq.map((item) => <NewsLine {...item} key={`news-line-${item.id}`} disableComment={disableComment} picModerateYear={picModerateYear} />)
                    )}

                    {item.serviceName === 'enablePeopleControl' && +item.isEnabled === 1 && <SliderPeoplecontrol />}
                    {item.serviceName === 'enablePeopleControl' && +item.isEnabled === -1 && (
                      centralBlockNews.arrPeopleControl.map((item) => <NewsLine {...item} key={`news-line-${item.id}`} disableComment={disableComment} picModerateYear={picModerateYear} />)
                    )}

                    {item.serviceName === 'enableVoting' && +item.isEnabled === 1 && <SliderConcurs />}
                    {item.serviceName === 'enableVoting' && +item.isEnabled === -1 && (
                      centralBlockNews.arrVoting.map((item) => <NewsLine {...item} key={`news-line-${item.id}`} disableComment={disableComment} picModerateYear={picModerateYear} />)
                    )}
                  </RowsLayout>
                </div>
                <div className={styles.contentRightStretch}>
                  <NewsCard {...services[index]} {...rightColumnNews[index]} picModerateYear={picModerateYear} />
                </div>
              </div>
              <div className={styles.row} key={`news-block-row-${services[index]}`}>
                <div className={styles.contentMain}>
                  {
                    centralBlockNews[`arr${index}`].map((item) => <NewsLine {...item} key={`news-line-${item.id}`} disableComment={disableComment} picModerateYear={picModerateYear} />)
                  }
                </div>
                <div className={`${styles.contentRightStretch} ${classBannerRight}`}>
                  {!isMobile && (
                  <>
                    {bannersRight.length > 0 && index !== 1 && (<Banner {...bannersRight[index > 1 ? index - 1 : index]} />)}
                    {bannersMediaMetrika.length > 0 && index === 1 && <Banner {...bannersMediaMetrika[0]} />}
                  </>
                  )}

                </div>
              </div>
            </div>
          ))}
        </ProjectCol3Layout>
        {isMobile && (
        <Link prefetch={false} href="/news">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={styles.btnReadAllNews}>Читать все новости</a>
        </Link>
        )}
      </ProjectLayout>
    </>
  );
});

export const getServerSideProps = (async () => {
  let dailyNews = null;
  let lastNews = null;
  let mainNews = null;
  let centralNews = null;
  let popularNews = null;
  let commentedNews = null;
  let serviceFlags = null;
  let disableComment = null;
  let picModerateYear = null;

  try {
    const servicePoints = await apiGetServiceFlags();
    disableComment = await apiGetChatSettings('disableComment');
    picModerateYear = await apiGetPicModerateYear();
    serviceFlags = await servicePoints;

    const news = await apiGetAllNews();
    lastNews = 'left_bar' in news && Array.isArray(news.left_bar) ? news.left_bar : [];
    mainNews = 'is_main' in news && Array.isArray(news.is_main) ? news.is_main : [];
    centralNews = 'main_central' in news && Array.isArray(news.main_central) ? news.main_central : [];
    popularNews = 'most_viewed' in news && Array.isArray(news.most_viewed) ? news.most_viewed : [];
    commentedNews = 'most_commented' in news && Array.isArray(news.most_commented) ? news.most_commented : [];
    dailyNews = 'is_dailynews' in news && Array.isArray(news.is_dailynews) ? news.is_dailynews : [];

    const getOnlySelectedKeys = (array, deleteProps) => {
      array.map((item) => {
        Object.keys(item).forEach((n) => {
          deleteProps.includes(n) || delete item[n];
          return item;
        });
      });
    };

    getOnlySelectedKeys([
      ...lastNews || [],
      ...popularNews || [],
      ...dailyNews || [],
      ...commentedNews || [],
    ], ArticleInColumns);

    getOnlySelectedKeys([
      ...mainNews || [],
      ...centralNews || [],
    ], ArtilcesInCentralColumn);
  } catch (err) {
    console.log(null);
  }

  return {
    props: {
      dailyNews,
      lastNews,
      mainNews,
      centralNews,
      popularNews,
      commentedNews,
      serviceFlags,
      disableComment,
      picModerateYear,
    },
  };
});

export default Index;
