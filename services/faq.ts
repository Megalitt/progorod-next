import { Api } from './endpoints';
import { createAPI } from './api';

const api = createAPI();

export const apiGetThemes = async () => {
  try {
    const { data: themes } = await api.get(`${Api.API}${Api.FAQ_TOPIC}?filter[active]=1`);
    return themes;
  } catch (err) {
    console.log(`faq - apiGetThemes - ${err.message}`);
    return [];
  }
};

export const apiGetThemeById = async (id) => {
  try {
    const { data } = await api.get(`${Api.API}${Api.FAQ_TOPIC}?filter[active]=1&filter[id]=${id}`);
    return data;
  } catch (err) {
    console.log(`faq - getTheme - ${err.message}`);
    return [];
  }
};

export const apiGetExperts = async () => {
  try {
    const { data: experts } = await api.get(`${Api.API}${Api.FAQ_EXPERT}?filter[active]=1`);
    return experts;
  } catch (err) {
    console.log(`faq - apiGetExperts - ${err.message}`);
    return [];
  }
};

export const apiGetExpertById = async (id) => {
  try {
    const { data } = await api.get(`${Api.API}${Api.FAQ_EXPERT}?filter[id]=${id}`);
    return data;
  } catch (err) {
    console.log(`faq - apiGetExpertById - ${err.message}`);
    return [];
  }
};

export const apiGetFaqItemsByExpertId = async (id) => {
  try {
    const { data } = await api.get(`${Api.API}${Api.FAQ_ITEM}?filter[faq_expert_id]=${id}`);
    return data;
  } catch (err) {
    console.log(`faq - apiGetFaqItemsByExpertId - ${err.message}`);
    return [];
  }
};

export const apiGetFaqItemsByTopicId = async (id, page = 1) => {
  try {
    const { data, headers }: any = await api.get(`${Api.API}${Api.FAQ_ITEMS}?filter[faq_topic_id]=${id}&page=${page}&per-page=12`);
    return { data, headers };
  } catch (err) {
    console.log(`faq - apiGetFaqItemsByTopicId - ${err.message}`);
    return [];
  }
};

export const apiGetFaqItemById =  async (id) => {
  try {
    const { data } = await api.get(`${Api.API}${Api.FAQ_ITEMS}/${id}`);
    return data;
  } catch (err) {
    console.log(`faq - apiGetFaqItemById - ${err.message}`);
    return {};
  }
};

export const apiGetFaqSortByTime = async (page = 1) => {
  try {
    const { data, headers }: any = await api.get(`${Api.API}${Api.FAQ_ITEM}?filter[active]=1&sort=-timestamp&page=${page}&per-page=12`);
    return { data, headers };
  } catch (err) {
    console.log(`faq - apiGetFaqSortByTime - ${err.message}`);
    return [];
  }
};

export const apiGetFaqSortByPopular = async (page = 1) => {
  try {
    const { data, headers }: any = await api.get(`${Api.API}${Api.FAQ_ITEM}?filter[active]=1&sort=-views_count&page=${page}&per-page=12`);
    return { data, headers };
  } catch (err) {
    console.log(`faq - apiGetFaqSortByPopular - ${err.message}`);
    return [];
  }
};

export const apiGetFaqCompanies = async () => {
  try {
    const { data } = await api.get(`${Api.API}/faq-companies`);
    return data;
  } catch (err) {
    console.log(`faq - apiGetFaqCompanies - ${err.message}`);
    return [];
  }
};

export const apiGetFaqCompanyById = async (id) => {
  try {
    const { data } = await api.get(`${Api.API}/faq-companies?filter[id]=${id}`);
    return data;
  } catch (err) {
    console.log(`faq - getFaqCompany - ${err.message}`);
    return [];
  }
};

export const apiPostFaqAskQuestionValue = async (values) => {
  await api.post(`${Api.API}${Api.FAQ}/user-question`, values);
};

export const postFaqSpecialistValue = async (values) => {
  await api.post(`${Api.API}${Api.FAQ}/expert-request`, values);
};
