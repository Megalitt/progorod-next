import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import { loginUserData, loginStatus } from '../../store/login/login-selectors';
import {
  setLoginShowModal,
  setLoginStatus,
  setShowModalType,
  setLoginCloseModalAnimated,
  getLogout,
  getLoginStatus,
} from '../../store/login/login-slice';

import { UserProfileData, UserProfileError } from './index';
import { apiGetUserArticles } from '../../services/redactor';
import { WithLoadMore } from '../../hocs/with-load-more/with-load-more';
import { NewsCardUser } from '../news-card-user';
import { Loader } from '../loader';
import styles from './profile.module.scss';

const LoadMore = WithLoadMore(NewsCardUser);

const Profile: React.FC = React.memo(() => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoginStatus = useSelector(loginStatus);
  const isUserData = useSelector(loginUserData);
  const [userArticles, setUserArticles] = useState([]);
  const [totalCountPage, setTotalCountPage] = useState(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (isUserData.length > 0) {
        const { id } = isUserData[0];
        const { data, headers }: any = await apiGetUserArticles(id);
        setTotalCountPage(headers['x-pagination-total-count']);
        setUserArticles(data);
      }
    };
    fetchData();
  }, [isUserData]);

  const handleOpenFormRecoveryPassword = () => {
    document.body.classList.add('no-scroll');
    dispatch(setLoginShowModal(true));
    dispatch(setShowModalType('formReset'));
    dispatch(setLoginCloseModalAnimated(false));
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await dispatch(getLogout());
      const { payload }:any = await dispatch(getLoginStatus());
      const { resultCode } = payload;
      dispatch(setLoginStatus(resultCode));
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const RenderLoader = () => (
    <div className={styles.userProfileContentLoading}>
      <Loader />
    </div>
  );

  const Render = () => {
    if (isLoginStatus === true && isUserData.length !== 0) {
      const {
        id, nick, email, userphoto, canModerate,
      } = isUserData;
      return (
        <>
          <UserProfileData
            nick={nick}
            email={email}
            userphoto={userphoto}
            canModerate={canModerate}
            onHandleOpenChangePassword={handleOpenFormRecoveryPassword}
            onHandleLogout={handleLogout}
          />
          {canModerate && (
            <>
              <div className={styles.userProfileCountArticles}>
                Публикаций:
                {totalCountPage}
              </div>
              <div className={styles.userProfileGridArticles}>
                {userArticles.length > 0 && userArticles.map((item) => <NewsCardUser {...item} key={`userArticles-${item.id}`} />)}
                <LoadMore
                  searchRequest={id}
                  loadDataApi={apiGetUserArticles}
                  totalCountPages={totalCountPage}
                  className={styles.userProfileGridLoadBtn}
                />
              </div>
            </>
          )}
        </>
      );
    }
    if (isLoginStatus === false && isUserData.length === 0) {
      return <UserProfileError />;
    }
    return <RenderLoader />;
  };

  return (
    <div className={styles.userProfile}>
      <header className={styles.userProfileHead}>
        <h1 className={styles.userProfileTitle}>Ваш профиль</h1>
        {isLoginStatus && (
          <button
            className={styles.userProfileBtnLogout}
            type="button"
            aria-label="Выход"
            aria-hidden="true"
            onClick={handleLogout}
          />
        )}
      </header>
      { isLoading ? <RenderLoader /> : <Render />}
    </div>
  );
});

export default Profile;
