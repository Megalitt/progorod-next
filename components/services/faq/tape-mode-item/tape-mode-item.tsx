import React, { useState } from 'react';
import classNames from 'classnames';

import Link from 'next/link';
import styles from './tape-mode-item.module.scss';
import { createMarkup } from '../../../../utils/core/create-markup';
import { getPostInnerDate } from '../../../../utils/time/get-post-inner-date';

type Props = {
  id: number,
  answer: string,
  question: string,
  timestamp: string,
  erid: string,
  views_count: string | number,
  image: any,
  expert: any,
};

const TapeModeItem: React.FC<Props> = ({
  id,
  answer,
  question,
  image,
  views_count,
  timestamp,
  expert,
  erid,
}) => {
  const [isOpen, setIsOpenFlag] = useState(false);
  const url = erid ? `/faq/${id}?erid=${erid}` : `/faq/${id}`;

  const handleButtonClick = (evt) => {
    evt.preventDefault();
    setIsOpenFlag((prev) => !prev);
  };

  return (
    <div className={styles.popularityItem}>
      <div className={styles.popularityContent}>
        <div className={classNames(styles.popularityCol, styles.popularityColTop)}>
          <div
            className={classNames(styles.popularityImgWrap, {
              [styles.popularityImgWrapNoPhoto]: !image,
            })}
          >
            {image && <img src={image?.image} alt="Фото к вопросу" className={styles.popularityImg} />}
          </div>

          {expert && expert.fio && (
            <Link prefetch={false} href={`/faq/expert/${expert.id}`}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className={styles.popularityImgTitle} title={expert.fio}>
                {expert.fio}
              </a>
            </Link>
          )}
        </div>
        <div className={styles.popularityCol}>
          <div className={styles.qaTextItem}>
            <h2 className={styles.qaTextItemQuestionTitle}>
              <Link prefetch={false} href={url}>
                <a className={styles.qaTextItemQuestionTitleInner} title={question}>{question}</a>
              </Link>
            </h2>
            <div
              className={classNames(styles.qaTextItemAnswer, {
                [styles.qaTextItemAnswerActive]: isOpen,
              })}
              dangerouslySetInnerHTML={createMarkup(answer)}
            />
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              className={classNames(styles.qaTextItemBtnMore, {
                [styles.qaTextItemBtnMoreActive]: isOpen,
              })}
              onClick={handleButtonClick}
            />
          </div>
        </div>

      </div>
      <div className={styles.popularityInfo}>
        {expert && expert.fio && (
          <Link prefetch={false} href={`/faq/expert/${expert.id}`}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              className={styles.popularityName}
              title={expert.fio}
            >
              {expert.fio}
            </a>
          </Link>
        )}
        <div className={styles.popularityDateWrap}>
          <span className={styles.date}>{getPostInnerDate(+timestamp)}</span>
          <span className={styles.viewCount}>{views_count}</span>
        </div>
      </div>
    </div>
  );
};

export default TapeModeItem;
