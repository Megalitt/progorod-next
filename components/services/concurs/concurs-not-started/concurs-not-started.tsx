import React from 'react';
import { ConcursPhotoEnd } from '../index';

import styles from './concurs-not-started.module.scss';

type Props = {
  voters: any,
  onHandleShowModalClick: (index: number, lengthPhotos: number) => void,
};

const ConcursNotStarted: React.FC<Props> = ({ voters, onHandleShowModalClick }) => (
  <div className={styles.concursNotStarted}>
    {
          voters && voters.length > 0
          && (voters.map((items, index) => (
            <ConcursPhotoEnd
              key={`concursPhotoEnd-${items.id}`}
              {...items}
              index={index}
              lengthPhotos={voters.length}
              onHandleShowModalClick={onHandleShowModalClick}
            />
          )))
        }
  </div>
);

export default ConcursNotStarted;
