import React from 'react';
import dynamic from 'next/dynamic';
import {
  ArticleTagsKirov,
  ArticleRelated,
  ArticleBody,
} from './index';

import { Banner } from '../banner';
import { VoteType } from './types';
import { ArticleSocial } from '../article-social';
import styles from './article.module.scss';

const ArticleVote = dynamic(
  () => import('./article-vote').then((mod) => mod.ArticleVote),
  { loading: () => <p>...</p>, ssr: false },
);

type RelatedType = {
  id: number,
  title: string,
  publish_at: number,
};

type Props = {
  id: number,
  text: string,
  publish_at: number,
  updated_at: number,
  picauth_url: string,
  image: string,
  image_picnews: string,
  image_picnews_webp: string,
  image_picfullsize: string,
  image_picfullsize_webp: string,
  image_pictv: string,
  image_pictv_webp: string,
  views_count: number,
  add_caption: number | string | boolean,
  cens: string,
  redactor: string,
  title: string,
  tags:string,
  lead: string,
  endtext: string,
  uid: string,
  erid: string,
  relatedArticles: Array<RelatedType>,
  relatedArticles_comm: Array<RelatedType>,
  voting: Array<VoteType>,
  uri: string,
  picauth: string,
  superPromotion: any,
  gallery: any,
  textLength: number,
  stat: number,
  isPreview: boolean,
  disableComment?: number,
  global_article_origin: string,
  articleCaption?: any,
  bannersInnerArticle: any,
  bannersInnerArticleTop: any,
  bannersInnerArticleAfterTags: any,
  isBnnerInsteadRelatedArticles: number | string,
  minCharacterArticleForShowBanner: number | string,
  characterSpacingBannerInArticle: number | string,
  bannerInsteadRelatedArticles: any,
  bannerInsteadMainImageArticles: any,
  getBanners: any,
  picModerateYear: number,
};

const Article: React.FC<Props> = (props) => {
  const {
    id,
    // redactor,
    title,
    voting,
    tags,
    relatedArticles,
    relatedArticles_comm,
    disableComment,
    isBnnerInsteadRelatedArticles,
    bannerInsteadRelatedArticles,
    uri,
    bannersInnerArticleAfterTags,
  } = props;

  return (
    <>
      <div className={styles.article} itemType="http://schema.org/NewsArticle" itemScope>
        <meta itemProp="identifier" content={String(id)} />
        <meta itemProp="name" content={title} />
        <ArticleBody {...props} />
        {voting && <ArticleVote voting={voting} />}
        {uri && <ArticleSocial uri={uri} disableComment={disableComment} />}

        <div className={styles.articleFooter}>
          {tags && process.env.NEXT_PUBLIC_FORK_NAME === 'CHEBOKSARY' && <ArticleTagsKirov tags={tags} />}
          {bannersInnerArticleAfterTags.length > 0 && (
            <Banner
              className={styles.articleBannerAfterTags}
              {...bannersInnerArticleAfterTags[0]}
            />
          )}

          {+isBnnerInsteadRelatedArticles === 1 && bannerInsteadRelatedArticles.length > 0 ? (
            <Banner
              className={styles.articleBannerAfterTags}
              {...bannerInsteadRelatedArticles[0]}
            />
          ) : (
            <>
              {((Array.isArray(relatedArticles) && relatedArticles.length > 0)
              || (Array.isArray(relatedArticles_comm) && relatedArticles_comm.length > 0)) && (
                <>
                  <ArticleRelated
                    relatedData={relatedArticles}
                    relatedCommData={relatedArticles_comm}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Article;
