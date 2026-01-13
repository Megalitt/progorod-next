import React from 'react';
import { getTagsArray } from '../../../utils/get-tags-array';
import styles from './article-tags-kirov.module.scss';

type Props = {
  tags: string
};

const ArticleTagsKirov: React.FC<Props> = React.memo(({ tags }) => {
  const tagsArray = getTagsArray(tags);
  return (
    <>
      {tagsArray.length > 0 && (
        <ul className={styles.articleTags}>
          {tagsArray.map((tag) => (
            <li className={styles.articleTagsItem} key={`Tag-${tag.tagName}`}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href={tag.tagHref} className={styles.articleTagsLink}>{tag.tagName}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
});

export default ArticleTagsKirov;
