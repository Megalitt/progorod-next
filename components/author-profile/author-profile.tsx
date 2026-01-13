import React from 'react';
import { createMarkup } from '../../utils/core/create-markup';
import { getImagePath } from '../../utils/core/get-image-path';
import styles from './author-profile.module.scss';

type Props = {
  email: string,
  roleName: string,
  nick: string,
  spectitle: string,
  userphoto: string | null,
};

const AuthorProfile: React.FC<Props> = React.memo(({
  email,
  nick,
  roleName,
  userphoto,
  spectitle,
}) => (
  <div className={styles.authorProfile}>
    <header className={styles.authorProfileHead}>Профиль автора</header>
    <div className={styles.authorProfileInfo}>
      <div className={styles.authorProfilePhoto}>
        <img
          className={styles.authorProfilePhotoImg}
          src={userphoto && getImagePath({ image: userphoto })}
          alt={nick}
        />
      </div>
      <div className={styles.authorProfileUserData}>
        <div className={styles.authorProfileUserName}>{nick}</div>
        <div className={styles.authorProfileUserInfoItem}>{roleName}</div>
        <div className={styles.authorProfileUserInfoItem}>{email}</div>
        {spectitle && (
          <>
            <div className={styles.authorProfileUserAboutTitle}>Об авторе</div>
            <div className={styles.authorProfileUserAbout} dangerouslySetInnerHTML={createMarkup(spectitle)} />
          </>
        )}
      </div>
    </div>
  </div>
));

export default AuthorProfile;
