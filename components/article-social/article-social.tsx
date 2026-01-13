import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import {
  VKShareButton,
  VKShareCount,
  WhatsappShareButton,
  TelegramShareButton,
} from 'react-share';

import { domainSelector } from '../../store/seo/seo-selectors';

import styles from './article-social.module.scss';

type Props = {
  uri: string,
  disableComment?: number,
};

const ArticleSocial: React.FC<Props> = React.memo(({ uri, disableComment = 0 }) => {
  const domain = useSelector(domainSelector);
  const scrollButtonCommentHandle = () => {
    const htmlTag = document.querySelector('html');
    htmlTag.style.scrollBehavior = 'smooth';
    setTimeout(() => htmlTag.removeAttribute('style'), 1000);
  };

  return (
    <div className={styles.articleSocial}>
      {+disableComment !== 1 && (
      <a
        className={styles.btnComment}
        href="#comments"
        onClick={scrollButtonCommentHandle}
      >
        Комментарии
      </a>
      )}
      <ul className={styles.articleSocialList}>
        <li className={styles.articleSocialItem}>
          <VKShareButton
            url={`https://${domain}${uri}`}
            className={classNames(styles.articleSocialIcon, styles.articleSocialIconVk)}
          >
            &nbsp;
          </VKShareButton>
          <VKShareCount
            url={`https://${domain}${uri}`}
            className={styles.articleSocialCount}
          >
            {(count) => count}
          </VKShareCount>
        </li>
        <li className={styles.articleSocialItem}>
          <WhatsappShareButton
            url={`https://${domain}${uri}`}
            className={classNames(styles.articleSocialIcon, styles.articleSocialIconWs)}
          />
        </li>
        <li className={styles.articleSocialItem}>
          <TelegramShareButton url={`https://${domain}${uri}`}>
            <span className={classNames(styles.articleSocialIcon, styles.articleSocialIconTm)} />
          </TelegramShareButton>
        </li>
      </ul>
    </div>
  );
});

export default ArticleSocial;
