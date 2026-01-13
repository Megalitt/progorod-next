import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import { useRouter, Router } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { ContainerLayout } from '../../layouts/container-layout';
import { LinkCustom } from '../link-custom';
import { Logo, SubMenu, ModalMenu } from './index';
import { Login } from './login';
import { Nav } from './nav';
import { Modal } from '../modal';
import { Burger } from './burger';
import { setLoginShowModal, setShowModalType, setLoginCloseModalAnimated } from '../../store/login/login-slice';
import useClickOutside from '../../hooks/use-click-outside';
import { navSelector, modalNavCitiesSelector } from '../../store/header/header-selectors';
import { loginStatus, loginShowModal } from '../../store/login/login-selectors';
import { socialSelector } from '../../store/social/social-selectors';
import {
  logoMainSelector,
  settingSuggestNewsSelector,
  settingTitleButtonMenuSelector,
} from '../../store/settings/settings-selectors';

import styles from './header.module.scss';

let SearchLive = null;
let AdaptiveNav = null;

type Props = {};

const Header: React.FC<Props> = React.memo(() => {
  const router = useRouter();
  const currentPath = router.asPath;
  const dispatch = useDispatch();

  const nav = useSelector(navSelector);
  const navCities = useSelector(modalNavCitiesSelector);
  const socialLinks = useSelector(socialSelector);
  const logoMain = useSelector(logoMainSelector);
  const settingSuggestNews = useSelector(settingSuggestNewsSelector);
  const settingTitleButton = useSelector(settingTitleButtonMenuSelector);
  const isLoginStatus = useSelector(loginStatus);
  const isLoginShowModal = useSelector(loginShowModal);
  const [isAdaptiveNavOpened, setAdaptiveNavOpenedFlag] = useState(false);
  const [isCloseAnimated, changeCloseAnimatedFlag] = useState(false);
  const [isShowSearch, changeShowSearch] = useState(false);
  const [isCloseSearchAnimated, changeCloseSearchAnimated] = useState(true);
  const [isShowModalCities, changeShowModalCities] = useState(false);
  const [isCloseModalCitiesAnimated, changeCloseModalAnimated] = useState(true);

  const isNavCities = Array.isArray(navCities) && navCities.length > 0 ? true : false;

  const handleOpenAdaptiveNavClick = useCallback(() => {
    AdaptiveNav = dynamic(
      () => import('./adaptive-nav').then((mod) => mod.AdaptiveNav),
      {
        loading: () => null,
        ssr: false,
      },
    );
    setAdaptiveNavOpenedFlag(true);
    const htmlNode = document.documentElement;
    htmlNode.classList.add('no-scroll');
  }, []);

  const handleCloseAdaptiveNavClick = useCallback(() => {
    changeCloseAnimatedFlag((prev) => !prev);
    setTimeout(() => {
      const htmlNode = document.documentElement;
      htmlNode.removeAttribute('style');
      htmlNode.classList.remove('no-scroll');
      setAdaptiveNavOpenedFlag(false);
      changeCloseAnimatedFlag((prev) => !prev);
    }, 200);
  }, []);

  const onAdaptiveNavTouch = (evt) => {
    const coordXStart = evt.changedTouches[0].clientX;

    const onTouchEnd = (evtEnd) => {
      const coordXEnd = evtEnd.changedTouches[0].clientX;
      const absShift = Math.abs(coordXStart - coordXEnd);
      const isShift = absShift > 60;

      if (isShift && coordXStart > coordXEnd && isAdaptiveNavOpened) {
        handleCloseAdaptiveNavClick();
      } else if (
        coordXStart < 24
        && isShift
        && coordXStart < coordXEnd
        && !isAdaptiveNavOpened
      ) {
        handleOpenAdaptiveNavClick();
      }

      document.removeEventListener('touchend', onTouchEnd);
    };

    document.addEventListener('touchend', onTouchEnd, { passive: true });
  };

  const handleOpenSearch = useCallback(() => {
    SearchLive = dynamic(
      // @ts-ignore
      () => import('../search/search-live').then((mod) => mod.SearchLive),
      {
        loading: () => <p>...</p>,
        ssr: false,
      },
    );
    document.documentElement.classList.add('no-scroll');
    changeShowSearch((prev) => !prev);
    changeCloseSearchAnimated((prev) => !prev);
  }, []);

  const handleCloseSearch = useCallback(() => {
    document.documentElement.classList.remove('no-scroll');
    changeCloseSearchAnimated((prev) => !prev);
    setTimeout(() => {
      changeShowSearch((prev) => !prev);
    }, 400);
  }, []);

  const handleToggleSearch = useCallback(() => {
    if (!isShowSearch) {
      handleOpenSearch();
    } else {
      handleCloseSearch();
    }
  }, []);

  const handleOpenLoginModal = useCallback(() => {
    document.documentElement.classList.add('no-scroll');
    dispatch(setLoginShowModal(true));
    dispatch(setShowModalType('auth'));
    dispatch(setLoginCloseModalAnimated(false));
  }, []);

  const handleCloseLoginModal = useCallback(() => {
    document.documentElement.classList.remove('no-scroll');
    dispatch(setLoginCloseModalAnimated(true));
    setTimeout(() => {
      dispatch(setLoginShowModal(false));
    }, 400);
  }, []);

  const handleOpenModalCities = useCallback(() => {
    document.documentElement.classList.add('no-scroll');
    changeShowModalCities((prev) => !prev);
    changeCloseModalAnimated((prev) => !prev);
  }, []);

  const handleCloseModalCities = useCallback(() => {
    document.documentElement.classList.remove('no-scroll');
    changeCloseModalAnimated((prev) => !prev);
    setTimeout(() => {
      changeShowModalCities((prev) => !prev);
    }, 400);
  }, []);

  const refModalCitiesOutsideElement = useClickOutside(() => {
    handleCloseModalCities();
  });

  useEffect(() => {
    const handleRouteChange = () => {
      changeCloseSearchAnimated(true);
      setAdaptiveNavOpenedFlag(false);
      setTimeout(() => {
        changeShowSearch(false);
      }, 400);
      document.documentElement.classList.remove('no-scroll');
    };
    Router.events.on('routeChangeStart', handleRouteChange);
    document.addEventListener('touchstart', onAdaptiveNavTouch, { passive: true });
    //
    return () => {
      Router.events.off('routeChangeStart', handleRouteChange);
      document.removeEventListener('touchstart', onAdaptiveNavTouch);
    };
  }, [isAdaptiveNavOpened]);
  return (
    <>
      <style jsx>
        {`
          .pensnewsHeader .${styles.hdrWrp}  {
            background-color: #ffcc01;
          }

          @media screen and (max-width: 1024px) {
            .${styles.hdr}.pensnewsHeader {
              border-bottom: none;
            }
          }

          @media screen and (max-width: 640px) {
            .${styles.hdr}.pensnewsHeader {
              border-left: none;
              border-right: none;
            }
          }
        `}
      </style>
      <header className={`${styles.hdr} ${process.env.NEXT_PUBLIC_LOGO_CLASS}`}>
        <ContainerLayout>
          <div className={styles.hdrWrp}>
            <Burger
              onBurgerClick={handleOpenAdaptiveNavClick}
              isBurgerShow={isNavCities}
            />
            <Logo logoMain={logoMain} />
            <div
              className={classNames(styles.hdrDesktopNav, {
                [styles.hdrDesktopNavHide]: isNavCities,
              })}
            >
              <Nav nav={nav} currentPath={currentPath} isNavCities={isNavCities} />
            </div>
            <div className={styles.hdrBtnRight}>
              {isNavCities && (
                <button
                  className={styles.hdrBtnCitiesMenu}
                  type="button"
                  aria-label="Открыть меню"
                  onClick={handleOpenModalCities}
                >
                  {settingTitleButton}
                </button>
              )}
              {+settingSuggestNews === 1 && (
                <LinkCustom
                  href="/offer-news"
                  className={classNames('lkg', 'lkgHdr', { active: currentPath === '/offer-news' })}
                >
                  Прислать новость
                </LinkCustom>
              )}
              <button
                className={
                  classNames(
                    styles.hdrBtnIcon,
                    styles.hdrBtnIconSrch,
                    {
                      [styles.hdrSrchBtnActive]: !isCloseSearchAnimated,
                    },
                  )
                }
                type="button"
                aria-label="Открыть поиск"
                onClick={handleToggleSearch}
              />
              {isLoginStatus ? (
                <LinkCustom
                  href="/profile"
                  className={classNames('btnIcon', 'btnIconPrfl', { active: currentPath === '/profile' })}
                  aria-label="Войти на сайт"
                />
              ) : (
                <button
                  type="button"
                  className={classNames(styles.hdrBtnIcon, styles.hdrBtnIconPrfl)}
                  aria-label="Войти на сайт"
                  onClick={handleOpenLoginModal}
                />
              )}
            </div>
          </div>
        </ContainerLayout>
      </header>
      <SubMenu isShowSearch={isShowSearch} />
      <ContainerLayout>
        {isShowSearch && (
          <SearchLive
            onCloseSearch={handleCloseSearch}
            isCloseSearchAnimated={isCloseSearchAnimated}
            isLiveHeader
          />
        )}
      </ContainerLayout>
      {isAdaptiveNavOpened && (
        <AdaptiveNav
          nav={nav}
          socialLinks={socialLinks}
          currentPath={currentPath}
          isCloseAnimated={isCloseAnimated}
          onCloseAdaptiveNavClick={handleCloseAdaptiveNavClick}
          settingSuggestNews={settingSuggestNews}
          isNavCities={isNavCities}
        />
      )}
      {isLoginShowModal === true && (
        <Login
          onCloseLoginClick={handleCloseLoginModal}
        />
      )}

      {isShowModalCities && (
        <Modal
          onHandleCloseModalCities={handleCloseModalCities}
          isCloseModalCitiesAnimated={isCloseModalCitiesAnimated}
          refModalCitiesOutsideElement={refModalCitiesOutsideElement}
        >
          <ModalMenu navCities={navCities} />
        </Modal>
      )}
    </>
  );
});

export default Header;
