import React from 'react';
import { useSelector } from 'react-redux';
import { ProjectCol2Layout } from '../project-col2-layout';
import {
  popularNewsCommSelector,
  popularNewsSelector,
  promotionCommNewsSelector,
  promotionNewsSelector,
} from '../../store/general-news/general-news-selectors';
import { NewsCard } from '../../components/news-card';
import { Banner } from '../../components/banner';
import { NewsColumn } from '../../components/news-column';
import { setNewsViaCount } from '../../utils/index-news/set-news-via-count';
import styles from './service-layout.module.scss';

type Props = {
  children: JSX.Element[] | JSX.Element,
  rightMainBanners?: any,
  picModerateYear?: number,
  popularColumnHeight: number,
  popularNews?: any,  
};

const ServiceLayout: React.FC<Props> = React.memo(({ 
  children,
  rightMainBanners,
  popularColumnHeight,
  picModerateYear,
  popularNews,
}) => {
  const popularComm = useSelector(popularNewsCommSelector);
  const rightColumn = useSelector(promotionNewsSelector);//TODO не используется, нужно убрать
  const rightColumnComm = useSelector(promotionCommNewsSelector);

  const rightColumnAdvNews = rightColumnComm && rightColumnComm.length > 0
    ? rightColumnComm.slice(0, 1)
    : rightColumn.slice(0, 1);//TODO не используется, нужно убрать

  const popularNewsMixedWithComm = popularComm && popularComm.length > 0
    ? setNewsViaCount(popularNews, popularComm, 4)
    : popularNews;

  return (
    <ProjectCol2Layout>
      {children}
      <div className={styles.servicesLayout}>
        {rightMainBanners && rightMainBanners.length > 0 && (
          <div className={process.env.NEXT_PUBLIC_TITLE_LENGTH === '120' ? 'contentRightStretchBanner120' : 'contentRightStretchBanner140'}>
            <Banner {...rightMainBanners[0]} />
          </div>
        )}
        {rightColumnAdvNews.length > 0 && <NewsCard {...rightColumnAdvNews[0]} picModerateYear={picModerateYear} />}
        <NewsColumn title="Популярные" news={popularNewsMixedWithComm} columnHeight={popularColumnHeight} />
      </div>
    </ProjectCol2Layout>
  );
});

export default ServiceLayout;
