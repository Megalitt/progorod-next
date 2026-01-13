import React from 'react';
import { useSelector } from 'react-redux';
import { ProjectCol2Layout } from '../../../layouts/project-col2-layout';
import { ProjectCol3Layout } from '../../../layouts/project-col3-layout';
import { RowsLayout } from '../../../layouts/rows-layout';

import { Article } from '..';
import { Banner } from '../../banner';
import { Chat } from '../../chat';
import { NewsCard } from '../../news-card';
import { NewsColumn } from '../../news-column';
import { NewsLine } from '../../news-line';
import { columnCenterSelector } from '../../../store/column-height/column-height-selector';
import { promotionComm2NewsSelector, promotionCommNewsSelector, promotionNewsSelector } from '../../../store/general-news/general-news-selectors';
import { bannersCountInPositionSelector } from '../../../store/banner-position/banner-position-selectors';
import { apiPostBannerStat, apiGetBanner } from '../../../services/banner';
import { BannerKeys } from '../../../utils/consts';
import { getBanners } from '../../../utils/get-banners';
import { changeOrderInArray } from '../../../utils/banners/change-order-in-array';

type Props = {
  rightMainBanners: any,
  superPromotionNews: any,
  fetchDataContent: any,
  popularNews: any,
  lastNews: any,
  lastNewsHeight: number,
  isPreview: boolean,
  isBnnerInsteadRelatedArticles: number | string,
  minCharacterArticleForShowBanner: number | string,
  characterSpacingBannerInArticle: number | string,
  disableComment: number,
  disableCommentForAnonim: number,
  picModerateYear: number,
  fetchDataPinnedNews: any,
  fetchArticleCaption: any,
};

