import { Api } from './endpoints';
import { createAPI } from './api';

const api = createAPI();

export const apiGetRubricCards = async (request) => {
  const { rubric, page }:any = request;
  try {
    const data = await api.get(`${Api.API}${Api.ARTICLE}?filter[rubric]=${encodeURIComponent(rubric)}&filter[stat]=1&page=${page}&sort=-publish_at&per-page=15`);
    if (data && data.data.length === 0) {
      const errorMessage: any = { statusCode: 404, message: 'data is not found' };
      throw errorMessage;
    }
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const apiGetRubricCardsAll = async (page = 1) => {
  try {
    const data = await api.get(`${Api.API}${Api.ARTICLE}?filter[stat]=1&page=${page}&sort=-publish_at&per-page=15`);
    if (data && data.data.length === 0) {
      const errorMessage: any = { statusCode: 404, message: 'data is not found' };
      throw errorMessage;
    }
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const apiGetStaticNews = async (newsTitle) => {
  try {
    const { data: news } = await api.get(`${Api.API}${Api.STATIC_PAGES}/${encodeURIComponent(newsTitle)}`);
    return news;
  } catch (err) {
    console.log(`rubric - apiGetStaticNews - ${err.message}`);
    return [];
  }
};

export const apiGetStaticReviewNews = async (newsTitle, page = 1) => {
  try {
    const data = await api.get(`${Api.API}${Api.STATIC_PAGES}?sort=-id&filter[rubric_key]=${encodeURIComponent(newsTitle)}&filter[stat]=1&per-page=12&page=${page}`);
    if (data && data.data.length === 0) {
      const errorMessage: any = { statusCode: 404, message: 'data is not found' };
      throw errorMessage;
    }
    return data;
  } catch (err) {
    console.log(`rubric - apiGetStaticReviewNews - ${err.message}`);
    return [];
  }
};

export const apiGetRubricDescription = async (rubric) => {
  try {
    const { data: description } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=${rubric}`);
    return description;
  } catch (err) {
    console.log(`rubric - apiGetRubricDescription - ${err.message}`);
    return [];
  }
};
