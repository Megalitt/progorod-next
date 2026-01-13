import { useState } from 'react';

interface VisibleAnimateProps {
  timeoutAnimate?: number,
}

const useToggleVisibleAnimate = ({ timeoutAnimate = 400 }:VisibleAnimateProps = {}) => {
  const [isShowElement, setShowElement] = useState(false);
  const [isCloseAnimated, setCloseAnimated] = useState(true);

  const handleOpenClick = () => {
    setShowElement(true);
    setCloseAnimated(false);
  };

  const handleCloseClick = () => {
    setCloseAnimated(true);
    setTimeout(() => {
      setShowElement(false);
    }, timeoutAnimate);
  };

  return {
    isCloseAnimated,
    isShowElement,
    timeoutAnimate,
    handleOpenClick,
    handleCloseClick,
  };
};

export default useToggleVisibleAnimate;
