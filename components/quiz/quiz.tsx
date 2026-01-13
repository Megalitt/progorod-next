import React, { useState } from 'react';
import { Result, Slide } from './index';
import { apiGetQuizResult } from '../../services/quiz';

import styles from './quiz.module.scss';

type Props = {
  items: any,
};

const Quiz: React.FC<Props> = React.memo(({ items }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTestPassed, setTestPassedFlag] = useState(false);
  const [resultString, setResultString] = useState('');
  const [result, setResult] = useState('');

  const handleResetResultsClick = () => {
    setCurrentSlide(0);
    setTestPassedFlag(false);
    setResultString('');
    setResult('');
  };

  const getResult = async (value) => {
    try {
      const quizResult = await apiGetQuizResult(value);
      await setResult(quizResult.text ?? 'Не удалось получить результаты');
    } catch (err) {
      setResult('Не удалось получить результаты');
    }
  };

  const handleSlideButtonClick = (value) => {
    setCurrentSlide((prev) => prev + 1);
    setResultString((prev) => `${prev}${value.quiz_item_id}:${value.id};`);
    if (currentSlide + 1 === items.length) {
      setTestPassedFlag((prev) => !prev);
      getResult(`${resultString}${value.quiz_item_id}:${value.id}`);
    }
  };

  return (
    <div className={styles.test}>
      {items && (
      <div className={styles.testWrap}>
        {
          !isTestPassed && (
            <b className={styles.testCounter}>
              { currentSlide + 1 }
              /
              {items.length}
            </b>
          )
        }
        {!isTestPassed && (
        <Slide
          onSlideButtonClick={handleSlideButtonClick}
          {...items[currentSlide]}
        />
        )}
        { isTestPassed && <Result result={result} onResetResultsClick={handleResetResultsClick} />}
      </div>
      )}
    </div>
  );
});

export default Quiz;
