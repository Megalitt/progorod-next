import React from 'react';
import { useSelector } from 'react-redux';
import { NewsCard } from '../../components/news-card';
import { NewsColumn } from '../../components/news-column';
import { Banner } from '../../components/banner';
import { ProjectCol3Layout } from '../project-col3-layout';
import { RowsLayout } from '../rows-layout';
import {
  lastNewsCommSelector,
  lastNewsSelector,
  promotionComm2NewsSelector,
  promotionCommNewsSelector,
  promotionNewsSelector,
} from '../../store/general-news/general-news-selectors';

import { setNewsViaCount } from '../../utils/index-news/set-news-via-count';
import { columnCenterSelector } from '../../store/column-height/column-height-selector';

type Props = {
  children: JSX.Element[] | JSX.Element,
  bannersRight?: any,
  rightMainBanners?: any,
  bannersCentral?: any,
  bannersMediaMetrika?: any,
  picModerateYear?: any,
  lastNews?: any,
};

const ProjectInnerLayout: React.FC<Props> = React.memo(({
  children,
  bannersRight,
  rightMainBanners,
  bannersCentral,
  bannersMediaMetrika,
  picModerateYear,
  lastNews,
}) => {
  const lastComm = useSelector(lastNewsCommSelector);
  const rightColumn = useSelector(promotionNewsSelector);
  const rightColumnComm = useSelector(promotionCommNewsSelector);
  const rightColumnComm2 = useSelector(promotionComm2NewsSelector);

  const lastNewsMixedWithComm = lastComm.length > 0
    ? setNewsViaCount(lastNews, lastComm, 4)
    : lastNews;

  const rightColumnAdvNews = rightColumnComm.length > 0
    ? rightColumnComm.slice(0, 1)
    : rightColumn.slice(0, 1);
  // eslint-disable-next-line no-nested-ternary
  const rightColumnAdvNews2 = rightColumnComm2.length > 0
    ? rightColumnComm2.slice(0, 1)
    : rightColumnComm.length > 0
      ? rightColumn.slice(0, 1)
      : rightColumn.slice(1, 2);
  // eslint-disable-next-line no-nested-ternary
  const rightColumnAdvNews3 = rightColumnComm2.length > 1
    ? rightColumnComm2.slice(1, 2)
    : rightColumnComm.length > 1
      ? rightColumn.slice(1, 2)
      : rightColumn.slice(2, 3);

  const lastNewsHeight = useSelector(columnCenterSelector);

  return (
    <ProjectCol3Layout>
      <NewsColumn title="Последние новости" news={lastNewsMixedWithComm} columnHeight={lastNewsHeight} />

      <>
        {children[0] && children[0]}
        {bannersCentral && bannersCentral.length > 0 && children[0].props.children && children[0].props.children.length === 5 && (
          <RowsLayout>
            <div className="contentCentralBanner">
              <Banner {...bannersCentral[0]} />
            </div>
          </RowsLayout>
        )}
      </>
      <RowsLayout>
        {rightMainBanners && rightMainBanners.length > 0 && (
          <div className={process.env.NEXT_PUBLIC_TITLE_LENGTH === '120' ? 'contentRightStretchBanner120' : 'contentRightStretchBanner140'}>
            <Banner {...rightMainBanners[0]} />
          </div>
        )}
        {rightColumnAdvNews.length > 0 && <NewsCard {...rightColumnAdvNews[0]} picModerateYear={picModerateYear} />}
      </RowsLayout>
      <>
        {children[1] && children[1]}
        {bannersCentral && bannersCentral.length > 1 && children[1].props.children && children[1].props.children.length === 5 && (

        <RowsLayout>
          <div className="contentCentralBanner">
            <Banner {...bannersCentral[1]} />
          </div>
        </RowsLayout>

        )}
      </>
      <RowsLayout>
        {bannersRight && bannersRight.length > 0 && (
          <div className={process.env.NEXT_PUBLIC_TITLE_LENGTH === '120' ? 'contentRightStretchBanner120' : 'contentRightStretchBanner140'}>
            <Banner {...bannersRight[0]} />
          </div>
        )}
        {rightColumnAdvNews2.length > 0 && <NewsCard {...rightColumnAdvNews2[0]} picModerateYear={picModerateYear} />}
      </RowsLayout>

      <>
        {children[2] && children[2]}
        {bannersCentral && bannersCentral.length > 2 && children[2].props.children && children[2].props.children.length === 5 && (
          <RowsLayout>
            <div className="contentCentralBanner">
              <Banner {...bannersCentral[2]} />
            </div>
          </RowsLayout>
        )}
        {children[3] && children[3]}
      </>
      <RowsLayout>
        {bannersMediaMetrika && bannersMediaMetrika.length > 0 && (
          <div className={process.env.NEXT_PUBLIC_TITLE_LENGTH === '120' ? 'contentRightStretchBanner120' : 'contentRightStretchBanner140'}>
            <Banner {...bannersMediaMetrika[0]} />
          </div>
        )}
        {rightColumnAdvNews3.length > 0 && <NewsCard {...rightColumnAdvNews3[0]} picModerateYear={picModerateYear} />}
      </RowsLayout>
    </ProjectCol3Layout>
  );
});

export default ProjectInnerLayout;
