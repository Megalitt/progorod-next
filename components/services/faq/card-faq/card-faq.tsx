import React, { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './card-faq.module.scss';
import { createMarkup } from '../../../../utils/core/create-markup';

type Props = {
  id: number,
  question: string,
  answer: string
};

const CardFaq: React.FC<Props> = ({ id, question, answer }) => {
  const [isOpen, setIsOpenFlag] = useState(false);

  const handleButtonClick = (evt) => {
    evt.preventDefault();
    setIsOpenFlag((prev) => !prev);
  };

  return (
    <div className={styles.qaTextItem}>
      <div className={styles.qaTextItemWrap}>
        {/* <b className={styles.qaTextItemQuestion}>{question}</b> */}

        <h2 className={styles.qaTextItemQuestionTitle}>
          <Link prefetch={false} href={`/faq/${id}`}>
            <a className={styles.qaTextItemQuestionTitleInner} title={question}>
              {question}
            </a>
          </Link>
        </h2>

        <div
          className={classNames(styles.qaTextItemAnswer, {
            [styles.qaTextItemAnswerActive]: isOpen,
          })}
          dangerouslySetInnerHTML={createMarkup(answer)}
        />
      </div>

      {
        answer.length > 185 && (
          <div className={styles.qaTextItemBtnMoreWrap}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className={classNames(styles.qaTextItemBtnMore, {
                [styles.qaTextItemBtnMoreActive]: isOpen,
              })}
              onClick={handleButtonClick}
            />
          </div>
        )
      }
    </div>
  );
};

export default CardFaq;
