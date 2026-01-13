import { Api } from './endpoints';
import { createAPI } from './api';

const api = createAPI();

export const apiGetArticles = async (id, page = 1) => {
  try {
    return await api.get(`${Api.API}${Api.ARTICLE}?filter[uid]=${id}&filter[stat]=1&sort=-publish_at&page=${page}&per-page=15`);
  } catch (err) {
    console.log(`redactor - apiGetArticles - ${err.message}`);
    return [];
  }
};

export const apiGetUserArticles = async (id, page = 1) => {
  try {
    return await api.get(`${Api.API}${Api.ARTICLE}?filter[uid]=${id}&filter[stat]=1&page=${page}&per-page=4`);
  } catch (err) {
    console.log(`redactor - apiGetUserArticles - ${err.message}`);
    return [];
  }
};

export const apiGetRedactorUserData = async (redactorId) => {
  try {
    const { data: redactorUserData } = await api.get(`${Api.API}${Api.USERS}/${redactorId}`);
    return redactorUserData;
  } catch (err) {
    console.log(`redactor - apiGetRedactorUserData - ${err.message}`);
    return {
      statusCode: err.response.status,
    };
  }
};
