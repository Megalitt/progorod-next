import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { settingHideMetricSelector } from '../../../store/settings/settings-selectors';
import styles from './metrics.module.scss';

type Props = {
  counters: any,
};

const Metrics: React.FC<Props> = React.memo(({
  counters,
}) => {
  const { settingCountersInformers } = counters;
  const settingHideMetric = useSelector(settingHideMetricSelector);
  return (
    <>
      <div className={`${styles.metrics}`}>
        {+settingHideMetric === 0 && (
          <div
            className={classNames(styles.metricsContainer)}
            dangerouslySetInnerHTML={{ __html: settingCountersInformers.value }}
          />
        )}
      </div>
    </>
  );
});

export default Metrics;
