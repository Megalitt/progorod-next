import React from 'react';
import classNames from 'classnames';
import { createMarkup } from '../../../utils/core/create-markup';
import styles from './alert.module.scss';

type Props = {
  message: string,
  messageType: string,
  onHandleClick: (a: string) => void;
};

const Alert: React.FC<Props> = React.memo(({ message, messageType, onHandleClick }) => {
  const handleClick = () => onHandleClick(message);

  return (
    <div
      className={classNames(styles.alrt, {
        [styles.alrtSuccess]: messageType === 'success',
        [styles.alrtInfo]: messageType === 'info',
        [styles.alrtError]: messageType === 'error',
      })}
    >
      <button
        className={styles.alrtBtn}
        area-label="Скрыть предупреждение"
        onClick={handleClick}
      />
      <div dangerouslySetInnerHTML={createMarkup(message)} />
    </div>
  );
});

export default Alert;
