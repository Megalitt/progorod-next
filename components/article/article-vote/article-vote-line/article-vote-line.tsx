import React from 'react';
import { ArticleVoteItem } from '../index';
import { VoteOptionsType } from '../../types';

type Props = {
  options: Array<VoteOptionsType>,
  onhandleCheckItem: (id: number) => void,
  isDisabled: boolean
};

const ArticleVoteLine: React.FC<Props> = React.memo(({
  options,
  onhandleCheckItem,
  isDisabled,
}) => (
  <>
    {options && options.length > 0 && options.map((option) => (
      <ArticleVoteItem
        key={`ArticleVoteItem-${option.id}`}
        id={option.id}
        label={option.title}
        onhandleCheckItem={onhandleCheckItem}
        isDisabled={isDisabled}
      />
    ))}
  </>
));

export default ArticleVoteLine;
