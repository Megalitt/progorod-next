import React from 'react';
import Link from 'next/link';
import { ArticlesRelated } from '../index';
import { createMarkup } from '../../../utils/core/create-markup';
import { getPostInnerDate } from '../../../utils/time/get-post-inner-date';
import { separateTextToParts } from '../../../utils/separate-text-to-parts';
import { getImagePath } from '../../../utils/core/get-image-path';
import { ImagePath } from '../../../utils/consts';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'amp-img': any;
    }
  }
}

const Article = ({ children, article, picModerateYear }) => {
  const {
    id,
    title,
    cens,
    publish_at,
    image_picfullsize_webp,
    erid,
    picauth,
    ampText,
    rubric,
    relatedArticles,
    global_article_origin,
  } = article;

  /* eslint @typescript-eslint/quotes: 0 */
  /* eslint consistent-return: 0 */
  const regList = {
    allowfullscreen: `(allowfullscreen)=("[^<>"]*"|'[^<>']*') | (mozallowfullscreen)=("[^<>"]*"|'[^<>']*') | (webkitallowfullscreen)=("[^<>"]*"|'[^<>']*')`,
    allowtransparency: `(allowtransparency)=("[^<>"]*"|'[^<>']*')`,
    gesture: `(gesture)=("[^<>"]*"|'[^<>']*')`,
    loading: `(loading)=("[^<>"]*"|'[^<>']*')`,
    caption: `(caption)=("[^<>"]*"|'[^<>']*')`,
    contenteditable: `(contenteditable)=("[^<>"]*"|'[^<>']*')`,
    clear: `(clear)=("[^<>"]*"|'[^<>']*')`,
    name: `(name)=("[^<>"]*"|'[^<>']*')`,
  };

  const repaceAttributesInHtmlString = (ampText, regList) => {
    let newAmpText = '';
    Object.keys(regList).forEach((name) => {
      const regExp = new RegExp(regList[name], 'gm');
      switch (name) {
        case 'allowfullscreen':
          newAmpText = ampText.replace(regExp, 'sandbox="allow-scripts allow-same-origin allow-popups" ');
          break;
        case 'allowtransparency':
          newAmpText = newAmpText.replace(regExp, '');
          break;
        case 'loading':
          newAmpText = newAmpText.replace(regExp, '');
          break;
        case 'gesture':
          newAmpText = newAmpText.replace(regExp, '');
          break;
        case 'caption':
          newAmpText = newAmpText.replace(regExp, '');
          break;
        case 'contenteditable':
          newAmpText = newAmpText.replace(regExp, '');
          break;
        case 'clear':
          newAmpText = newAmpText.replace(regExp, '');
          break;
        case 'name':
          newAmpText = newAmpText.replace(regExp, '');
          break;
        default:
          return false;
      }
    });
    return newAmpText;
  };

  const ampTextTotal = repaceAttributesInHtmlString(ampText, regList);

  const text = separateTextToParts(ampTextTotal, 3);
  const postDate = new Date(+publish_at * 1000);
  const postYear = postDate.getFullYear();

  return (
    <>
      <article className="article" id="article-amp">
        <h1>{title}</h1>
        <div className="article__wrap">
          <span>{getPostInnerDate(publish_at, 'amp')}</span>
          <span>
            Возрастное ограничение
            {cens}
          </span>
        </div>
        {image_picfullsize_webp && image_picfullsize_webp.length > 0 && (
          <>
            {(+postYear === 0 || (+postYear > 0 && +postYear > +picModerateYear)) && (
              <figure className="article__img-wrap">
                <amp-img
                  src={image_picfullsize_webp && image_picfullsize_webp.length > 0 ? getImagePath({
                    globalArticleOrigin: global_article_origin,
                    image: image_picfullsize_webp,
                  }) : getImagePath({
                    globalArticleOrigin: global_article_origin,
                    image: `${ImagePath.IMG_OG}${id}.png`,
                  })}
                  class="cover"
                  layout="fill"
                  alt={`Фото к статье: ${title}`}
                />
                {picauth && <figcaption className="article__img-label">{picauth}</figcaption>}
              </figure>
            )}
          </>
        )}
        {erid && erid.length > 0 && (
          <p>
            erid:
            {' '}
            {erid}
          </p>
        )}
        <div className="article__main" dangerouslySetInnerHTML={createMarkup(text[0].replace('allowfullscreen="1"', ''))} />
        { children }
        <div className="article__main" dangerouslySetInnerHTML={createMarkup(text[1].replace('allowfullscreen="1"', ''))} />
        <Link prefetch={false} href={`/${rubric}/${id}`}>
          <a className="button">Перейти на полную версию страницы</a>
        </Link>
        {Array.isArray(relatedArticles) && relatedArticles.length > 0 && <ArticlesRelated artiles={relatedArticles} />}
      </article>
    </>
  );
};
export default Article;
