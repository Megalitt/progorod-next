import React from 'react';
import classNames from 'classnames';
import { createMarkup } from '../../../../utils/core/create-markup';
import { getImagePath } from '../../../../utils/core/get-image-path';
import { LinkCustom } from '../../../link-custom';
import { getPostInnerDate } from '../../../../utils/time/get-post-inner-date';
import styles from './faq-article.module.scss';

type ExpertType = {
  id: number,
  fio: string,
  photo: string,
  position: string,
  phone: string,
};

type ImageType = {
  image: string,
};

type Props = {
  image: ImageType | null,
  question: string,
  answer: string,
  expert: ExpertType,
  timestamp: string,
};

const FaqArticle: React.FC<Props> = ({
  image,
  question,
  expert,
  answer,
  timestamp,
}) => (
  <div className={styles.article}>
    <h1 className={styles.articleTitle}>{question}</h1>
    <div className={styles.articleTime}>
      <span dangerouslySetInnerHTML={createMarkup(getPostInnerDate(+timestamp))} />
    </div>
    {image && (
    <div className={styles.articleImgWrap}>
      <img className={styles.articleImg} src={image?.image} alt={question} />
    </div>
    )}
    <div className={styles.expert}>
      <div className={styles.expertInfo}>
        <div className={styles.expertPhoto}>
          <div
            className={classNames(styles.expertImgWrap, {
              [styles.expertImgWrapNoPhoto]: expert && !expert.photo,
            })}
          >
            {expert && expert.photo && (
            <picture>
              <source type="image/webp" srcSet={expert.photo && getImagePath({ image: expert.photo, sizeName: 'vert_2', isWebp: 'webp' })} />
              <img
                className={styles.expertImg}
                src={expert.photo && getImagePath({ image: expert.photo, sizeName: 'vert_2' })}
                alt={`Фото специалиста ${expert.fio}`}
              />
            </picture>
            )}
          </div>
        </div>
        <div className={styles.expertTagWrap}>
          <span className={styles.expertTag}>Специалист темы</span>
        </div>
        <b className={styles.expertName}>{expert && expert.fio && expert.fio}</b>
        <span className={styles.expertCareer}>{expert && expert.position && expert.position}</span>
      </div>
      <div className={styles.expertText}>
        <div dangerouslySetInnerHTML={createMarkup(answer)} />
      </div>

      <div className={styles.expertDetail}>
        {expert && expert.phone && (
          <b className={styles.expertDetailTitle}>Подробную консультацию можно получить:</b>
        )}
        {expert && expert.phone && (
        <ul className={styles.expertList}>
          <li className={styles.expertListItem}>
            {expert.phone}
          </li>
        </ul>
        )}
        <div className={styles.expertButtons}>
          <LinkCustom
            href="/faq/send"
            className={classNames('btn')}
          >
            Задать вопрос специалисту
          </LinkCustom>
          <LinkCustom
            href="/faq/expert/request"
            className={classNames('btn', 'btnNoBg')}
          >
            Стать специалистом
          </LinkCustom>
        </div>
      </div>
    </div>
  </div>
);

export default FaqArticle;
