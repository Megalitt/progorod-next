import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import classNames from 'classnames';
import { separateTextToParts } from '../../../utils/separate-text-to-parts';
import { getSubstrByWord } from '../../../utils/get-substr-by-word';
import { getImagePath } from '../../../utils/core/get-image-path';
import { createMarkup } from '../../../utils/core/create-markup';

import { isMobileSelector } from '../../../store/seo/seo-selectors';
import { commentsCountsSelector } from '../../../store/comments/comments-selectors';
import { socialSelector } from '../../../store/social/social-selectors';
import { loginUserData } from '../../../store/login/login-selectors';

import { Api } from '../../../services/endpoints';
import { DATE_CREATE_NEW_PICTURE_SIZES_NEWS } from '../../../utils/consts';

import { ArticleLayout } from '../../../layouts/article-layout';
import { Banner } from '../../banner';
import SocialListSubscribe from '../../social-list-subscribe/social-list-subscribe';
import LinkCustom from '../../link-custom/link-custom';

import {
  ArticleInfo,
  ArticleGallery,
  ArticleSuperPromotion,
  ArticleTags,
} from '../index';

import { getStringToHtml } from '../../../utils/get-string-to-html';
import styles from './article-body.module.scss';

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
  tags: string,
  lead: string,
  endtext: string,
  uid: string,
  erid: string,
  picauth: string,
  superPromotion: any,
  gallery: any,
  textLength: number,
  stat: number,
  isPreview: boolean,
  global_article_origin: string,
  articleCaption?: any,
  bannersInnerArticle: any,
  bannersInnerArticleTop: any,
  bannerInsteadMainImageArticles: any,
  minCharacterArticleForShowBanner: number | string,
  characterSpacingBannerInArticle: number | string,
  picModerateYear: number,
};

