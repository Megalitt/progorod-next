import React from 'react';
import Link from 'next/link';
import styles from '../modal-menu.module.scss';

type Props = {
  id: number,
  link: string,
  name: string,
  target_blank: number,
};

const ModalMenuItem: React.FC<Props> = React.memo(({
  id,
  link,
  name,
  target_blank,
}) => {
  const isTemplateRegEx = /(api|rss|bs|specials|assets|announcement|allboard|allboards|ads|page97|razvlekis)|.+\.(ico|png|jpe?g|gif|svg|ttf|mp4|mov|swf|pdf|zip|rar|txt|xml|html)$/;

  return (
    <li className={styles.modalMenuItem} key={id}>
      <Link prefetch={false} href={link}>
        <a
          className={styles.modalMenuLink}
          {...((isTemplateRegEx.test(link) || target_blank === 1) && { target: '_blank' })}
        >
          {name}
        </a>
      </Link>
    </li>
  );
});

export default ModalMenuItem;
