import { Api } from './endpoints';
import { createAPI } from './api';

const api = createAPI();

export const apiGetCommentsActual = async (page = 1, pageId, link) => {
  try {
    const { data: comments, headers } = await api.get(`${Api.API}${Api.COMMENT}/${link}/${pageId}?page=${page}&per-page=10&sort=-data`);
    return {
      totalCount: headers['x-pagination-total-count'],
      perPage: headers['x-pagination-page-count'],
      comments,
    };
  } catch (err) {
    console.log(`comments - apiGetCommentsActual - ${err.message}`);
    return {
      perPage: 0,
      totalCount: 0,
      comments: [],
    };
  }
};

export const apiPostComments = async (data) => {
  try {
    const { data: comments } = await api.post(
      `${Api.API}${Api.COMMENTS}`,
      data,
      // @ts-ignore
      { headers: new Headers({ 'Content-Type': 'application/json' }) },
    );
    return comments;
  } catch (err) {
    console.log(`post - comments - apiPostComments - ${err.message}`);
    return [];
  }
};

export const apiPostLike = async (data) => {
  try {
    const { data: comments } = await api.post(
      `${Api.API}${Api.LIKES}${Api.LIKE}`,
      data,
      // @ts-ignore
      { headers: new Headers({ 'Content-Type': 'application/json' }) },
    );
    return comments;
  } catch (err) {
    console.log(`post - comments - apiPostLike - ${err.message}`);
    return [];
  }
};

export const apiPostDislike = async (data) => {
  try {
    const { data: comments } = await api.post(
      `${Api.API}${Api.LIKES}${Api.DISLIKE}`,
      data,
      // @ts-ignore
      { headers: new Headers({ 'Content-Type': 'application/json' }) },
    );
    return comments;
  } catch (err) {
    console.log(`post - comments - apiPostDislike - ${err.message}`);
    return [];
  }
};
