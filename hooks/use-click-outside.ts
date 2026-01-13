import { useEffect, useRef } from 'react';

const useClickOutside = (handleClick) => {
  const domNode = useRef(null);

  useEffect(() => {
    const handlerOutsideClick = (evt) => {
      if (domNode.current && !domNode.current.contains(evt.target)) {
        handleClick();
      }
    };

    document.addEventListener('mousedown', handlerOutsideClick);
    return () => document.removeEventListener('mousedown', handlerOutsideClick);
  }, []);

  return domNode;
};

export default useClickOutside;
