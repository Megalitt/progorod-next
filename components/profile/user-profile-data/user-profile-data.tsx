import React from 'react';
import { FormUserPhoto } from '../index';
import styles from './user-profile-data.module.scss';

type Props = {
  nick: string,
  email: string,
  userphoto: string,
  canModerate: boolean,
  onHandleOpenChangePassword: () => void;
  onHandleLogout: () => void;
};

const UserProfileData: React.FC<Props> = React.memo(({
  nick,
  email,
  userphoto,
  canModerate,
  onHandleOpenChangePassword,
  onHandleLogout,
}) => (
  <div className={styles.userProfileData}>
    <div className={styles.userProfileDataPhoto}>
      <img className={styles.userProfileDataPhotoImg} src={`${userphoto}`} alt={nick} loading="lazy" />
      <FormUserPhoto />
    </div>
    <div className={styles.userProfileDataInfo}>
      <div className={styles.userProfileDataUserName}>{nick}</div>
      <div className={styles.userProfileDataUserEmail}>{email}</div>
      <div className={styles.userProfileDataBtns}>
        <button
          className={styles.userProfileDataBtnChangePassword}
          type="button"
          onClick={onHandleOpenChangePassword}
        >
          Смена пароля
        </button>
        {canModerate && <a className={styles.userProfileDataBtnAdmin} href="/admin">В админку</a>}
        <button
          className={styles.userProfileDataBtnLogout}
          type="button"
          onClick={onHandleLogout}
        >
          Выйти
        </button>
      </div>
    </div>
  </div>
));

export default UserProfileData;
