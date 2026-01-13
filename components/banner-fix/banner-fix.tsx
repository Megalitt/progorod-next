import React from 'react';
import classNames from 'classnames';
import { Banner } from '../banner';
import styles from './banner-fix.module.scss';

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
  bannerData: BannerDataType,
  isShowBannerFix: boolean,
};

const BannerFix: React.FC<Props> = React.memo(({ bannerData, isShowBannerFix }) => {
  const [isCloseTogglerShow, setCloseTogglerShow] = React.useState(true);
  const [isFixedBannerOpened, setFixedBannerOpenedFlag] = React.useState(true);
  const handleCloseToggleShow = React.useCallback((isShow) => {
    setCloseTogglerShow(isShow);
  }, [isCloseTogglerShow]);

  const handleCloseBannerClick = () => {
    setFixedBannerOpenedFlag(false);
  };

  return (
    isFixedBannerOpened && (
      <div
        className={classNames(styles.fix, {
          [styles.fixIsShow]: isShowBannerFix,
        })}
      >
        <div className={styles.fixWrap}>
          {isCloseTogglerShow && (
            <button
              type="button"
              className={styles.fixBtn}
              onClick={handleCloseBannerClick}
            >
              Закрыть
            </button>
          )}
          <Banner {...bannerData} onHandleCloseToggleShow={handleCloseToggleShow} />
        </div>
      </div>
    )
  );
});

export default BannerFix;