const ArticleBody: React.FC<Props> = React.memo(({
  id,
  text,
  publish_at,
  updated_at,
  image,
  image_picnews,
  image_picnews_webp,
  image_picfullsize,
  image_picfullsize_webp,
  image_pictv,
  image_pictv_webp,
  views_count,
  add_caption,
  cens,
  redactor,
  title,
  lead,
  endtext,
  uid,
  tags,
  erid,
  picauth,
  superPromotion,
  gallery,
  textLength,
  stat,
  isPreview,
  global_article_origin,
  articleCaption,
  bannersInnerArticle,
  bannersInnerArticleTop,
  bannerInsteadMainImageArticles,
  minCharacterArticleForShowBanner,
  characterSpacingBannerInArticle,
  picModerateYear,
  picauth_url,
}) => {
  const router = useRouter();
  const isMobile = useSelector(isMobileSelector);
  const userData = useSelector(loginUserData);
  const [imageIsError, setImageIsError] = React.useState(false);
  const [isSSR, setIsSSR] = React.useState(true);

  const commentsCounts = useSelector(commentsCountsSelector);
  const socialLinks = useSelector(socialSelector);

  const articleAllText = `${lead && lead.length > 0 && `<p><strong>${lead}</strong></p>`}${text}`;

  const refContainerPartEnd = React.useRef(null);
  const articleTextPartOne = separateTextToParts(global_article_origin ? articleAllText.replace(/\b(src=["']?)/gim, `$1https://${global_article_origin}`) : articleAllText, 2);
  const articleTextPartTwo = separateTextToParts(articleTextPartOne[1], 1);
  const articleTextPartThree = separateTextToParts(articleTextPartTwo[1], 1);

  const getHtmlStringOneFirst = getStringToHtml(articleTextPartOne[0] && articleTextPartOne[0].trim()) && getStringToHtml(articleTextPartOne[0] && articleTextPartOne[0].trim()).slice(0, 2);
  const getHtmlStringOneSecond = getStringToHtml(articleTextPartOne[0] && articleTextPartOne[0].trim()) && getStringToHtml(articleTextPartOne[0] && articleTextPartOne[0].trim()).splice(2);
  const getHtmlStringTwo = getStringToHtml(articleTextPartTwo[0] && articleTextPartTwo[0].trim()) && getStringToHtml(articleTextPartTwo[0] && articleTextPartTwo[0].trim());
  const getHtmlStringThree = getStringToHtml(articleTextPartTwo[1] && articleTextPartTwo[1].trim()) && getStringToHtml(articleTextPartTwo[1] && articleTextPartTwo[1].trim());

  const useRefsPartsOne = [];
  const useRefsPartsTwo = [];

  const postDate = new Date(+publish_at * 1000);
  const postYear = postDate.getFullYear();

  if (getHtmlStringOneFirst) {
    for (let i = 0; i < getHtmlStringOneFirst.length; i += 1) {
      useRefsPartsOne[i] = React.createRef();
    }
  }

  if (getHtmlStringOneSecond || getHtmlStringTwo || getHtmlStringThree) {
    const getAllLastParts = [...getHtmlStringOneSecond || [], ...getHtmlStringTwo || [], ...getHtmlStringThree || []];
    for (let i = 0; i < getAllLastParts.length; i += 1) {
      useRefsPartsTwo[i] = React.createRef();
    }
  }

  const setHtmlToUseRefParts = (useRefPartList, textPartsHtml) => {
    for (let i = 0; i < useRefPartList.length; i += 1) {
      if (useRefPartList[i].current) {
        const range = document.createRange();
        range.selectNodeContents(useRefPartList[i].current);
        range.deleteContents();
        useRefPartList[i].current.appendChild(range.createContextualFragment(textPartsHtml[i]));
      }
    }
  };

  const renderUseRefParts = React.useCallback((
    useRefsParts,
    articleTextPartsHtml,
    reactKeyName,
  ) => {
    const items = [];

    let totalTextLength = 0;
    let totalCountBanners = 0;

    for (let i = 0, totalTextLength = 0; i < useRefsParts.length; i += 1) {
      let isBanner = false;
      totalTextLength += getSubstrByWord(articleTextPartsHtml[i]).replace(/(<(\/?[^>]+)>)/g, '').length;

      if (totalTextLength > +characterSpacingBannerInArticle) {
        totalTextLength = 0;
        isBanner = true;
      }

      if (isBanner && totalCountBanners < 3) {
        totalCountBanners += 1;
      }
    }

    for (let i = 0, countBanners = 0, countParagraph = 0; i < useRefsParts.length; i += 1) {
      totalTextLength += getSubstrByWord(articleTextPartsHtml[i]).replace(/(<(\/?[^>]+)>)/g, '').length;
      let isBanner = false;
      countParagraph += 1;

      items.push(<div key={`${reactKeyName} - ${i}`} ref={useRefsParts[i]} />);
      if (totalTextLength > +characterSpacingBannerInArticle) {
        totalTextLength = 0;
        isBanner = true;
      }

      if (isBanner && countBanners < 6) {
        countBanners += 1;
        countParagraph = 0;

        if (bannersInnerArticleTop && bannersInnerArticleTop.length > 0) {
          const bannerKey = bannersInnerArticleTop[countBanners - 1];
          if (bannerKey) {
            items.push(
              <React.Fragment key={`BannerInArticle-${bannerKey?.id}`}>
                <Banner
                  className={styles.articleBodyBanner}
                  {...bannersInnerArticleTop[countBanners - 1]}
                />
              </React.Fragment>,
            );
          }
        }
      }

      if (countParagraph === 0 && countBanners === totalCountBanners) {
        if (isMobile && superPromotion) {
          items.push(<ArticleSuperPromotion key={`ArticleSuperPromotion - ${i}`} {...superPromotion} />);
        }
      }
    }

    return items;
  }, [bannersInnerArticleTop]);

  const setStyleToVideoIframe = React.useCallback((iframeType) => {
    for (let i = 0; i < iframeType.length; i += 1) {
      const hasAttrWidth = iframeType[i].hasAttribute('width');
      const hasAttrHeight = iframeType[i].hasAttribute('height');

      // eslint-disable-next-line no-param-reassign
      iframeType[i].parentNode.style.cssText = 'position: relative; display: block;';
      // eslint-disable-next-line no-param-reassign
      iframeType[i].parentNode.style.cssText += 'padding-top: 56.4%;';
      // eslint-disable-next-line no-param-reassign
      iframeType[i].style.cssText = 'position: absolute; height: 100%; top: 0; left: 0;';

      if (hasAttrWidth && hasAttrHeight) {
        if (iframeType[i].width < iframeType[i].height) {
          // eslint-disable-next-line no-param-reassign
          iframeType[i].parentNode.style.cssText += 'height: calc(100vw * 16 / 9); max-height: 900px; padding-top: 0;';
        }

        if (iframeType[i].width === iframeType[i].height) {
          // eslint-disable-next-line no-param-reassign
          iframeType[i].style.cssText = 'position: absolute; height: 100%; top: 0; left: 0;';
          // eslint-disable-next-line no-param-reassign
          iframeType[i].parentNode.style.cssText = 'position: relative; padding-top: 75%;';
        }
      } else if (!hasAttrWidth && hasAttrHeight) {
        // eslint-disable-next-line no-param-reassign
        iframeType[i].parentNode.style.cssText += 'height: calc(100vw * 16 / 9); max-height: 900px; padding-top: 0;';
      }
    }
  }, []);

  React.useEffect(() => {
    setHtmlToUseRefParts(useRefsPartsOne, getHtmlStringOneFirst);
    setHtmlToUseRefParts(useRefsPartsTwo, [...getHtmlStringOneSecond || [], ...getHtmlStringTwo || [], ...getHtmlStringThree || []]);
  }, [isSSR, router, isPreview, useRefsPartsOne, useRefsPartsTwo]);

  React.useEffect(() => {
    const articleBody = document.getElementById('articleBody');

    if (articleBody) {
      const iframeVk = document.querySelectorAll("iframe[src*='vk.com/video']");
      const iframeYoutube = document.querySelectorAll("iframe[src*='youtube.com']");

      if (iframeVk && iframeVk.length > 0) {
        setStyleToVideoIframe(iframeVk);
      }

      if (iframeYoutube && iframeYoutube.length > 0) {
        setStyleToVideoIframe(iframeYoutube);
      }
    }
  }, [useRefsPartsOne, useRefsPartsTwo]);

  React.useEffect(() => {
    const containerEnd = refContainerPartEnd.current;
    if (containerEnd) {
      const rangePartsEnd = document.createRange();
      rangePartsEnd.selectNodeContents(containerEnd);
      rangePartsEnd.deleteContents();
      containerEnd.appendChild(rangePartsEnd.createContextualFragment(endtext));
    }
  }, [router, isSSR]);

  React.useEffect(() => {
    setIsSSR(false);
  }, []);

  React.useEffect(() => {
    if (!isSSR) {
      const mainImg = document.querySelector('#articleBodyImg');
      if (mainImg) {
        mainImg.addEventListener('error', () => {
          console.log('error');
          setImageIsError(true);
        });
      }
    }
  }, [isSSR]);

  return (
    <div className={styles.articleBody} itemProp="articleBody" id="articleBody">
      <ArticleLayout>
        <h1 itemProp="headline">{title}</h1>
        {tags && process.env.NEXT_PUBLIC_FORK_NAME === 'KIROV' && <ArticleTags tags={tags} />}
        <ArticleInfo
          publish_at={publish_at}
          views_count={views_count}
          cens={cens}
          redactor={redactor}
          uid={uid}
          commentsCount={commentsCounts}
          stat={stat}
          updated_at={updated_at}
        />
        {image && image.length > 0 && (
          <>
            {(+postYear === 0 || (+postYear > 0 && +postYear >= +picModerateYear)) && (
              <div
                className={classNames(styles.articleBodyImgWrap, {
                  [styles.articleBodyImgWrapNoImage]: imageIsError,
                })}
              >
                {!imageIsError && (
                  <picture>
                    {updated_at > DATE_CREATE_NEW_PICTURE_SIZES_NEWS && (
                      <>
                        <source type="image/webp" media="(max-width: 360px)" srcSet={image_pictv_webp && getImagePath({ globalArticleOrigin: global_article_origin, image: image_pictv_webp })} />
                        <source media="(max-width: 360px)" srcSet={image_pictv && getImagePath({ globalArticleOrigin: global_article_origin, image: image_pictv })} />
                      </>
                    )}
                    <source type="image/webp" media="(max-width: 480px)" srcSet={image_picnews_webp && getImagePath({ globalArticleOrigin: global_article_origin, image: image_picnews_webp })} />
                    <source media="(max-width: 480px)" srcSet={image_picnews && getImagePath({ globalArticleOrigin: global_article_origin, image: image_picnews })} />
                    <source type="image/webp" srcSet={image_picfullsize_webp && getImagePath({ globalArticleOrigin: global_article_origin, image: image_picfullsize_webp })} />
                    <img
                      className={styles.articleBodyImg}
                      id="articleBodyImg"
                      itemProp="image"
                      src={getImagePath({ image: image_picfullsize })}
                      alt={title}
                      width={840}
                      fetchpriority="high"
                    />
                  </picture>
                )}
                {picauth_url && picauth_url.length > 0 ? (
                  <a className={styles.articleBodyImgAuthor} href={picauth_url} target="__blank" rel="noreferrer nofollow">{picauth}</a>
                ) : (
                  <span className={styles.articleBodyImgAuthor}>{picauth}</span>
                )}
              </div>
            )}
          </>
        )}

        {(typeof image === 'string' && image.length === 0) && (
          <Banner
            key="BannerInsteadMainImageArticles"
            className={styles.articleBodyBanner}
            {...bannerInsteadMainImageArticles[0]}
          />
        )}

        {typeof image === 'string' && image.length > 0 && (
          <SocialListSubscribe
            socialLinks={socialLinks}
            className={styles.articleBodySocialListSubcribe}
          />
        )}

        {erid && erid.length > 0 && <p>{`erid: ${erid}`}</p>}
        {userData.length !== 0 && userData.canModerate && (
        <LinkCustom
          className={classNames('btn', 'btnNoBg', 'btnNoBgEdit')}
          href={`${Api.ADMIN}${Api.ARTICLE}${Api.ARTICLES}/update?id=${id}`}
        >
          Редактировать новость
        </LinkCustom>
        )}
        {isSSR && !isPreview && (
        <>
          {articleTextPartOne[0] && articleTextPartOne[0].trim() !== '' && <div dangerouslySetInnerHTML={createMarkup(articleTextPartOne[0])} />}
          {articleTextPartTwo[0] && articleTextPartTwo[0].trim() !== '' && <div dangerouslySetInnerHTML={createMarkup(articleTextPartTwo[0])} />}
          {isMobile && superPromotion && <ArticleSuperPromotion {...superPromotion} />}
          {Array.isArray(articleTextPartThree) && articleTextPartThree.length > 0 && articleTextPartThree.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`three-parts-ssr-${index}`} dangerouslySetInnerHTML={createMarkup(item)} />
          ))}
          {global_article_origin && (
          <p>
            Материал взят с сайта
            {' '}
            <a href={`https://${global_article_origin}`} rel="noreferrer nofollow" target="_blank">{global_article_origin}</a>
          </p>
          )}
          {+add_caption === 1 && articleCaption.length > 0 && (
          <>
            <div dangerouslySetInnerHTML={createMarkup(articleCaption.text)} />
          </>
          )}
          {gallery && (
          <div className={styles.articleBodyGallery}>
            {gallery.length > 0 && gallery.map((item, index) => (
              <ArticleGallery
                key={`gallery-${item.picitem}`}
                gallery={gallery}
                index={index}
                {...item}
              />
            ))}
          </div>
          )}
        </>
        )}
        { !isSSR && (
        <>
          <>
            {useRefsPartsOne && Array.isArray(useRefsPartsOne) && useRefsPartsOne.length > 0 && useRefsPartsOne.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={`useRefsPartsOne - ${index}`}>
                <div ref={item} />
                {textLength > +minCharacterArticleForShowBanner && (index === 1) && bannersInnerArticle && bannersInnerArticle.length > 0 && (
                  <>
                    <Banner
                      className={styles.articleBodyBanner}
                      {...bannersInnerArticle[0]}
                    />
                  </>
                )}
              </div>
            ))}
            {renderUseRefParts(
              useRefsPartsTwo,
              [
                ...getHtmlStringOneSecond || [],
                ...getHtmlStringTwo || [],
                ...getHtmlStringThree || [],
              ],
              'useRefsPartsTwo',
            )}
            {global_article_origin && (
            <p>
              Материал взят с сайта
              {' '}
              <a href={`https://${global_article_origin}`} rel="noreferrer nofollow" target="_blank">{global_article_origin}</a>
            </p>
            )}
            {+add_caption === 1 && articleCaption.length > 0 && (
            <div dangerouslySetInnerHTML={createMarkup(articleCaption[0].value)} />
            )}
            {gallery && (
            <div className={styles.articleBodyGallery}>
              {gallery.length > 0 && gallery.map((item, index) => (
                <ArticleGallery
                  key={`gallery-${item.picitem}`}
                  gallery={gallery}
                  index={index}
                  {...item}
                />
              ))}
            </div>
            )}
          </>
          <div className={styles.articleBodyEnd}>
            {refContainerPartEnd.current !== null && refContainerPartEnd.current.innerText !== 'null' && <div ref={refContainerPartEnd} />}
          </div>
        </>
        )}
      </ArticleLayout>
    </div>
  );
});

export default ArticleBody;
