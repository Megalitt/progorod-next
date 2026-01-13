import React from 'react';
import classNames from 'classnames';
import { getSocialName } from '../../utils/get-social-name';
import styles from './social-list.module.scss';

type Props = {
  socialLinks: object,
  className?: string,
};

const SocialList: React.FC<Props> = React.memo(({
  socialLinks,
  className,
}) => {
  const socialLinksArr = {
    socialVk: getSocialName(socialLinks, 'social-vk-footer-icon'),
    socialOd: getSocialName(socialLinks, 'social-od-footer-icon'),
    socialIn: getSocialName(socialLinks, 'social-in-footer-icon'),
    socialTg: getSocialName(socialLinks, 'social-tg-footer-icon'),
    socialTw: getSocialName(socialLinks, 'social-tw-footer-icon'),
    socialZen: getSocialName(socialLinks, 'social-zen-footer-icon'),
  };

  return (
    <div
      className={classNames(
        styles.socialList,
        className,
      )}
    >
      {socialLinksArr.socialVk && (
        <a
          className={classNames([styles.socialListLink], [styles.socialListLinkVk])}
          href={socialLinksArr.socialVk.url}
          aria-label={socialLinksArr.socialVk.iconTitle}
          target="_blank"
          rel="noreferrer nofollow"
        />
      )}
      {socialLinksArr.socialOd && (
        <a
          className={classNames([styles.socialListLink], [styles.socialListLinkOdn])}
          href={socialLinksArr.socialOd.url}
          aria-label={socialLinksArr.socialOd.iconTitle}
          target="_blank"
          rel="noreferrer nofollow"
        />
      )}
      {socialLinksArr.socialIn && (
        <a
          className={classNames([styles.socialListLink], [styles.socialListLinkInst])}
          href={socialLinksArr.socialIn.url}
          aria-label={socialLinksArr.socialOd.iconTitle}
          target="_blank"
          rel="noreferrer nofollow"
        />
      )}
      {socialLinksArr.socialTg && (
        <a
          className={classNames([styles.socialListLink], [styles.socialListLinkTm])}
          href={socialLinksArr.socialTg.url}
          aria-label={socialLinksArr.socialTg.iconTitle}
          target="_blank"
          rel="noreferrer nofollow"
        />
      )}
      {socialLinksArr.socialTw && (
        <a
          className={classNames([styles.socialListLink], [styles.socialListLinkTw])}
          href={socialLinksArr.socialTw.url}
          aria-label={socialLinksArr.socialTw.iconTitle}
          target="_blank"
          rel="noreferrer nofollow"
        />
      )}
      {socialLinksArr.socialZen && (
        <a
          className={classNames([styles.socialListLink], [styles.socialListLinkZen])}
          href={socialLinksArr.socialZen.url}
          aria-label={socialLinksArr.socialZen.iconTitle}
          target="_blank"
          rel="noreferrer nofollow"
        />
      )}
    </div>
  );
});

export default SocialList;
