import React, { useState } from 'react';
import classNames from 'classnames';
import LinkTarget from '../link-target/link-target';
import styles from './article-modal.module.scss';

type SuperType = {
  title?: string,
  uri?: string,
  empty_template?: boolean | number,
};

const ArticleModal: React.FC<SuperType> = React.memo(({
  title,
  uri,
  empty_template,
}) => {
  const [isShowModal, setShowModal] = useState(true);
  const [isCloseAnimated, setCloseAnimated] = useState(false);

  const handleCloseModal = () => {
    setCloseAnimated(true);

    setTimeout(() => {
      setShowModal(false);
    }, 200);
  };

  return (
    <>
      {isShowModal && (
        <div className={classNames(styles.articleModal, {
          [styles.articleModalIsClose]: isCloseAnimated,
        })}
        >
          <LinkTarget isTemplate={empty_template} href={uri}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>{title}</a>
          </LinkTarget>
          <button
            className={styles.articleModalClose}
            onClick={handleCloseModal}
            type="button"
            aria-label="Закрыть модальное окно"
          />
        </div>
      )}
    </>
  );
});
export default ArticleModal;
