import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  Comments,
  ChatForm,
} from './index';
import { Loader } from '../loader';

import {
  setComments,
  setCommentsCounts,
  setCommentsPerPage,
} from '../../store/comments/comments-slice';

import {
  commentsCountsSelector,
  commentsPerPageSelector,
  commentsSelector,
  newCommentDataSelector,
} from '../../store/comments/comments-selectors';
import { loginStatus, loginUserData } from '../../store/login/login-selectors';
import { apiGetCommentsActual } from '../../services/chat';
import styles from './chat.module.scss';

type Props = {
  link: string,
  commentsMode?: number,
  disableComment?: number,
  disableCommentForAnonim?: number,
};

const Chat: React.FC<Props> = ({
  link,
  commentsMode = 0,
  disableComment = 0,
  disableCommentForAnonim = 0,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const comments = useSelector(commentsSelector);
  const newCommentData = useSelector(newCommentDataSelector);
  const commentsCounts = useSelector(commentsCountsSelector);
  const commentsPerPage = useSelector(commentsPerPageSelector);
  const userData = useSelector(loginUserData);
  const isAuth = useSelector(loginStatus);
  const isModerate = userData?.canModerate ?? false;
  const isBlocked = false; // брать из стейта, спросить у Бориса
  const chatHeight = process.env.NEXT_PUBLIC_TITLE_LENGTH === '120' ? { heightMax: 655, heightMin: 210 } : { heightMax: 783, heightMin: 230 };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getComments = (id) => async (dispatch) => {
    const { comments: commentData, perPage, totalCount } = await apiGetCommentsActual(1, id, link);
    await dispatch(setComments(commentData));
    await dispatch(setCommentsCounts(totalCount));
    await dispatch(setCommentsPerPage(perPage));
  };

  useEffect(() => {
    if (+disableCommentForAnonim === 1 && +disableComment !== 1) {
      dispatch(getComments(router.query.id));
    }

    if ((+disableComment !== 1 && +disableCommentForAnonim !== 1 && +commentsMode !== 3)
        && (+commentsMode === 0 || +commentsMode === 1 || +commentsMode === 2)) {
      dispatch(getComments(router.query.id));
    }

    dispatch(setCommentsPerPage(1));
  }, []);

  useEffect(() => {
    if ('toid' in newCommentData) {
      dispatch(setCommentsCounts(+commentsCounts + 1));
      if (newCommentData.toid !== null) {
        const { toid } = newCommentData;

        const replaceComment = () => {
          const parentComment = comments.slice().find((item) => item.id === toid);
          const parentCommentIndex = comments.slice().indexOf(parentComment);
          const parentCommentCopy = JSON.parse(JSON.stringify(parentComment));

          if (parentComment !== -1) {
            if (!('replies' in parentCommentCopy)) parentCommentCopy.replies = [];

            parentCommentCopy.replies.push(newCommentData);
            const replacedArray = [
              ...comments.slice().slice(0, parentCommentIndex),
              parentCommentCopy,
              ...comments.slice().slice(parentCommentIndex + 1),
            ];

            return replacedArray;
          }

          return [...comments];
        };

        dispatch(setComments(replaceComment()));
        return;
      }

      dispatch(setComments([newCommentData, ...comments]));
    }
  }, [newCommentData]);

  if (commentsPerPage !== -1) {
    if (isBlocked) {
      return (
        <div id="comments">
          <h2 className={styles.chatTitle}>
            Комментарии:
            {commentsCounts}
          </h2>
          <p>Ваш ip заблокирован. Вы не можете оставлять комментарии.</p>
          <Comments comments={comments} link={link} />
        </div>
      );
    }

    if (+disableComment === 1) {
      return (
        <p id="comments">Комментарии на этой странице отключены.</p>
      );
    }

    if (+disableCommentForAnonim === 1) {
      return (
        <div id="comments" className={styles.chat}>
          <div className={styles.chatTop}>
            <h2 className={styles.chatTitle}>
              Комментарии:
              &nbsp;
              {commentsCounts}
            </h2>
            <div className={styles.chatAuth}>
              <b>Войти:</b>
            </div>
          </div>
          <Scrollbars style={comments.length > 0 ? { height: chatHeight.heightMax } : { height: chatHeight.heightMin }}>
            <div className={styles.chatBottom}>
              { isAuth || isModerate
                ? <ChatForm link={link} />
                : <p>Авторизируйтесь, чтобы оставлять коммментарии.</p> }
              <Comments comments={comments} link={link} />
            </div>
          </Scrollbars>
        </div>
      );
    }
    switch (+commentsMode) {
      case 1:
        return (
          <div id="comments" className={styles.chat}>
            <div className={styles.chatTop}>
              <h2 className={styles.chatTitle}>
                Комментарии:
                &nbsp;
                {commentsCounts}
              </h2>
              <div className={styles.chatAuth}>
                <b>Войти:</b>
              </div>
            </div>
            <Scrollbars style={comments.length > 0 ? { height: chatHeight.heightMax } : { height: chatHeight.heightMin }}>
              <div className={styles.chatBottom}>
                { isAuth || isModerate
                  ? <ChatForm link={link} />
                  : <p>Авторизируйтесь, чтобы оставлять коммментарии.</p> }
                <Comments comments={comments} link={link} />
              </div>
            </Scrollbars>
          </div>
        );
      case 2:
        return (
          <div id="comments" className={styles.chat}>
            <div className={styles.chatTop}>
              <h2 className={styles.chatTitle}>
                Комментарии:
                &nbsp;
                {commentsCounts}
              </h2>
              <div className={styles.chatAuth}>
                <b>Войти:</b>
              </div>
            </div>
            <Scrollbars style={comments.length > 0 ? { height: chatHeight.heightMax } : { height: chatHeight.heightMin }}>
              <div className={styles.chatBottom}>
                { isModerate
                  ? <ChatForm link={link} />
                  : <p>Только модераторы могут оставлять комментарии к этой статье.</p>}
                <Comments comments={comments} link={link} />
              </div>
            </Scrollbars>
          </div>
        );
      case 3:
        return (
          <p id="comments">Комментарии на этой странице отключены.</p>
        );
      default:
        return (
          <div id="comments" className={styles.chat}>
            <div className={styles.chatTop}>
              <h2 className={styles.chatTitle}>
                Комментарии:
                &nbsp;
                {commentsCounts}
              </h2>
              <div className={styles.chatAuth}>
                <b>Войти:</b>
              </div>
            </div>
            <Scrollbars style={comments.length > 0 ? { height: chatHeight.heightMax } : { height: chatHeight.heightMin }}>
              <div className={styles.chatBottom}>
                <ChatForm link={link} />
                <Comments comments={comments} link={link} />
              </div>
            </Scrollbars>
          </div>
        );
    }
  } else {
    return <Loader />;
  }
};

export default Chat;
