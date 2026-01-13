import React from 'react';
import { Button } from '../../button';

import styles from './result.module.scss';

type Props = {
  result: string,
  onResetResultsClick: () => void,
};

const Result: React.FC<Props> = React.memo(({ result, onResetResultsClick }) => (
  <div className={styles.result}>
    <p>{result}</p>
    <Button
      onClick={onResetResultsClick}
    >
      Пройти еще раз
    </Button>
  </div>
));

export default Result;
