import React, { useMemo } from 'react';
import classNames from 'classnames';
import { createMarkup } from '../../../../utils/core/create-markup';
import { sortArrayBy } from '../../../../utils/core/sort-array-by';
import { ArticleSocial } from '../../../article-social';
import { ConcursPhoto, ConcursResults, ConcursNotStarted } from '../index';

import SliderModal from '../../../slider-modal/slider-modal';
import withSliderLightbox from '../../../../hocs/with-slider-lightbox/with-slider-lightbox';

import styles from './concurs-wrap.module.scss';
import { LinkCustom } from '../../../link-custom';

const ConcursWrap = ({
  id,
  title,
  content,
  items,
  date,
  end_date,
  currentSlide,
  likes,
  is_open,
  winners_count,
  isActiveSlideModal,
  isCloseAnimated,
  disableComment,
  myVoteId,
  onHendleResetStatusVote,
  onHandleShowModalClick,
  onHandleCloseModalClick,
  onHandleNextSlide,
  onHandlePrevSlide,
  onHandleTouchStart,
  onHandleTouchEnd,
}) => {
  const filteredVotes = useMemo(() => (items && items.filter((item) => (item.state === 'approved') && item)), []);
  const sortVotersByVotes = useMemo(() => (filteredVotes ? sortArrayBy(filteredVotes, 'votes', true) : ''), []);
  const currentDate = Math.floor(Date.now() / 1000);

  return (
    <>
      <div className={styles.concurs}>
        <h1>{title}</h1>
        <div
          className={styles.concursBody}
          dangerouslySetInnerHTML={createMarkup(content)}
        />
        {typeof is_open === 'number' && is_open === 1 && (
          <LinkCustom className={classNames('btn', 'btnNoBgEdit')} href={`/concurs-entry/${id}`}>
            <a className={styles.concursEntryBtn}>Принять участие</a>
          </LinkCustom>
        )}
        <ArticleSocial uri={`/concurs/view/${id}`} disableComment={disableComment} />

        {+date > currentDate && (currentDate < +end_date) && (
          <ConcursNotStarted
            voters={sortVotersByVotes}
            onHandleShowModalClick={onHandleShowModalClick}
          />
        )}

        {currentDate > +end_date && (
          <ConcursResults
            countWinners={winners_count}
            voters={sortVotersByVotes}
            onHandleShowModalClick={onHandleShowModalClick}
          />
        )}
        {currentDate < +end_date && (currentDate > +date) && (
          <div className={styles.concursPhotos}>
            {
                sortVotersByVotes && sortVotersByVotes.map((photos, index) => (
                  <ConcursPhoto
                    key={`concursPhoto-${photos.id}`}
                    {...photos}
                    index={index}
                    lengthPhotos={filteredVotes.length}
                    myVoteId={myVoteId}
                    likes={likes}
                    onHendleResetStatusVote={onHendleResetStatusVote}
                    onHandleShowModalClick={onHandleShowModalClick}
                  />
                ))
              }
          </div>
        )}
      </div>
      {isActiveSlideModal && (
        <SliderModal
          currentImage={sortVotersByVotes[currentSlide].image}
          title={sortVotersByVotes[currentSlide].author_name}
          lengthImages={filteredVotes.length}
          isCloseAnimated={isCloseAnimated}
          onHandleNextSlide={onHandleNextSlide}
          onHandlePrevSlide={onHandlePrevSlide}
          onHandleCloseModalClick={onHandleCloseModalClick}
          onHandleTouchStart={onHandleTouchStart}
          onHandleTouchEnd={onHandleTouchEnd}
        />
      )}
    </>
  );
};

export default withSliderLightbox(ConcursWrap);
