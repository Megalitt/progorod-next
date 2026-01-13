import { Api } from './endpoints';
import { createAPI } from './api';

const api = createAPI();

export const apiPostLogin = async (values) => {
  const { username, password } = values;
  return api.post(`${Api.API}/auth`, {
    username,
    password,
  }, {
    headers: {
      withCredentials: 'true',
    },
  });
};

export const apiGetLoginStatusActual = async () => {
  try {
    const { data } = await api.get(`${Api.API}/auth/status`);
    return data;
  } catch (err) {
    console.log(`login - apiGetLoginStatusActual - ${err.message}`);
    return [];
  }
};

export const apiGetLogoutActual = async () => {
  await api.get(`${Api.API}/auth/logout`);
};

export const apiPostLoginRegistration = async (values) => {
  try {
    const {
      email,
      username,
      nick,
      password,
    } = values;
    const { data } = await api.post(`${Api.API}/auth/signup`, {
      email,
      username,
      nick,
      password,
    });
    return data;
  } catch (err) {
    console.log(`post - login - apiPostLoginRegistration - ${err.message}`);
    return [];
  }
};

export const apiPostVerifyEmail = async (token) => {
  await api.post(`${Api.API}/auth/verify-email?token=${token}`);
};

export const apiPostResetPassword = async (token, values) => {
  const { password } = values;
  await api.post(`${Api.API}/auth/reset-password?token=${token}`, { token, password });
};

export const apiPostRecoveryPassword = async (values) => {
  const { email } = values;
  return api.post(`${Api.API}/auth/request-password-reset`, {
    email,
  });
};
