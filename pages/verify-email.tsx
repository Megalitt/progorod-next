import React from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../components/loader';
import { ErrorCustom } from '../components/error-custom';
import { ProjectLayout } from '../layouts/project-layout';
import { SimpleLayout } from '../layouts/simple-layout';
import { ArticleLayout } from '../layouts/article-layout';

import { getLoginStatus, setLoginStatus } from '../store/login/login-slice';

import { apiPostVerifyEmail } from '../services/auth';

type VerifyEmailProps = {
  token: string | boolean;
};

const VerifyEmail: React.FC<VerifyEmailProps> = React.memo(({ token }) => {
  const [isVerifyError, setVerifyError] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (token) {
      const verifyEmail = async (value) => {
        setLoading(false);
        try {
          await apiPostVerifyEmail(value);
          const { payload }:any = await dispatch(getLoginStatus());
          const { resultCode } = payload;

          if (resultCode) {
            dispatch(setLoginStatus(resultCode));
            setLoading(true);
          }
          setVerifyError(false);
        } catch (err) {
          setVerifyError(true);
          setLoading(true);
          console.log(err);
        }
      };

      verifyEmail(token);
    } else {
      setVerifyError(true);
    }
  }, [token]);

  const RenderLoader = () => (
    <SimpleLayout title="Подтверждение регистрации">
      <Loader />
    </SimpleLayout>
  );

  const Render = () => {
    if (isVerifyError === false && token !== false) {
      return (
        <SimpleLayout title="Подтверждение электронной почты">
          <ArticleLayout>
            <p>Регистрация успешно подтверждена</p>
          </ArticleLayout>
        </SimpleLayout>
      );
    }

    if (isVerifyError && token === false) {
      return (
        <SimpleLayout title="Доступ запрещен">
          <ErrorCustom />
        </SimpleLayout>
      );
    }

    return (
      <SimpleLayout title="400 Bad request">
        <ErrorCustom />
      </SimpleLayout>
    );
  };

  return (
    <ProjectLayout>
      {!isLoading ? <RenderLoader /> : <Render />}
    </ProjectLayout>
  );
});

export const getServerSideProps = async (context) => {
  const { token } = context.query;
  return {
    props: {
      token: token || false,
    },
  };
};

export default VerifyEmail;
