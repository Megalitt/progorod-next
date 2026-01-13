import React from 'react';
import Link from 'next/link';
import { ImagePath } from '../../../utils/consts';
import { getImagePath } from '../../../utils/core/get-image-path';

const ArticlesRelated = ({ artiles }) => (
  <div className="article-related">
    <h2>Читайте также:</h2>
    {artiles.map((item) => (
      <article className="article-related" key={item.id}>
        <Link prefetch={false} href={`/amp/${item.id}`}>
          <a className="article-related__link" title={item.title}>
            <div className="article-related__wrap">
              <div className="article-related__image-wrap">
                {}
                <amp-img
                  className="cover"
                  layout="fill"
                  src={item.image && item.image.length > 0 ? getImagePath({
                    globalArticleOrigin: item.global_article_origin,
                    image: item.image_picnews,
                  }) : getImagePath({
                    globalArticleOrigin: item.global_article_origin,
                    image: `${ImagePath.IMG_OG}${item.id}.png`,
                  })}
                  alt={item.title}
                />
              </div>
              <h2 className="article-related__title">{item.title}</h2>
            </div>
          </a>
        </Link>
      </article>
    ))}
  </div>
);

export default ArticlesRelated;
