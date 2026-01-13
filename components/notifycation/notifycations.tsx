import React, { useEffect, useState } from 'react';
import useToggleVisibleAnimate from '../../hooks/use-close-animate';
import { Notifycation } from './index';
import { setCookie } from '../../utils/cookie/set-cookie';
import { getCookie } from '../../utils/cookie/get-cookie';

type Props = {
  cookiesNotification: string;
};

const Notifycations: React.FC<Props> = React.memo(({ cookiesNotification }) => {
  const [cook, useCook] = useState(false);

  const {
    isCloseAnimated,
    timeoutAnimate,
    handleOpenClick,
    handleCloseClick,
  } = useToggleVisibleAnimate({
    timeoutAnimate: 400,
  });

  useEffect(() => {
    handleOpenClick();
    if (getCookie('notify')) {
      useCook(true);
    }
  }, []);

  const handleCookCloseClick = () => {
    handleCloseClick();
    setCookie('notify', true, { 'max-age': '10000000' });
    setTimeout(() => {
      useCook(true);
    }, timeoutAnimate);
  };

  return (
    cook ? null : (
      <Notifycation
        onHandleClick={handleCookCloseClick}
        isCloseAnimated={isCloseAnimated}
        cookiesNotification={cookiesNotification}
      />
    )
  );
});

export default Notifycations;
