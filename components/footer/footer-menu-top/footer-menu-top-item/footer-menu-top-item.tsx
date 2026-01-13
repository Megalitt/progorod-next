import React from 'react';
import { useSelector } from 'react-redux';
import { domainsWhiteSelector } from '../../../../store/seo/seo-selectors';
import { setLinkAttributes } from '../../../../utils/set-link-attributes';
import styles from './footer-menu-top-item.module.scss';

type Props = {
  id: number,
  link: string,
  name: string,
  target_blank: number,
};

const FooterMenuTopItem: React.FC<Props> = React.memo(({
  id,
  link,
  name,
  target_blank,
}) => {
  const domainsWhiteList = useSelector(domainsWhiteSelector);
  const { isDomainInWhiteList, isDomainInString } = setLinkAttributes(domainsWhiteList, link);
  let linkAttr = {};

  if (isDomainInString && isDomainInWhiteList) {
    linkAttr = { rel: 'noreferrer nofollow', target: '_blank' };
  }

  if (isDomainInString && !isDomainInWhiteList) {
    linkAttr = { rel: 'noreferrer', target: '_blank' };
  }

  if (!isDomainInString) {
    linkAttr = target_blank === 1 ? { target: '_blank' } : {};
  }

  return (
    <li className={styles.ftrTopLstItem} key={`city-${id}`}>
      <a
        className={styles.ftrTopLstItemLnk}
        href={link}
        {...linkAttr}
      >
        {name}
      </a>
    </li>
  );
});

export default FooterMenuTopItem;
