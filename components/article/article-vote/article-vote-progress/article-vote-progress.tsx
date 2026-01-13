import React, { useEffect, useState } from 'react';
import styles from './article-vote-progress.module.scss';

type Props = {
  label: string,
  progress: number,
  isChecked: boolean,
};

const ArticleVoteProgress: React.FC<Props> = React.memo(({ label, progress, isChecked }) => {
  const [isProgress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(progress);
  }, [progress]);

  return (
    <div className={styles.articleVoteProgress}>
      {label}
      <div className={styles.articleVoteProgressBg}>
        <div className={isChecked ? styles.articleVoteProgressBarActive : styles.articleVoteProgressBar} style={{ width: `${isProgress}%` }} />
      </div>
      <span className={styles.articleVoteProgressValue}>{`${progress}%`}</span>
    </div>
  );
});

export default ArticleVoteProgress;
