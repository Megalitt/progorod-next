import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { InnerChatForm } from '../index';

import { apiPostLike, apiPostDislike } from '../../../services/chat';
import { getChatData } from '../../../utils/time/chat-time';
import { getRoleName } from '../../../utils/get-role-name';

import { commentsModeSelector } from '../../../store/comments/comments-selectors';
import { loginStatus } from '../../../store/login/login-selectors';

import styles from './comment.module.scss';

type CommentType = {
  id: number
  toid: number
  text: string
  uname: string
  data: any
  likes: number
  liked_by_me: boolean | string
  userData: any,
  recipient: any,
};

type Props = {
  commentData: CommentType,
  isInner?: boolean,
  link: string,
};

const Comment: React.FC<Props> = ({ commentData, isInner = false, link }) => {
  const {
  // eslint-disable-next-line @typescript-eslint/naming-convention
    text, uname, data, userData, id, toid, likes, liked_by_me,
  } = commentData;
  const [isFormOpen, setFormOpenFlag] = useState(false);
  const [isLiked, setLikedFlag] = useState(liked_by_me);
  const [likesCounter, setLikesCounter] = useState(likes);
  const [isLikeDisabled, setLikeDisabledFlag] = useState(false);

  const commentsMode = useSelector(commentsModeSelector);
  const isAuth = useSelector(loginStatus);
  const isBlocked = false; // где-то в сторе должна быть, спрсить Борю
  const isModerate = false; // где-то в сторе должна быть, спрсить Борю

  const handleShowForm = () => setFormOpenFlag(true);

  const currentDate = Date.now();
  const commentDate = Number(new Date(data * 1000));
  const diff = currentDate - commentDate;

  useEffect(() => {
    // eslint-disable-next-line no-mixed-operators
    if ((commentsMode === 1 && isAuth || commentsMode === 1 && isModerate)
        || (commentsMode === 2 && isModerate)) {
      setFormOpenFlag(false);
    }
  }, []);

  useEffect(() => {
    setLikedFlag(liked_by_me);
  }, [liked_by_me]);

  const handleClickLike = () => {
    setLikedFlag('1');
    setLikesCounter((prev) => +prev + 1);
  };

  const handleClickDislike = () => {
    setLikedFlag('0');
    setLikesCounter((prev) => +prev - 1);
  };

  const handleClick = async (evt) => {
    evt.preventDefault();
    setLikeDisabledFlag(true);

    const values = {
      mat_type: 'comments',
      mat_id: id,
    };

    if (+isLiked === 0) {
      await apiPostLike(values)
        .then(() => {
          handleClickLike();
          setLikeDisabledFlag(false);
        });
      return;
    }

    await apiPostDislike(values)
      .then(() => {
        handleClickDislike();
        setLikeDisabledFlag(false);
      });
  };

  return (
    <div className={diff < 3000 ? styles.commentFresh : null}>
      <div>
        <div className={!isInner ? styles.comment : `${styles.comment} ${styles.commentInner}`}>
          <div className={styles.top}>
            <div className={styles.avatar}>
              <img
                src={!userData?.userphoto ? '/img/default-avatar.png' : userData.userphoto}
                width="35"
                loading="lazy"
                alt={`Аватар пользователя ${uname}`}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.infoWrap}>
                <span className={styles.infoNick}>{ userData?.nick || uname }</span>
                { isInner && <span className={styles.infoTo}>{commentData.recipient?.uname || ''}</span>}
                <span className={styles.time}>{getChatData(data)}</span>
              </div>
              <span className={styles.infoStatus}>{getRoleName(userData?.role || -1)}</span>
            </div>
          </div>
          <p>{text}</p>
          { !isFormOpen && !isBlocked ? (
            <div className={styles.bottom}>
              <button
                className={styles.btn}
                type="button"
                onClick={handleShowForm}
              >
                Ответить
              </button>
              <button
                className={`${styles.likesCount} ${+isLiked === 1 ? styles.likesCountActive : styles.likesCountUnactive}`}
                type="button"
                aria-label="Количество лайков"
                onClick={handleClick}
                disabled={isLikeDisabled}
              >
                {likesCounter}
              </button>
            </div>
          )
            : (
              <InnerChatForm
                toUser={uname}
                id={id}
                toId={toid}
                setFormOpenFlag={setFormOpenFlag}
                link={link}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
