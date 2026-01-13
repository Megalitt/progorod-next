import React from 'react';
import { VoteOptionsType } from '../../types';
import { ArticleVoteProgress } from '../index';

type Props = {
  options: Array<VoteOptionsType>,
  userChoseId: number
};

const ArticleVoteResult: React.FC<Props> = React.memo(({ options, userChoseId }) => {
  const getAllCountVotes = () => options.reduce((sum, current) => sum + current.votes, 0);
  const allVotes = getAllCountVotes();
  const getPerсentForItem = (all, current) => (all !== 0 ? Math.round((current * 100) / all) : 0);

  return (
    <>
      {options.map((option) => (
        <ArticleVoteProgress
          key={`ArticleVoteProgress-${option.id}`}
          label={option.title}
          progress={getPerсentForItem(allVotes, option.votes)}
          isChecked={+userChoseId === option.id}
        />
      ))}
    </>
  );
});

export default ArticleVoteResult;
