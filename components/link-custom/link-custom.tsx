import React from 'react';
import Link from 'next/link';
import { setClassesToStyleObj } from '../../utils/core/set-classes-to-style-obj';

import styles from './link-custom.module.scss';

type Props = {
  className: string,
  href: string,
  onClick?: (evt?: React.ReactNode) => void,
};

const LinkCustom: React.FC<Props> = React.memo((props) => {
  const { className, href } = props;
  const classes: string = setClassesToStyleObj(styles, className);

  return (
    <>
      <style jsx>
        {`
          .pensnewsHeader.${styles.lkg} {
            background: #ffffff;
          }
        `}
      </style>
      <Link prefetch={false} href={href} {...props}>
        <a {...props} className={`${classes} ${process.env.NEXT_PUBLIC_LOGO_CLASS}`} />
      </Link>
    </>
  );
});

export default LinkCustom;
