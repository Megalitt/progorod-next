import React from 'react';
import styles from './slider-next-arrow.module.scss';

type Props = {
  onClick?: () => void,
};

const SliderNextArrow: React.FC<Props> = ({ onClick }) => (
  <button
    type="button"
    className={styles.sliderNextArrow}
    aria-label="стрелка слайдера вперед"
    onClick={onClick}
  />
);

export default SliderNextArrow;
