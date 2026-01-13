import React, {
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { ContainerLayout } from '../../layouts/container-layout';
import { Metrics, FooterMenuTop, FooterMenuBottom } from './index';
import {
  infoSelector,
  yandexIdSelector,
} from '../../store/footer/footer-selectors';
import { socialSelector } from '../../store/social/social-selectors';
import { createMarkup } from '../../utils/core/create-markup';

import SocialList from '../social-list/social-list';
import styles from './footer.module.scss';

type Props = {};

declare global {
  interface Window {
    ym?: any;
  }
}

const Footer: React.FC<Props> = React.memo(() => {
  const router = useRouter();
  const yandexMetricaId = useSelector(yandexIdSelector);
  const socialLinks = useSelector(socialSelector);
  const settings = useSelector(infoSelector);
  const currentPath = router.asPath;

  useEffect(() => {
    // @ts-ignore
    if (typeof window.ym !== 'undefined' && yandexMetricaId) {
      window.ym(yandexMetricaId, 'hit', window.location.href);
    }
  }, [currentPath]);

  return (
    <footer className={styles.ftr} id="footer">
      <div className={styles.ftrTop}>
        <ContainerLayout>
          <div className={styles.ftrFlexRow}>
            <FooterMenuTop />
            <div className={styles.ftrSocialListWrp}>
              <div className={styles.ftrSocialListTitle}>Мы в социальных сетях</div>
              <SocialList
                socialLinks={socialLinks}
                className={styles.ftrSocialList}
              />
            </div>
          </div>
        </ContainerLayout>
      </div>
      <div className={styles.ftrBtm}>
        <ContainerLayout>
          <FooterMenuBottom />
          <div className={styles.ftrInfo}>
            <div className={styles.ftrInfoWrap}>
              <div dangerouslySetInnerHTML={createMarkup(settings.settingEditors.value)} />
              <div dangerouslySetInnerHTML={createMarkup(settings.settingCopyright.value)} />
              <div dangerouslySetInnerHTML={createMarkup(settings.settingCommenttext.value)} />
            </div>
          </div>
          {settings.settingCensor && 'value' && (
            <span
              className={styles.ftrCensor}
              dangerouslySetInnerHTML={createMarkup(settings.settingCensor.value)}
            />
          )}
          {settings.settingCounters && 'value' && (
            <Metrics
              counters={settings}
            />
          )}
        </ContainerLayout>
      </div>
    </footer>
  );
});

export default Footer;
