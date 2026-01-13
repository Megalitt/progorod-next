import React from 'react';
import styles from './slider-prev-arrow.module.scss';

type Props = {
  onClick?: () => void,
};

const SliderPrevArrow: React.FC<Props> = ({ onClick }) => (
  <button
    type="button"
    className={styles.sliderPrevArrow}
    aria-label="стрелка слайдера назад"
    onClick={onClick}
  />
);

export default SliderPrevArrow;
