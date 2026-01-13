import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import TabBarNav from './tab-bar-nav/tab-bar-nav';
import { getItemInLocalStorage } from '../../utils/local-storage/get-item-in-local-storage';
import styles from './tab-bar.module.scss';

type Props = {
  children: JSX.Element[] | JSX.Element,
  activeTabDefault?: number | string,
};

const TabBar: React.FC<Props> = React.memo(({ children, activeTabDefault = 0 }) => {
  const refContainer = React.useRef(null);

  const [activeTab, setActiveTab] = useState(null);
  const [activeTabIndex, setActiveTabIndex] = useState(activeTabDefault);

  const [isScrollToFooter, setScrollToFooter] = useState(false);
  const [isMobileScreen, setMobileScreen] = useState(false);

  const getChildrenLabels = (items) => items.map(({ props }) => (props ? props.label : null));

  const handleActiveTabClick = (currentTab: string, tabIndex: number) => {
    if (currentTab !== activeTab) setActiveTab(currentTab);
    setActiveTabIndex(tabIndex);
    setScrollToFooter(false);
  };

  const handleScroll = React.useCallback(() => {
    if (refContainer.current) {
      const refChildren = refContainer.current.children[1].children[activeTabIndex].children[0];
      const firstItemPositionBottom = refChildren && refChildren.getBoundingClientRect().bottom;

      if (firstItemPositionBottom - 60 < 0) {
        setScrollToFooter(true);
      }

      if (firstItemPositionBottom - 60 > 20) {
        setScrollToFooter(false);
      }
    }
  }, [activeTabIndex]);

  const handleUpdatePageResize = React.useCallback(() => {
    const screenWidth = +getItemInLocalStorage('screenWidth');
    screenWidth && screenWidth < 767 ? setMobileScreen(true) : setMobileScreen(false);
  }, []);

  useEffect(() => {
    const currentTab = getChildrenLabels(children)[+activeTabDefault];
    setActiveTab(currentTab);

    handleUpdatePageResize();
    window.addEventListener('resize', handleUpdatePageResize);

    return () => {
      window.removeEventListener('resize', handleUpdatePageResize);
    };
  }, []);

  useEffect(() => {
    if (isMobileScreen) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileScreen, activeTab]);

  const renderTabs = () => getChildrenLabels(children).map((navLabel, tabIndex) => (
    navLabel && (
      <TabBarNav
        key={navLabel}
        navLabel={navLabel}
        tabIndex={tabIndex}
        className={activeTab === navLabel ? 'active' : null}
        onChangeActiveTab={handleActiveTabClick}
      />
    )
  ));

  return (
    <>
      <div className={styles.tabBar} ref={refContainer}>
        <div className={styles.tabBarNavContainer}>
          <div className={styles.tabBarNav}>
            {renderTabs()}
          </div>
        </div>
        <div className={styles.tabBarContainer}>
          {
            React.Children.map(children, (item) => (
              item && React.cloneElement(item as React.ReactElement<any>, { activeTab })
            ))
          }
        </div>
      </div>
      {isScrollToFooter && (
        <Link prefetch={false} href="/news">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={styles.tabBarMoreNewsLink}>Ещё новости</a>
        </Link>
      )}
    </>
  );
});

export default TabBar;
