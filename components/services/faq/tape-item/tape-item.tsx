import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { getImagePath } from '../../../../utils/core/get-image-path';
import styles from './tape-item.module.scss';

type Props = {
  type: string,
  id: number,
  photo?: string,
  position?: string,
  username?: string,
  name?: string,
  mainImage?: any,
};

const TapeItem: React.FC<Props> = ({
  type,
  photo,
  position,
  id,
  username,
  name,
  mainImage,
}) => {
  if (type === 'expert') {
    return (
      <li>
        <Link prefetch={false} href={`/faq/expert/${id}`}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={styles.tapeLink} title={`Эксперт ${username}`}>
            <div
              className={classNames(styles.tapeWrap, {
                [styles.tapeWrapNoPhoto]: !photo,
              })}
            >
              {photo && (
                <picture>
                  <source type="image/webp" srcSet={photo && getImagePath({ image: photo, isWebp: 'webp' })} />
                  <img src={getImagePath({ image: photo })} alt={`Эксперт ${username}`} className={styles.tapeImg} />
                </picture>
              )}
              <div className={styles.tapeInfo}>
                <span className={styles.tapeSignature}>{position}</span>
              </div>
            </div>
          </a>
        </Link>
      </li>
    );
  }
  return (
    <li>
      <Link prefetch={false} href={`/faq/topic/${id}`}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={styles.tapeLink} title={name}>
          <div
            className={classNames(styles.tapeWrap, {
              [styles.tapeWrapNoPhoto]: !mainImage || mainImage.length === 0,
            })}
          >
            { mainImage && mainImage.length > 0 && <img src={getImagePath({ image: mainImage[0]?.image })} alt={`Тема ${name}`} className={styles.tapeImg} />}
            <div className={styles.tapeInfo}>
              <span className={styles.tapeSignature}>{name}</span>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default TapeItem;
