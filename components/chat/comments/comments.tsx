import React from 'react';
import { Comment } from '../index';

type Props = {
  comments: any, // временно
  link: string, // временно
};

const Comments: React.FC<Props> = ({ comments, link }) => {
  const renderComments = () => comments.map((item) => {
    if (Array.isArray(item?.replies) && item?.replies.length > 0) {
      const commentsWithInner = [<Comment key={item.id} commentData={item} link={link} />];
      item.replies.map((innerItem) => (
        commentsWithInner.push(<Comment key={innerItem.id} commentData={innerItem} isInner link={link} />)
      ));
      return commentsWithInner;
    }
    return <Comment key={item.id} commentData={item} link={link} />;
  });

  return (
    <>
      {
          comments.length > 0
            ? renderComments()
            : <div>У этой новости еще нет комментариев</div>
        }
    </>
  );
};

export default Comments;
