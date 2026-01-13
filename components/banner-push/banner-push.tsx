import React from 'react';
import classNames from 'classnames';
import { Banner } from '../banner';
import { BannerKeys } from '../../utils/consts';

import styles from './banner-push.module.scss';

type BannerDataType = {
  id: number,
  position_key: string,
  name: string,
  uri: string,
  html: string,
  html_sm: string,
  html_md: string,
  image_file: string | null,
  image_file_md: string | null,
  image_file_sm: string | null,
  flash_file: string | null,
  html_file: string | null,
  headscript: string | null,
};

type Props = {
  bannerDataPush: BannerDataType,
  onCloseBannerPushClick: (boolean) => void,
};

const BannerPush: React.FC<Props> = React.memo(({
  bannerDataPush,
  onCloseBannerPushClick,
}) => {
  const refBannerPush = React.useRef(null);
  const { image_file, image_file_md, image_file_sm } = bannerDataPush;
  const bannerImages = [image_file, image_file_md, image_file_sm];
  const isBannerImage = bannerImages.some((elem) => (typeof elem !== 'undefined' && elem !== null));

  React.useEffect(() => {
    if (refBannerPush.current) {
      if (!isBannerImage) {
        refBannerPush.current.style = 'opacity: 0;';
      }
      setTimeout(() => {
        if (refBannerPush.current.querySelector("[id^='SVK']") || refBannerPush.current.querySelector("[class^='smi24']")) {
          refBannerPush.current.style = 'opacity: 1;';
          refBannerPush.current.style = 'height: 100%';
        }
      }, 3000);
    }
  }, [refBannerPush]);

  return (
    <>
      <div
        className={classNames(styles.banner, {
          [styles.bannerFullscreen]: bannerDataPush.position_key === BannerKeys.BANNER_PUSH_FULL
          || bannerDataPush.position_key === BannerKeys.BANNER_PUSH_FULL_SECOND
          || bannerDataPush.position_key === BannerKeys.BANNER_PUSH_FULL_THIRD,
        })}
        ref={refBannerPush}
      >
        {bannerDataPush && (
        <button
          type="button"
          className={styles.bannerBtnClose}
          aria-label="Скрыть баннер"
          onClick={onCloseBannerPushClick}
        />
        )}
        {bannerDataPush && <Banner className={styles.bannerPushLinkIframe} {...bannerDataPush} />}
      </div>
      {bannerDataPush && (
      <div
        className={styles.bannerBack}
        onClick={onCloseBannerPushClick}
      />
      )}
    </>
  );
});

export default BannerPush;
