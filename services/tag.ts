import { Api } from './endpoints';
import { createAPI } from './api';

const api = createAPI();

export const apiGetTags  = async (request) => {
  const { page }:any = request;
  const id = request['tag-id'];
  try {
    return await api.get(`${Api.API}${Api.ARTICLE}${Api.TAG}/${id}?filter[stat]=1&page=${page}&sort=-publish_at&per-page=15`);
  } catch (err) {
    console.log(`tag - apiGetTags - ${err.message}`);
    return [];
  }
};

export const apiGetTagName = async (id) => {
  try {
    const { data: tagName } = await api.get(`${Api.API}${Api.TAG}?filter[alias]=${id}`);
    return tagName;
  } catch (err) {
    console.log(`tag - apiGetTagName - ${err.message}`);
    return [];
  }
};
