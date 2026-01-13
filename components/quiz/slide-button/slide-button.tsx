import React from 'react';
import styles from './slide-button.module.scss';

type Props = {
  id: number,
  quiz_item_id: number,
  correctly: number,
  label: string,
  onSlideButtonClick: (data: any) => void,
};

const SlideButton: React.FC<Props> = React.memo(({
  id,
  quiz_item_id,
  label,
  onSlideButtonClick,
}) => {
  const handleSlideButtonClick = () => onSlideButtonClick({ id, quiz_item_id });

  return (
    <button
      className={styles.slideButton}
      type="button"
      onClick={handleSlideButtonClick}
    >
      {label}
    </button>
  );
});

export default SlideButton;
