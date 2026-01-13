import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Alert from './alert/alert';
import { delAlert } from '../../store/alert/alert-slice';

import styles from './alerts.module.scss';

type Props = {
  alerts: Array<string>,
};

const Alerts: React.FC<Props> = React.memo(({ alerts }) => {
  const dispatch = useDispatch();
  const handleCloseClick = (item) => {
    dispatch(delAlert(item));
  };

  useEffect(() => {
    if (alerts.length > 0) {
      alerts.forEach((item) => setTimeout(() => dispatch(delAlert(item)), 5000));
    }
  }, [alerts]);
  return (
    <div className={styles.alerts}>
      {
        alerts.map((item: any) => (
          <Alert
            key={`alert-${item.message}`}
            {...item}
            onHandleClick={handleCloseClick}
          />
        ))
      }
    </div>
  );
});

export default Alerts;
