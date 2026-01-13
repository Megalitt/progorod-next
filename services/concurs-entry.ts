import { Api } from './endpoints';
import { createAPI } from './api';

const api = createAPI();

export const apiPostConcursEntryValue = async (values) => {
  await api.post(`${Api.API}/cityface-items/create`, values);
};
