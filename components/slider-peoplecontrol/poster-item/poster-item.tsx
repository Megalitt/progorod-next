import React from 'react';
import Link from 'next/link';
import styles from './poster-item.module.scss';

type Props = {
  text: string,
  id: number,
};

const PosterItem: React.FC<Props> = React.memo(({ text, id }) => (
  <div className={styles.poster}>
    <Link prefetch={false} href={`/peoplecontrol/${id}`}>
      <a className={styles.posterContentLink} title={text}>
        <div className={styles.posterContent}>
          <p className={styles.posterText}>{ text }</p>
        </div>
      </a>
    </Link>
  </div>
));

export default PosterItem;
