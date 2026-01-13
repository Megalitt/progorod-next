import React, { useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { ArticleVoteLine, ArticleVoteResult } from './index';
import { getArticleVoteResult } from '../../../services/article';
import { VoteType } from '../types';
import styles from './article-vote.module.scss';

type Props = {
  voting: any,
};

const ArticleVote: React.FC<Props> = React.memo(({ voting }) => {
  const { options, id, title }: VoteType = voting;

  const [isDisabled, setDisabled] = useState(false);
  const [userChoseId, setUserChoseId] = useState(null);
  const [votingData, setVotingData] = useState([]);
  const [isVoting, setVoting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    // Временно закомментировал условие
    if (/* Math.floor(Date.now() / 1000) > voting.end_date || */localStorage.getItem(`voting-${id}`)) {
      setVoting(true);
      setVotingData(options);
    }
  }, []);

  const handleCheckItem = async (checkId) => {
    const reCaptcha = await executeRecaptcha('vote');
    const data: any = await getArticleVoteResult(checkId, reCaptcha);
    setVotingData(data.options);
    setVoting(true);
    setDisabled(true);
    setUserChoseId(checkId);
    localStorage.setItem(`voting-${id}`, `${id}`);
  };

  const RenderVote = () => {
    if (!isVoting && options && options.length > 0) {
      return (
        <div className={styles.articleVote}>
          <form>
            <div className={styles.articleVoteHead}>{title}</div>
            <ArticleVoteLine
              options={options}
              onhandleCheckItem={handleCheckItem}
              isDisabled={isDisabled}
            />
          </form>
        </div>
      );
    }
    if (isVoting && Array.isArray(votingData) && votingData.length > 0) {
      return (
        <div className={styles.articleVote}>
          <div className={styles.articleVoteHead}>{title}</div>
          <ArticleVoteResult
            options={votingData}
            userChoseId={userChoseId}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <RenderVote />
  );
});

export default ArticleVote;
