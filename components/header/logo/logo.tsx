import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { getImagePath } from '../../../utils/core/get-image-path';

import styles from './logo.module.scss';

type Props = {
  logoMain: string
};

const Logo: React.FC<Props> = React.memo(({ logoMain }) => {
  const router = useRouter();
  const isIndexPage = router.asPath === '/';

  return (
    <div className={classNames(styles.lg, process.env.NEXT_PUBLIC_LOGO_CLASS)}>
      <style jsx>
        {`
          .logoPg23 {
            width: 110px;
          }

          .logo-irkutsk,
          .logo-irkutsk img {
            width: 180px;
          }

          .pensnewsHeader {
            width: 110px;
          }

          .logo-media41 {
            width: 105px;
          }

          @media screen and (max-width: 1024px) {
            .logoPg23 {
              width: 85px;
            }

            .logo-media41 {
              width: 70px;
            }
            .pensnewsHeader {
              width: 88px;
            }

            .logo-irkutsk,
            .logo-irkutsk img {
              width: 110px;
            }
          }
        `}
      </style>
      {
        !isIndexPage
          ? (
            <Link prefetch={false} href="/">
              <a>
                <img src={getImagePath({ image: `/${logoMain}` })} alt="Логотип новостного портала Прогород" width="146" loading="lazy" />
              </a>
            </Link>
          )
          : (
            <img src={getImagePath({ image: `/${logoMain}` })} alt="Логотип новостного портала Прогород" width="146" loading="lazy" />
          )
      }
    </div>
  );
});

export default Logo;
