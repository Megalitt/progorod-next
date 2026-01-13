import React, { useEffect, useState } from 'react';
import useToggleVisibleAnimate from '../../hooks/use-close-animate';

const withSliderLightbox = (Component) => (props) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [countSlides, setCountSlides] = useState(10);
  const [coordXStart, setCoordXStart] = useState(null);

  const {
    isShowElement,
    isCloseAnimated,
    handleOpenClick,
    handleCloseClick,
  } = useToggleVisibleAnimate();

  const handleShowModalClick = (evt, index, lengthPhotos) => {
    if (evt.target.tagName !== 'BUTTON') {
      document.documentElement.classList.add('no-scroll');
      setCurrentSlide(index);
      setCountSlides(lengthPhotos);
      handleOpenClick();
    }
  };

  const handleCloseModalClick = (evt) => {
    if (evt.target.tagName !== 'IMG') {
      document.documentElement.classList.remove('no-scroll');
      handleCloseClick();
    }
  };

  const handleNextSlide = (evt) => {
    evt.stopPropagation();
    setCurrentSlide(+currentSlide === countSlides - 1 ? 0 : +currentSlide + 1);
  };

  const handlePrevSlide = (evt) => {
    evt.stopPropagation();
    setCurrentSlide(+currentSlide === 0 ? countSlides - 1 : +currentSlide - 1);
  };

  const handleKeyUpNext = (evt) => {
    if (evt.keyCode === 39) {
      setCurrentSlide((prev) => (+prev === countSlides - 1 ? 0 : +prev + 1));
    }
  };

  const handleKeyUpPrev = (evt) => {
    if (evt.keyCode === 37) {
      setCurrentSlide((prev) => (+prev === 0 ? countSlides - 1 : +prev - 1));
    }
  };

  const handleEscapeKeydown = (evt) => {
    if (evt.keyCode === 27) {
      document.documentElement.classList.remove('no-scroll');
      handleCloseClick();
    }
  };

  const handleTouchStart = (evt) => {
    setCoordXStart(evt.changedTouches[0].clientX);
  };

  const handleTouchEnd = (evt) => {
    const coordXEnd = evt.changedTouches[0].clientX;

    if (coordXStart !== null && coordXEnd !== null) {
      const absShift = Math.abs(coordXStart - coordXEnd);
      const isShift = absShift > 60;

      if (absShift > 0) {
        if (isShift && coordXStart > coordXEnd) {
          setCurrentSlide(+currentSlide === countSlides - 1 ? 0 : +currentSlide + 1);
        } else {
          setCurrentSlide(+currentSlide === 0 ? countSlides - 1 : +currentSlide - 1);
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyUpNext, false);
    document.addEventListener('keydown', handleKeyUpPrev, false);
    document.addEventListener('keydown', handleEscapeKeydown, false);

    return () => {
      document.removeEventListener('keydown', handleKeyUpNext, false);
      document.removeEventListener('keydown', handleKeyUpPrev, false);
      document.removeEventListener('keydown', handleEscapeKeydown, false);
    };
  }, [countSlides, currentSlide]);

  return (
    <Component
      {...props}
      isActiveSlideModal={isShowElement}
      currentSlide={+currentSlide}
      isCloseAnimated={isCloseAnimated}
      onHandleShowModalClick={handleShowModalClick}
      onHandleNextSlide={handleNextSlide}
      onHandlePrevSlide={handlePrevSlide}
      onHandleCloseModalClick={handleCloseModalClick}
      onHandleTouchStart={handleTouchStart}
      onHandleTouchEnd={handleTouchEnd}
    />
  );
};

export default withSliderLightbox;
