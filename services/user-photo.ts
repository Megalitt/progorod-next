import { Api } from './endpoints';
import { createAPI } from './api';

const api = createAPI();

export const apiPutUserPhoto = async (values) => {
  try {
    return await api.put(`${Api.API}/profile/update-photo`, values);
  } catch (err) {
    console.log(`header - apiPutUserPhoto - ${err.message}`);
    return null;
  }
};
