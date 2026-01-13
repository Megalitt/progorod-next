import React from 'react';
import { createMarkup } from '../../../utils/core/create-markup';
import { Button } from '../../button';
import styles from './notifycation.module.scss';

type Props = {
  onHandleClick: () => void;
  isCloseAnimated: boolean;
  cookiesNotification: string;
};

const Notifycation: React.FC<Props> = React.memo(({
  onHandleClick,
  isCloseAnimated,
  cookiesNotification,
}) => (
  <div className={!isCloseAnimated ? styles.notifycation : `${styles.notifycation} ${styles.notifycationActive}`}>
    <div className={styles.notifycationWrap}>
      <div className={styles.notifycationInfoText}>
        {typeof cookiesNotification === 'string' && <span className={styles.notifycationText} dangerouslySetInnerHTML={createMarkup(cookiesNotification)} />}
      </div>
      <Button
        className={styles.notifycationBtn}
        onClick={onHandleClick}
        type="button"
      >
        Принять
      </Button>
    </div>
  </div>
));
export default Notifycation;
