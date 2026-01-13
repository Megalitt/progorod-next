import React from 'react';
import { ConcursPhotoEnd } from '../index';

import styles from './concurs-results.module.scss';

type Props = {
  voters: any,
  countWinners: number,
  onHandleShowModalClick: (index: number, lengthPhotos: number) => void,
};

const ConcursResults: React.FC<Props> = ({ voters, onHandleShowModalClick, countWinners }) => {
  const winners = voters.slice(0, countWinners);
  return (
    <>
      <h2 className={styles.concursResultsTitle}>Голосование окончено. Результаты:</h2>
      <div className={styles.concursResults}>
        {
            voters && voters.length > 0
            && (winners.map((items, index) => (
              <ConcursPhotoEnd
                key={`concursPhotoEndWinner-${items.id}`}
                isWinner
                {...items}
                index={index}
                lengthPhotos={winners.length}
                onHandleShowModalClick={onHandleShowModalClick}
              />
            )))
          }
      </div>
      <div className={styles.concursResults}>
        {
            voters && voters.slice(countWinners, voters && voters.length).map((items, index) => (
              <ConcursPhotoEnd
                key={`concursPhotoEnd-${items.id}`}
                isWinner={false}
                {...items}
                onHandleShowModalClick={onHandleShowModalClick}
                index={index + +countWinners}
                lengthPhotos={voters.length}
              />
            ))
          }
      </div>
    </>
  );
};

export default ConcursResults;
