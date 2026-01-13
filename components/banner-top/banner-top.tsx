import React from 'react';
import classNames from 'classnames';
import { Banner } from '../banner';

import styles from './banner-top.module.scss';

type Props = {
  bannerData: any,
};

const BannerTop: React.FC<Props> = React.memo(({ bannerData }) => (
  <div
    className={classNames(styles.top, {
      [styles.topCHEBOKSARY]: process.env.NEXT_PUBLIC_FORK_NAME === 'CHEBOKSARY',
    })}
  >
    <div className={styles.topPushLinkIframe}>
      {bannerData && bannerData.length > 0 && <Banner {...bannerData[0]} className={styles.topLink} />}
    </div>
  </div>
));

export default BannerTop;
