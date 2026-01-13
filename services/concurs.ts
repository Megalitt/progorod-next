import { Api } from './endpoints';
import { createAPI } from './api';

const api = createAPI();

export const apiGetPhotoConcurs = async (pageCounter = 1) => {
  try {
    return await api.get(`${Api.API}${Api.CITYFACES}?page=${pageCounter}&per-page=12&sort=-date&filter[enabled]=1`);
  } catch (err) {
    console.log(`сoncurs - apiGetPhotoConcurs - ${err.message}`);
    return [];
  }
};

export const apiGetPhotoConcursItem = async (id) => {
  try {
    return await api.get(`${Api.API}${Api.CITYFACES}/item/${id}`);
  } catch (err) {
    console.log(`сoncurs - apiGetPhotoConcursItem - ${err.message}`);
    return [];
  }
};

export const apiGetPhotoConcursCurrent = async (id) => {
  try {
    const { data: concurs } = await api.get(`${Api.API}${Api.CITYFACES}/${id}`);
    return concurs;
  } catch (err) {
    console.log(`сoncurs - apiGetPhotoConcursCurrent - ${err.message}`);
    return [];
  }
};

export const apiGetPhotoConcursVotes = async (id) => {
  try {
    const { data: votes } = await api.get(`${Api.API}/cityfaces/votes/${id}`);
    return votes;
  } catch (err) {
    console.log(`сoncurs - apiGetPhotoConcursVotes - ${err.message}`);
    return [];
  }
};

export const apiPostVote = async (id, reCaptcha) => {
  return api.post(`${Api.API}/voting/vote`, {
    option_id: id,
    reCaptcha,
  }, {
    headers: {
      withCredentials: 'true',
    },
  });
};

export const apiPostDisVote = async (id: string | number, reCaptcha: string | null | undefined) => {
  const body: {
    option_id: string | number;
    reCaptcha?: string
  } = {
    option_id: id
  };

  // Добавляем reCaptcha в тело запроса только если оно не null
  if (reCaptcha !== null && reCaptcha !== undefined) {
    body.reCaptcha = reCaptcha;
  }

  return api.post(`${Api.API}/voting/unvote`, body, {
    headers: {
      withCredentials: 'true',
    },
  });
};

export const apiGetMyVoteInfo = async (id) => {
  try {
    const { data: concurs } = await api.get(`${Api.API}/voting/my-vote/${id}`);
    return concurs;
  } catch (err) {
    console.log(`сoncurs - getMyVote - ${err.message}`);
    return [];
  }
};
