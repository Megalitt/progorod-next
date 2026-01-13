import React from 'react';
import classNames from 'classnames';
import styles from './modal.module.scss';

type Props = {
  children?: JSX.Element[] | JSX.Element | string,
  onHandleCloseModalCities: () => void,
  isCloseModalCitiesAnimated: boolean,
  refModalCitiesOutsideElement?: any,
};

const Modal: React.FC<Props> = React.memo(({
  children,
  onHandleCloseModalCities,
  isCloseModalCitiesAnimated,
  refModalCitiesOutsideElement,
}) => {
  const handleEscapeKeydown = (evt) => {
    if (evt.keyCode === 27) {
      onHandleCloseModalCities();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscapeKeydown, false);

    return () => {
      document.removeEventListener('keydown', handleEscapeKeydown, false);
    };
  }, []);

  return (
    <div
      className={classNames(styles.modal, {
        [styles.modalCloseAnimate]: isCloseModalCitiesAnimated,
      })}
    >
      <div className={styles.modalWrp} ref={refModalCitiesOutsideElement}>
        <button
          className={styles.modalBtnClose}
          area-label="Закрыть модальное окно"
          onClick={onHandleCloseModalCities}
        />
        {children}
      </div>
    </div>
  );
});

export default Modal;
