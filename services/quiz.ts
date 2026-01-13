import { Api } from './endpoints';
import { createAPI } from './api';

const api = createAPI();

export const apiGetQuizById = async (id) => {
  try {
    const { data } = await api.get(`${Api.API}${Api.QUIZZES}/${id}?filter[active]=1`);
    return data;
  } catch (err) {
    console.log(`quiz - apiGetQuizById - ${err.message}`);
    return {};
  }
};

export const apiGetQuizResult = async (result) => {
  try {
    const { data } = await api.get(`${Api.API}${Api.QUIZ}/result?id=${result}`);
    return data;
  } catch (err) {
    console.log(`quiz - apiGetQuizResult - ${err.message}`);
    return {};
  }
};
