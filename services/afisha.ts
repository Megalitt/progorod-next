import { Api } from './endpoints';
import { createAPI } from './api';

const api = createAPI();

export const apiGetAfishaItemById = async (id) => {
  try {
    const { data } = await api.get(`${Api.API}${Api.AFISHA_EVENTS}/${id}?filter[state]=published`);
    return data;
  } catch (err) {
    console.log(`afisha - apiGetAfishaItemById - ${err.message}`);
    return {};
  }
};

export const apiGetAfishaByCategory = async (category, page = 1) => {
  try {
    return await api.get(`${Api.API}${Api.AFISHA_EVENTS}?filter[cat_type]=${category}&filter[state]=published&sort=-creation_date&page=${page}&per-page=12`);
  } catch (err) {
    console.log(`afisha - apiGetAfishaByCategory - ${err.message}`);
    return [];
  }
};

export const apiGetAfishaForMainPage = async () => {
  try {
    const { data } = await api.get(`${Api.API}${Api.AFISHA_EVENTS}?sort=-id&filter[state]=published&per-page=5`);
    return data;
  } catch (err) {
    console.log(`afisha - apiGetAfishaForMainPage - ${err.message}`);
    return [];
  }
};

export const apiGetAfishaPerMonth = async (from, till) => {
  try {
    const { data } = await api.get(`${Api.API}${Api.AFISHA_EVENTS}?dateFrom=${from}&dateTo=${till}`);
    return data;
  } catch (err) {
    console.log(`afisha - apiGetAfishaPerMonth - ${err.message}`);
    return [];
  }
};
