import React from 'react';
import { Banner } from '../../components/banner';
import { RowsLayout } from '../rows-layout';
import styles from './service-lenta-layout.module.scss';

type Props = {
  bannerInServices?: any,
};

const ServiceLentaLayout: React.FC<Props> = React.memo(({ children, bannerInServices }) => (
  <div className={styles.ServiceLentaLayout}>
    <div>
      <div className={styles.ServiceLentaLayoutRow}>
        { children[0].length > 0 && children[0]}
        {bannerInServices && bannerInServices.length > 0 && children[0] && children[0].length === 4 && (
        <RowsLayout>
          <Banner {...bannerInServices[0]} />
        </RowsLayout>
        )}
      </div>
      <div className={styles.ServiceLentaLayoutRow}>
        { children[1].length > 1 && children[1]}
        {bannerInServices && bannerInServices.length > 0 && children[1] && children[1].length === 4 && (
        <RowsLayout>
          <Banner {...bannerInServices[1]} />
        </RowsLayout>
        )}
      </div>
      <div className={styles.ServiceLentaLayoutRow}>
        { children[2].length > 2 && children[2]}
        {bannerInServices && bannerInServices.length > 0 && children[2] && children[2].length === 4 && (
        <RowsLayout>
          <Banner {...bannerInServices[2]} />
        </RowsLayout>
        )}
      </div>
    </div>
    {children[3]}
  </div>
));

export default ServiceLentaLayout;
