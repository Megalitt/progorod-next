import React from 'react';
import classNames from 'classnames';
import { createMarkup } from '../../../../utils/core/create-markup';
import { getPostInnerDate } from '../../../../utils/time/get-post-inner-date';
import { getImagePath } from '../../../../utils/core/get-image-path';
import { PeoplecontrolLike } from '../index';
import SliderModal from '../../../slider-modal/slider-modal';

import withSliderLightbox from '../../../../hocs/with-slider-lightbox/with-slider-lightbox';

import styles from './peoplecontrol-wrap.module.scss';

type Props = {
  id: number,
  text: string,
  author_anon_name: string,
  date: number | string,
  videolink?: string,
  type?: string,
  likes: object,
  complaintImages: Array<any>,
  //Свойства слайдера
  isActiveSlideModal: boolean,
  currentSlide: number,
  isCloseAnimated: boolean,
  onHandleShowModalClick: (evt: any, index: number, lengthImages: number) => void,
  onHandleCloseModalClick: () => void,
  onHandleNextSlide: () => void,
  onHandlePrevSlide: () => void,
  onHandleTouchStart: () => void,
  onHandleTouchEnd: () => void,
};

const PeoplecontrolWrap: React.FC<Props> = ({
  id,
  text,
  author_anon_name,
  date,
  videolink = '',
  type = '',
  likes,
  complaintImages,
  currentSlide,
  isActiveSlideModal,
  isCloseAnimated,
  onHandleShowModalClick,
  onHandleCloseModalClick,
  onHandleNextSlide,
  onHandlePrevSlide,
  onHandleTouchStart,
  onHandleTouchEnd,
}) => {
  const images = complaintImages && complaintImages.length > 0 ? complaintImages : [];
  return (
    <>
      <div className={classNames(styles.complain, { [styles.complainAnswer]: type === 'answer' })}>
        <div className={styles.complainWrap}>
          <div className={styles.complainText} dangerouslySetInnerHTML={createMarkup(text)} />
          {videolink && videolink !== 'undefined' && videolink !== '' && (
          <div className={styles.complainImgWrap}>
            <img className={styles.complainImg} src={videolink} alt="Изображение к жалобе" />
          </div>
          )}
          {/**
           * Переделать в компонент
          */}
          {images && images.length > 0 && images.map(({ image }, index) => (
            <div
              className={styles.complainImgWrap}
              onClick={(evt) => onHandleShowModalClick(evt, index, images.length)}
              aria-label="Показать модальное окно с картинкой"
              aria-hidden="true"
            >
              <img className={styles.complainImg} src={getImagePath({ image: `/userfiles/peoplecontrol/complaint/${id}/${image}` })} alt="Изображение к жалобе" />
            </div>
          ))}
          {isActiveSlideModal && (
            <SliderModal
              currentImage={images && images.length > 0 && `/userfiles/peoplecontrol/complaint/${id}/${images[currentSlide].image}`}
              title="Картинка к жалобе"
              lengthImages={images && images.length}
              isCloseAnimated={isCloseAnimated}
              onHandleNextSlide={onHandleNextSlide}
              onHandlePrevSlide={onHandlePrevSlide}
              onHandleCloseModalClick={onHandleCloseModalClick}
              onHandleTouchStart={onHandleTouchStart}
              onHandleTouchEnd={onHandleTouchEnd}
            />
          )}
          <div className={styles.complainFooter}>
            <div className={styles.complainInfo}>
              <b className={styles.complainAuthor}>{author_anon_name && author_anon_name.length > 0 ? author_anon_name : 'Гость'}</b>
              {
                  typeof date === 'number'
                    ? <span className={styles.complainDate} dangerouslySetInnerHTML={createMarkup(getPostInnerDate(date))} />
                    : <span>{date}</span>
                }
            </div>
            <div className={styles.complainLikes}>
              <PeoplecontrolLike id={id} likes={likes} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withSliderLightbox(PeoplecontrolWrap);
