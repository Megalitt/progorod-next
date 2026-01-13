import React from 'react';
import { ErrorCustom } from '../components/error-custom';
import { ProjectLayout } from '../layouts/project-layout';
import { SimpleLayout } from '../layouts/simple-layout';
import { FormNewPassword } from '../components/auth/form-new-password';

type ResetPasswordProps = {
  token: string | boolean;
};

const ResetPassword: React.FC<ResetPasswordProps> = React.memo(({ token }) => {
  const Render = () => {
    if (token) {
      return (
        <SimpleLayout align="left" title="Смена пароля">
          <FormNewPassword token={token} />
        </SimpleLayout>
      );
    }
    return (
      <SimpleLayout title="Доступ запрещен">
        <ErrorCustom />
      </SimpleLayout>
    );
  };

  return (
    <ProjectLayout>
      <Render />
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

export default ResetPassword;
