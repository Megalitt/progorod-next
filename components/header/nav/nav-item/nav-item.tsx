import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import styles from '../nav.module.scss';

type Props = {
  id: number,
  link: string,
  name: string,
  currentPath: string,
  target_blank: number,
};

const NavItem: React.FC<Props> = React.memo(({
  id,
  link,
  name,
  currentPath,
  target_blank,
}) => {
  const isTemplateRegEx = /(api|rss|bs|specials|assets|announcement|allboard|allboards|ads|page97|razvlekis)|.+\.(ico|png|jpe?g|gif|svg|ttf|mp4|mov|swf|pdf|zip|rar|txt|xml|html)$/;

  return (
    <li key={id}>
      <Link prefetch={false} href={link}>
        <a
          className={classNames(styles.nvLk, {
            [styles.active]: (currentPath === link)
            || (link === '/articles' && currentPath === '/news'),
          })}
          {...((isTemplateRegEx.test(link) || target_blank === 1) && { target: '_blank' })}
        >
          {name}
        </a>
      </Link>
    </li>
  );
});

export default NavItem;
