import dynamic from 'next/dynamic';
import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { getPostInnerDate } from '../../../../utils/time/get-post-inner-date';
import { createMarkup } from '../../../../utils/core/create-markup';
import { getImagePath } from '../../../../utils/core/get-image-path';
import { PeoplecontrolLike } from '../index';
import withSliderLightbox from '../../../../hocs/with-slider-lightbox/with-slider-lightbox';
import styles from './peoplecontrol-card.module.scss';

const SliderModal = dynamic(
  () => import('../../../slider-modal/slider-modal'),
  { ssr: false },
);

type Props = {
  id: number,
  text: string,
  date: number,
  likes: object,
  answers: Array<any>,
  complaintImages: Array<any>,
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

const PeoplecontrolCard: React.FC<Props> = React.memo(({
  id,
  text,
  date,
  answers,
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
      <div
        className={classNames(styles.complaint, {
          [styles.complaintIsAnswer]: answers && answers.length > 0,
        })}
      >
        <Link prefetch={false} href={`/peoplecontrol/${id}`}>
          {/* eslint-disable jsx-a11y/anchor-is-valid */ }
          {/* eslint-disable jsx-a11y/anchor-has-content */ }
          <a className={styles.complaintLink} />
        </Link>
        <div
          className={styles.complaintText}
          dangerouslySetInnerHTML={createMarkup(text)}
        />
        {images && images.length > 0 && images.map(({ image }, index) => (
          <div
            className={styles.complaintImgWrap}
            onClick={(evt) => onHandleShowModalClick(evt, index, images.length)}
            aria-label="Показать модальное окно с картинкой"
            aria-hidden="true"
          >
            <img src={getImagePath({ image: `/userfiles/peoplecontrol/complaint/${id}/${image}` })} alt="Изображение к жалобе" />
          </div>
        ))}
        {isActiveSlideModal && (
          <SliderModal
            currentImage={images && images.length > 0 && `/userfiles/peoplecontrol/complaint/${id}/${images[currentSlide].image}`}
            title="Картинка к жалобе"
            isCloseAnimated={isCloseAnimated}
            lengthImages={images && images.length}
            onHandleNextSlide={onHandleNextSlide}
            onHandlePrevSlide={onHandlePrevSlide}
            onHandleCloseModalClick={onHandleCloseModalClick}
            onHandleTouchStart={onHandleTouchStart}
            onHandleTouchEnd={onHandleTouchEnd}
          />
        )}
        <div className={styles.complaintFooter}>
          <span
            className={styles.complaintDate}
            dangerouslySetInnerHTML={createMarkup(getPostInnerDate(date))}
          />
          <img className={styles.complaintCommentsIcon} src="/img/icon-comment.svg" alt="Иконка комментария" />
          <span>0</span>
          <div className={styles.complaintFooterRight}>
            {answers && answers.length > 0 && (
            <Link prefetch={false} href={`/peoplecontrol/${id}`}>
              <a className={styles.complaintBtnAnswer}>Ответ специалиста</a>
            </Link>
            )}
            <PeoplecontrolLike id={id} likes={likes} />
          </div>
        </div>
      </div>
    </>
  );
});

export default withSliderLightbox(PeoplecontrolCard);
