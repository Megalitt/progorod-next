import React from 'react';
import dynamic from 'next/dynamic';
import { getImagePath } from '../../../utils/core/get-image-path';
import withSliderLightbox from '../../../hocs/with-slider-lightbox/with-slider-lightbox';
import styles from './article-gallery.module.scss';

const SliderModal = dynamic(
  () => import('../../slider-modal/slider-modal'),
  { ssr: false },
);

type Props = {
  gallery: any,
  picsquare: string,
  index: number,
  currentSlide: number,
  isActiveSlideModal: boolean,
  isCloseAnimated: boolean,
  onHandleShowModalClick: (evt: any, index: number, lengthPhotos: number) => void,
  onHandleCloseModalClick: () => void,
  onHandleNextSlide: () => void,
  onHandlePrevSlide: () => void,
  onHandleTouchStart: () => void,
  onHandleTouchEnd: () => void,
};

const ArticleGallery: React.FC<Props> = React.memo(({
  gallery,
  picsquare,
  index,
  currentSlide,
  isActiveSlideModal,
  isCloseAnimated,
  onHandleShowModalClick,
  onHandleCloseModalClick,
  onHandleNextSlide,
  onHandlePrevSlide,
  onHandleTouchStart,
  onHandleTouchEnd,
}) => (
  <>
    <div className={styles.articleGalleryItem} onClick={(evt) => onHandleShowModalClick(evt, index, gallery.length)}>
      <img src={getImagePath({ image: picsquare })} alt="" />
    </div>
    {isActiveSlideModal && (
    <SliderModal
      currentImage={gallery[currentSlide].picoriginal}
      isCloseAnimated={isCloseAnimated}
      onHandleTouchStart={onHandleTouchStart}
      onHandleTouchEnd={onHandleTouchEnd}
      onHandleNextSlide={onHandleNextSlide}
      onHandlePrevSlide={onHandlePrevSlide}
      onHandleCloseModalClick={onHandleCloseModalClick}
      lengthImages={gallery.length}
    />
    )}
  </>
));

export default withSliderLightbox(ArticleGallery);