const ArticleInfiniteScroll: React.FC<Props> = ({
  superPromotionNews,
  fetchDataContent,
  popularNews,
  lastNews,
  isPreview,
  disableComment,
  disableCommentForAnonim,
  picModerateYear,
  fetchDataPinnedNews,
  fetchArticleCaption,
  isBnnerInsteadRelatedArticles,
  minCharacterArticleForShowBanner,
  characterSpacingBannerInArticle,
}) => {
  const lastNewsHeight = useSelector(columnCenterSelector);
  const rightColumn = useSelector(promotionNewsSelector);
  const rightColumnComm = useSelector(promotionCommNewsSelector);
  const rightColumnComm2 = useSelector(promotionComm2NewsSelector);

  const rightColumnAdvNews = rightColumnComm.length > 0
    ? rightColumnComm.slice(0, 1)
    : rightColumn.slice(0, 1);
  // eslint-disable-next-line no-nested-ternary
  const rightColumnAdvNews2 = rightColumnComm2.length > 0
    ? rightColumnComm2.slice(0, 1)
    : rightColumnComm.length > 0
      ? rightColumn.slice(0, 1)
      : rightColumn.slice(1, 2);

  const pinnedNews = React.useMemo(() => changeOrderInArray(fetchDataPinnedNews, 'pinned_news'), []);

  const [bannersCentral, setBannersCentral] = React.useState([]);
  const [bannersRight, setBannersRight] = React.useState([]);
  const [bannersMediaMetrika, setBannersMediaMetrika] = React.useState([]);
  const [rightMainBanners, setRightMainBanners] = React.useState([]);
  const [bannersPuls, setPulsBanners] = React.useState([]);
  const [bannersPartner, setPartnerBanners] = React.useState([]);
  const [bannersInnerArticle, setInnerArticleBanners] = React.useState([]);
  const [bannersInnerArticleTop, setInnerArticleTopBanners] = React.useState([]);
  const [bannersInnerArticleAfterTags, setInnerArticleAfterTagsBanners] = React.useState([]);
  const [bannersInsteadMainImageArticles, setBannerInsteadMainImageArticle] = React.useState([]);
  const [bannerInsteadRelatedArticles, setBannerInsteadRelatedArticles] = React.useState([]);
  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);

  const [popularColumnHeight, setPopularColumnHeight] = React.useState(0);

  React.useEffect(() => {
    getBanners(
      apiGetBanner,
      {
        bannerIdRightMain: BannerKeys.BANNER_MAIN_RIGHT,
        bannerIdRight: BannerKeys.BANNER_RIGHT,
        bannerIdCentral: BannerKeys.BANNER_CENTRAL,
        bannerIdMediaMetrika: BannerKeys.BANNER_MEDIAMETRIKA,
        bannerIdPuls: BannerKeys.BANNER_PULS,
        bannerIdPartner: BannerKeys.BANNER_PARTNERS,
        bannerIdInnerArticle: BannerKeys.BANNER_INNER_ARTICLE,
        bannerIdInnerArticleTop: BannerKeys.BANNER_INNER_ARTICLE_TOP,
        bannerIdInnerArticleAfterTags: BannerKeys.BANNER_INNER_ARTICLE_AFTER_TAGS,
        bannerIdInsteadRelatedArticles: BannerKeys.BANNER_INSTEAD_RELATED_ARTICLES,
        bannerIdInsteadMainImageArticles: BannerKeys.BANNER_INSTEAD_MAIN_IMAGE_ARTICLES,
        countArticleInnerTop: 3,
        countCentral: 2,
        bannersCountInPosition,
      },
      fetchDataContent,
    ).then(({
      bannersRightMain,
      bannersRight,
      bannersCentral,
      bannersMediaMetrika,
      bannersPuls,
      bannersPartner,
      bannersInnerArticle,
      bannersInnerArticleTop,
      bannersInnerArticleAfterTags,
      bannersInsteadRelatedArticles,
      bannersInsteadMainImageArticles,
      formData,
    }: any) => {
      setRightMainBanners(bannersRightMain);
      setBannersRight(bannersRight);
      setBannersCentral(bannersCentral);
      setBannersMediaMetrika(bannersMediaMetrika);
      setPulsBanners(bannersPuls);
      setPartnerBanners(bannersPartner);
      setInnerArticleBanners(bannersInnerArticle);
      setInnerArticleTopBanners(bannersInnerArticleTop);
      setInnerArticleAfterTagsBanners(bannersInnerArticleAfterTags);
      setBannerInsteadRelatedArticles(bannersInsteadRelatedArticles);
      setBannerInsteadMainImageArticle(bannersInsteadMainImageArticles);

      setTimeout(() => {
        apiPostBannerStat(formData);
      }, 10000);
    });
  }, [fetchDataContent]);

  const measuredRef = React.useCallback((node) => {
    if (node !== null) {
      setPopularColumnHeight(0);

      window.addEventListener('load', () => {
        setTimeout(() => {
          setPopularColumnHeight(node.getBoundingClientRect().height - 870);
        }, 3000);
      });

      setTimeout(() => {
        setPopularColumnHeight(node.getBoundingClientRect().height - 870);
      }, 3000);
    }
  }, [fetchDataContent]);

  return (
    <>
      <ProjectCol2Layout>
        <div ref={measuredRef}>
          <Article
            {...fetchDataContent}
            superPromotion={superPromotionNews.length > 1 && superPromotionNews[1]}
            disableComment={disableComment}
            picModerateYear={picModerateYear}
            bannersInnerArticle={bannersInnerArticle}
            bannersInnerArticleTop={bannersInnerArticleTop}
            bannersInnerArticleAfterTags={bannersInnerArticleAfterTags}
            bannerInsteadRelatedArticles={bannerInsteadRelatedArticles}
            bannerInsteadMainImageArticles={bannersInsteadMainImageArticles}
            isBnnerInsteadRelatedArticles={isBnnerInsteadRelatedArticles}
            minCharacterArticleForShowBanner={minCharacterArticleForShowBanner}
            characterSpacingBannerInArticle={characterSpacingBannerInArticle}
            isPreview={isPreview}
            articleCaption={fetchArticleCaption}
          />
        </div>
        <RowsLayout>
          {rightMainBanners.length > 0 && (
          <div className="contentRightMainBanner">
            <Banner {...rightMainBanners[0]} />
          </div>
          )}
          {
            superPromotionNews.length > 2
            && <NewsCard {...superPromotionNews[2]} picModerateYear={picModerateYear} />
          }
          <NewsColumn
            title="Популярное"
            news={[...popularNews]}
            columnHeight={popularColumnHeight}
          />
        </RowsLayout>
      </ProjectCol2Layout>
      <ProjectCol3Layout className="project-col3-layout-news" scroll>
        <NewsColumn
          title="Последние новости"
          news={[...lastNews]}
          columnHeight={lastNewsHeight}
        />
        {
          fetchDataPinnedNews && fetchDataPinnedNews.length > 0 && (
            pinnedNews.slice(0, 3).map((item) => <NewsLine {...item} key={`line-${item.id}`} disableComment={disableComment} picModerateYear={picModerateYear} />)
          )
        }
        {bannersRight.length > 0 && (
        <div className={process.env.NEXT_PUBLIC_TITLE_LENGTH === '120' ? 'contentRightStretchBanner120' : 'contentRightStretchBanner140'}>
          <Banner {...bannersRight[0]} />
        </div>
        )}

        <RowsLayout>
          {bannersCentral.length > 0 && (
          <div className="contentCentralBanner">
            <Banner {...bannersCentral[0]} />
          </div>
          )}
          <Chat
            link="articles"
            commentsMode={fetchDataContent ? fetchDataContent.comments_mode : 0}
            disableComment={disableComment}
            disableCommentForAnonim={disableCommentForAnonim}
          />

          {bannersCentral.length > 1 && (
          <div className="contentCentralBanner">
            <Banner {...bannersCentral[1]} />
          </div>
          )}
          {bannersPartner.length > 0 && <Banner {...bannersPartner[0]} />}
          {bannersPuls.length > 0 && <Banner {...bannersPuls[0]} />}
        </RowsLayout>
        <RowsLayout>
          {rightColumnAdvNews2.length > 0 && <NewsCard {...rightColumnAdvNews2[0]} picModerateYear={picModerateYear} />}
          {rightColumnAdvNews.length > 0 && <NewsCard {...rightColumnAdvNews[0]} picModerateYear={picModerateYear} />}
          {bannersMediaMetrika.length > 0 && (
          <div className={process.env.NEXT_PUBLIC_TITLE_LENGTH === '120' ? 'contentRightStretchBanner120' : 'contentRightStretchBanner140'}>
            <Banner {...bannersMediaMetrika[0]} />
          </div>
          )}
        </RowsLayout>
      </ProjectCol3Layout>
    </>
  );
};

export default ArticleInfiniteScroll;
