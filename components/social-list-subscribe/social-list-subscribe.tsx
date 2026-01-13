import React from 'react';
import classNames from 'classnames';
import { getSocialName } from '../../utils/get-social-name';
import styles from './social-list-subscribe.module.scss';

type Props = {
  socialLinks: object,
  className?: string,
};

const SocialListSubscribe: React.FC<Props> = React.memo(({
  socialLinks,
  className,
}) => {
  const socialLinksArr = {
    socialYandexNews: getSocialName(socialLinks, 'social-yandex-news-articlecard-icon'),
    socialZen: getSocialName(socialLinks, 'social-zen-articlecard-icon'),
    socialTg: getSocialName(socialLinks, 'social-tg-articlecard-icon'),
    socialVk: getSocialName(socialLinks, 'social-vk-articlecard-icon'),
    socialOk: getSocialName(socialLinks, 'social-od-articlecard-icon'),
  };

  const socialLinksCount = Object.keys(socialLinksArr).filter((key) => (socialLinksArr[key] === '1')).length;
  return (
    <>
      {Array.isArray(socialLinks) && socialLinks.length > 0 && (
        <div
          className={classNames(
            styles.socialListSubscribe,
            className,
          )}
        >
          <div
            className={classNames(styles.socialListSubscribeLinks, {
              [styles.socialListSubscribeLinksMoveTwo]: socialLinksCount <= 2,
            })}
          >
            {socialLinksArr.socialVk && (
              <a
                className={classNames([styles.socialListSubscribeLink], [styles.socialListSubscribeLinkVk])}
                href={socialLinksArr.socialVk.url}
                aria-label={socialLinksArr.socialVk.iconTitle}
                target="_blank"
                rel="nofollow noreferrer"
              />
            )}
            {socialLinksArr.socialYandexNews && (
              <a
                className={classNames([styles.socialListSubscribeLink], [styles.socialListSubscribeLinkYandexNews])}
                href={socialLinksArr.socialYandexNews.url}
                aria-label={socialLinksArr.socialYandexNews.iconTitle}
                target="_blank"
                rel="nofollow noreferrer"
              />
            )}
            {socialLinksArr.socialZen && (
              <a
                className={classNames([styles.socialListSubscribeLink], [styles.socialListSubscribeLinkZen])}
                href={socialLinksArr.socialZen.url}
                aria-label={socialLinksArr.socialZen.iconTitle}
                target="_blank"
                rel="nofollow noreferrer"
              />
            )}
            {socialLinksArr.socialOk && (
              <a
                className={classNames([styles.socialListSubscribeLink], [styles.socialListSubscribeLinkOk])}
                href={socialLinksArr.socialOk.url}
                aria-label={socialLinksArr.socialOk.iconTitle}
                target="_blank"
                rel="nofollow noreferrer"
              />
            )}
            {socialLinksArr.socialTg && (
              <a
                className={classNames([styles.socialListSubscribeLink], [styles.socialListSubscribeLinkTg])}
                href={socialLinksArr.socialTg.url}
                aria-label={socialLinksArr.socialTg.iconTitle}
                target="_blank"
                rel="nofollow noreferrer"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
});

export default SocialListSubscribe;
