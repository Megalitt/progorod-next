import { Api } from './endpoints';
import { createAPI } from './api';

const api = createAPI();

export const apiGetArticle = async (id, rubric) => {
  try {
    const { data: article, status: statusCode } = await api.get(`${Api.API}${Api.ARTICLES}/${encodeURIComponent(id)}?rubric=${rubric}`);
    return { article, statusCode };
  } catch (err) {
    console.log(`article - apiGetArticle - ${err.message}`);
    return {
      err,
      statusCode: err.response.status,
    };
  }
};

export const getNextArticleNew = async (articlesId) => {
  try {
    const { data: article, status: statusCode } = await api.get(`${Api.API}${Api.ARTICLE}${Api.NEXT_ARTICLE}/${articlesId}`);
    return { article, statusCode };
  } catch (err) {
    console.log(`article - getNextArticleNew - ${err.message}`);
    return {
      err,
      // statusCode: err.response.status,
    };
  }
};

export const getArticleVoteResult = async (id, reCaptcha) => {
  try {
    const { data } = await api.post(`${Api.API}/voting/vote`, {
      option_id: id,
      reCaptcha,
    });
    return {
      options: data.options,
    };
  } catch (err) {
    console.log(`post - article - getArticleVoteResult - ${err.message}`);
    return [];
  }
};

export const getPinnedNews = async () => {
  try {
    const { data: article } = await api.get(`${Api.API}${Api.ARTICLES}?pinned=1`);
    return article;
  } catch (err) {
    console.log(`article - getPinnedNews - ${err.message}`);
    return [];
  }
};

export const getArticleTags = async (id) => {
  try {
    const { data: tags } = await api.get(`${Api.API}${Api.ARTICLE}/tags/${id}`);
    return tags;
  } catch (err) {
    console.log(`article - getArticleTags - ${err.message}`);
    return [];
  }
};

export const getShortUrl = async (shortName) => {
  try {
    const { data } = await api.get(`${Api.API}/shorturl?filter[name]=${encodeURIComponent(shortName)}`);
    return data;
  } catch (err) {
    console.log(`article - getShortUrl - ${err.message}`);
    return [];
  }
};

export const getArticleCaption = async () => {
  try {
    const { data: value } = await api.get(`${Api.API}/settings?filter[name]=articles-caption`);
    return value;
  } catch (err) {
    console.log(`article - getArticleCaption - ${err.message}`);
    return [];
  }
};
