import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { setAlerts } from '../../../../store/alert/alert-slice';
import { apiPostVote, apiPostDisVote } from '../../../../services/concurs';
import { debounce } from '../../../../utils/core/debounce';
import { getImagePath } from '../../../../utils/core/get-image-path';
import styles from './concurs-photo.module.scss';

type Props = {
  id: number,
  image: string,
  votingId?: number,
  voting_option_id?: number,
  text: string,
  author_name: string,
  votes: number,
  index: number,
  lengthPhotos: number,
  myVoteId: number,
  likes: number,
  onHandleShowModalClick: (evt: any, index: number, lengthPhotos: number) => void,
  onHendleResetStatusVote: () => void,
};

const ConcursPhoto: React.FC<Props> = ({
  id,
  image,
  voting_option_id,
  author_name,
  text,
  index,
  lengthPhotos,
  votes,
  likes,
  myVoteId,
  onHandleShowModalClick,
  onHendleResetStatusVote,
}) => {
  const [countLikes, setCountLikes] = useState(votes);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLiked, setLiked] = useState(null);
  const dispatch = useDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleLikeClick = React.useCallback(async (myVoteId, votingOptionId) => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const reCaptcha = process.env.NEXT_PUBLIC_RECAPTCHA_KEY.length > 0 ? await executeRecaptcha('vote') : null;

    if (isLiked || (myVoteId && myVoteId === votingOptionId)) {
      await apiPostDisVote(voting_option_id, reCaptcha)
        .then(async (res) => {
          if (res.status === 200) {
            setCountLikes((prev) => +prev - 1);
            setActiveIndex(null);
            setLiked(false);
            onHendleResetStatusVote();
            dispatch(setAlerts({
              message: 'Спасибо! Ваш голос был отменен!',
              messageType: 'success',
            }));
          }
        })
        .catch((err) => {
          setCountLikes((prev) => +prev + 1);
          setActiveIndex(voting_option_id);
          setLiked(true);
          dispatch(setAlerts({
            message: 'Вы уже голосовали в данном материале',
            messageType: 'error',
          }));
          console.log(err);
        });
    } else {
      await apiPostVote(voting_option_id, reCaptcha)
        .then(async (res) => {
          if (res.status === 200) {
            console.log(Object.keys(res?.data?.errors).length);
            setCountLikes((prev) => +prev + 1);
            setActiveIndex(voting_option_id);
            setLiked(true);
            onHendleResetStatusVote();
            dispatch(setAlerts({
              message: 'Спасибо! Ваш голос отправлен в систему учета!',
              messageType: 'success',
            }));
          }
        })
        .catch((err) => {
          dispatch(setAlerts({
            message: 'Вы уже голосовали в данном материале',
            messageType: 'error',
          }));
          console.log(err);
        });
    }
  }, [executeRecaptcha, isLiked]);

  const onHandleLikeClickDebounce = debounce(handleLikeClick, 200);

  return (
    <div
      className={
        classNames(styles.concursPhoto,
          {
            [styles.concursPhotoActive]: (myVoteId && myVoteId === voting_option_id) || activeIndex === voting_option_id,
          })
      }
      data-id-photo={id}
    >
      <div
        className={styles.concursPhotoImgWrap}
        onClick={(evt) => onHandleShowModalClick(evt, index, lengthPhotos)}
        aria-label="Показать модальное окно с картинкой"
        aria-hidden="true"
        title={`${author_name !== '' ? author_name : ''} ${text !== '' ? text : ''}`}
      >
        {image && (
          <picture>
            <source type="image/webp" media="(max-width: 480px)" srcSet={image && getImagePath({ image, sizeName: 'mobile', isWebp: 'webp' })} />
            <source type="image/webp" srcSet={image && getImagePath({ image, sizeName: 'desktop', isWebp: 'webp' })} />
            <img className={styles.concursPhotoImg} src={image && getImagePath({ image, sizeName: 'desktop' })} alt={author_name} loading="lazy" />
          </picture>
        )}
        <span className={styles.concursPhotoInfo}>
          <span>
            {author_name.length > 0 ? author_name : ''}
            {text.length > 0 ? text : ''}
          </span>
          {+likes === 1 && (
            <button
              className={
                classNames(styles.concursPhotoInfoCount,
                  {
                    [styles.concursPhotoInfoCountActive]: activeIndex === voting_option_id,
                  })
              }
              onClick={() => onHandleLikeClickDebounce(myVoteId, voting_option_id)}
              type="button"
            >
              {countLikes}
            </button>
          )}
        </span>
      </div>
    </div>
  );
};

export default ConcursPhoto;
