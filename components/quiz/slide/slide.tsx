import React from 'react';
import { SlideButton } from '../index';
import styles from './slide.module.scss';

type Props = {
  text: string,
  options: any,
  onSlideButtonClick: (data: any) => void,
};

const Slide: React.FC<Props> = React.memo(({
  onSlideButtonClick,
  text,
  options,
}) => (
  <div className={styles.slide}>
    {/*Возможно потом они захотят тесты с катинками*/}
    {/*<div className={styles.slideImageWrap}>*/}
    {/*  <img*/}
    {/*    className={styles.slideImage}*/}
    {/*    src={''} //image*/}
    {/*    alt="Изображение к вопросу"*/}
    {/*    loading="lazy"*/}
    {/*  />*/}
    {/*</div>*/}
    <b className={styles.slideQuestion}>{text}</b>
    <div className="slideOptions">
      {
        Array.isArray(options) && options.map((item) => (
          <SlideButton
            key={`${item.correctly}-${item.label}`}
            {...item}
            onSlideButtonClick={onSlideButtonClick}
          />
        ))
      }
    </div>
  </div>
));

export default Slide;
