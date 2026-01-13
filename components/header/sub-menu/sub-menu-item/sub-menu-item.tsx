import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { setLinkAttributes } from '../../../../utils/set-link-attributes';
import { domainsWhiteSelector } from '../../../../store/seo/seo-selectors';
import styles from '../sub-menu.module.scss';

type Props = {
  id: number,
  link: string,
  name: string,
  target_blank: number,
};

const SubMenuItem: React.FC<Props> = React.memo(({
  id,
  link,
  name,
  target_blank,
}) => {
  const domainsWhiteList = useSelector(domainsWhiteSelector);
  const { isDomainInWhiteList, isDomainInString } = setLinkAttributes(domainsWhiteList, link);
  let linkAttr = {};

  if (isDomainInString && isDomainInWhiteList) {
    linkAttr = { rel: 'noopener noreferrer nofollow', target: '_blank' };
  }

  if (isDomainInString && !isDomainInWhiteList) {
    linkAttr = { rel: 'noopener noreferrer', target: '_blank' };
  }

  if (!isDomainInString) {
    linkAttr = target_blank === 1 ? { target: '_blank' } : {};
  }
  return (
    <li key={`sub-${id}`}>
      <Link prefetch={false} href={link}>
        <a className={styles.sbmLk} {...linkAttr}>
          {name}
        </a>
      </Link>
    </li>
  );
});

export default SubMenuItem;
