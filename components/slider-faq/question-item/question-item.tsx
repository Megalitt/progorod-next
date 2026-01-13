import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { getImagePath } from '../../../utils/core/get-image-path';
import styles from './question-item.module.scss';

type ExpertType = {
  photo: string,
  fio: string,
};

type Props = {
  id: string | number,
  question: string,
  erid?: string,
  expert: null | ExpertType,
};

const QuestionItem: React.FC<Props> = React.memo(({
  id,
  question,
  expert,
  erid,
}) => {
  const url = erid ? `faq/${id}?erid=${erid}` : `faq/${id}`;

  return (
    <div className={`${styles.questionContent}`}>
      { expert && (
        <div
          className={classNames(styles.questionImgWrap, {
            [styles.questionImgWrapNoPhoto]: !expert.photo,
          })}
        >
          {expert.photo && (
            <picture>
              <source type="image/webp" srcSet={expert.photo && getImagePath({ image: expert.photo, sizeName: 'vert_2', isWebp: 'webp' })} />
              <img
                className={styles.questionImg}
                src={expert.photo && getImagePath({ image: expert.photo, sizeName: 'vert_2' })}
                width={129}
                alt={expert?.fio}
                loading="lazy"
              />
            </picture>
          )}
        </div>
      )}
      <p className={`${styles.questionText}`}>
        {question}
      </p>
      <div>
        <Link prefetch={false} href={url}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={styles.questionBtn} title={question}>Читать ответ</a>
        </Link>
      </div>
    </div>
  );
});

export default QuestionItem;
