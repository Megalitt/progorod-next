import { Api } from './endpoints';
import { createAPI } from './api';

const api = createAPI();

export const apiGetArticle = async (id) => {
  try {
    const { data: article } = await api.get(`${Api.API}${Api.ARTICLES}/${id}?rubric=amp`);
    return article;
  } catch (err) {
    console.log(`amp - apiGetArticle - ${err.message}`);
    return {
      err,
      statusCode: err.response.status,
    };
  }
};

export const apiGetArticleRubricNameById = async (id) => {
  try {
    const { data: article } = await api.get(`${Api.API}${Api.ARTICLES}/${id}?rubric=amp`);
    return article.rubric;
  } catch (err) {
    console.log(`amp - apiGetArticleRubricNameById - ${err.message}`);
    return [];
  }
};

export const apiGetAmpCounters = async () => {
  try {
    const { data: counters } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=amp-counters`);
    return counters;
  } catch (err) {
    console.log(`amp - apiGetAmpCounters - ${err.message}`);
    return [];
  }
};
