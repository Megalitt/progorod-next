import React from 'react';
import styles from './article-vote-item.module.scss';

type Props = {
  label: string,
  id: number,
  onhandleCheckItem: (evt: React.ReactNode) => void;
  isDisabled: boolean
};

const ArticleVoteItem: React.FC<Props> = React.memo(({
  label,
  id,
  onhandleCheckItem,
  isDisabled,
}) => (
  <div className={styles.articleVoteItem}>
    {label}
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label className={styles.articleVoteItemLabel}>
      <input
        className={styles.articleVoteItemInput}
        type="radio"
        name="vote-item"
        value={id}
        onChange={(evt) => onhandleCheckItem(evt.currentTarget.value)}
        disabled={isDisabled}
      />
      <div className={styles.articleVoteItemBg}>
        <span className={styles.articleVoteItemProgressTitle}>Голосовать</span>
      </div>
    </label>
  </div>
));

export default ArticleVoteItem;
