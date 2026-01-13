/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { apiPostDeleteLike, apiPostLike } from '../../../../services/peoplecontrol';
import { loginUserData } from '../../../../store/login/login-selectors';
import { debounce } from '../../../../utils/core/debounce';
import styles from './peoplecontrol-like.module.scss';

type Props = {
  id: number,
  likes: any,
};

interface ResponsiveLike {
  anon_sess_id?: string,
  date?: string,
  is_like?: number,
  mat_id: number,
  mat_type: string,
  user_id?: number,
}

const PeoplecontrolLike: React.FC<Props> = React.memo(({ id, likes }) => {
  const isUserData = useSelector(loginUserData);

  const [likesData, setLikesArr] = useState(likes);
  const [ratingLikes, setRatingLikes] = useState();
  const [isActiveLike, setActiveLike] = useState(false);
  const [isActiveDisLike, setActiveDisLike] = useState(false);

  const onLikeChange = () => {
    setActiveLike(true);
    setActiveDisLike(false);
  };

  const onDisLikeChange = () => {
    setActiveLike(false);
    setActiveDisLike(true);
  };

  const onSetUserRating = () => {
    if (isUserData.length > 0) {
      const isUserLikes = likesData.filter((item) => (
        (+item.user_id === isUserData[0].id && +item.is_like === 1) && true
      ));
      const isUserDisLikes = likesData.filter((item) => (
        (+item.user_id === isUserData[0].id && +item.is_like === 0) && true
      ));

      if (isUserLikes.length > 0) onLikeChange();
      if (isUserDisLikes.length > 0) onDisLikeChange();
    }
  };

  const onSetRating = async (isLike:number) => {
    const like = {
      mat_type: 'peoplecontrolComplaint',
      mat_id: id,
      is_like: isLike,
    };

    try {
      const { data }: any = await apiPostLike(like);

      if (data.length !== 0 && data) {
        const {
          anon_sess_id,
          date,
          is_like,
          mat_id,
          mat_type,
          user_id,
        }: ResponsiveLike = data;

        if (is_like === 1) onLikeChange();
        if (is_like === 0) onDisLikeChange();

        setLikesArr([...likesData, {
          anon_sess_id,
          date,
          is_like,
          mat_id,
          mat_type,
          user_id,
        }]);
      }
    } catch (err) {
      const { data }: any = await apiPostDeleteLike({
        mat_type: 'peoplecontrolComplaint',
        mat_id: id,
      });

      if (data && data.length !== 0) {
        const { anon_sess_id, is_like }: ResponsiveLike = data;

        const filteredArr = likesData.filter((item: ResponsiveLike) => (
          (item.anon_sess_id !== anon_sess_id) && likesData
        ));

        if (is_like === 1) setActiveLike(false);
        if (is_like === 0) setActiveDisLike(false);

        setLikesArr(filteredArr);
      }
    }
  };

  const onSetRatingDebounce = debounce(onSetRating, 1000);

  const handleLikeClick = async () => onSetRatingDebounce(1);
  const handleDislikeClick = async () => onSetRatingDebounce(0);

  useEffect(() => onSetUserRating(), [isUserData]);
  useEffect(() => {
    const countLikes = likesData.filter((item) => (+item.is_like === 1) && item).length;
    const countDislikes = likesData.filter((item) => (+item.is_like === 0) && item).length;

    onSetUserRating();

    setRatingLikes((countDislikes * -1) + countLikes);
  }, [likesData]);

  return (
    <div className={styles.complaintLike}>
      <button
        className={classNames(styles.complaintLikeBtnDown, {
          [styles.complaintLikeBtnDownActive]: isActiveDisLike,
        })}
        type="button"
        aria-label="Кнопка дизлайк"
        onClick={handleDislikeClick}
      />
      <span className={styles.complaintLikeCounter}>{ratingLikes}</span>
      <button
        className={classNames(styles.complaintLikeBtnUp, {
          [styles.complaintLikeBtnUpActive]: isActiveLike,
        })}
        type="button"
        aria-label="Кнопка лайк"
        onClick={handleLikeClick}
      />
    </div>
  );
});

export default PeoplecontrolLike;
