import React from 'react';
import classNames from 'classnames';
import { Nav } from '../nav';
import { NavType } from '../types';
import { LinkCustom } from '../../link-custom';
import SearchMobile from '../../search/search-mobile/search-mobile';
import SocialList from '../../social-list/social-list';

import styles from './adaptive-nav.module.scss';

type Props = {
  nav: Array<NavType>,
  socialLinks: object,
  currentPath: string,
  isCloseAnimated: boolean,
  settingSuggestNews: string | number,
  isNavCities: boolean,
  onCloseAdaptiveNavClick: () => void,
};

const AdaptiveNav: React.FC<Props> = React.memo(({
  nav,
  socialLinks,
  currentPath,
  isCloseAnimated,
  settingSuggestNews,
  isNavCities,
  onCloseAdaptiveNavClick,
}) => (
  <>
    <div
      className={classNames(styles.adpNvWrp, {
        [styles.adpNvWrpCloseAnimate]: isCloseAnimated,
      })}
      aria-label="Закрыть меню"
      onClick={onCloseAdaptiveNavClick}
      aria-hidden="true"
    />
    <div className={classNames(styles.adpNv, {
      [styles.adpNvCloseAnimate]: isCloseAnimated,
    })}
    >
      <div className={styles.adpNvInner}>
        <Nav
          nav={nav}
          currentPath={currentPath}
          extraClass="nvAdaptive"
          isNavCities={isNavCities}
        />
        <div className={styles.adpNvFooter}>
          {+settingSuggestNews === 1 && (
            <LinkCustom
              href="/offer-news"
              className={classNames('lkg', 'lkgOfferBtn', { active: currentPath === '/offer-news' })}
            >
              Прислать новость
            </LinkCustom>
          )}
          <SearchMobile />
          <SocialList socialLinks={socialLinks} />
          <a className={styles.adpNvFullSiteVersion} href="/" aria-label="Полная версия сайта">Полная версия сайта</a>
        </div>
      </div>
    </div>
  </>
));

export default AdaptiveNav;
