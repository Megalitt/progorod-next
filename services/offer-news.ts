import { Api } from './endpoints';
import { createAPI } from './api';

const api = createAPI();

export const apiPostOfferNewsValue = async (values) => {
  await api.post(`${Api.API}/add-nodes`, values);
};
