import { Api } from './endpoints';
import { createAPI } from './api';

const api = createAPI();

export const apiGetNewsPapers = async (date) => {
  try {
    const dateNow = new Date();
    const dateRequest = date ? `/?publish_at=${date}` : `/?publish_at=0-${dateNow.getFullYear()}`;
    return await api.get(`${Api.API}${Api.PDF}${dateRequest}`);
  } catch (err) {
    console.log(`newspaper - apiGetNewsPapers - ${err.message}`);
    return [];
  }
};

export const apiGetFisrtReliseYear = async () => {
  try {
    const { data: newspaper } = await api.get(`${Api.API}${Api.PDF}?per-page=1`);
    const getYear = Array.isArray(newspaper) && newspaper.length > 0 ? new Date(+newspaper[0].date * 1000).getFullYear() : '';
    return getYear;
  } catch (err) {
    console.log(`newspaper - apiGetFisrtReliseYear - ${err.message}`);
    return [];
  }
};

export const apiGetFilePdfSize = async (url) => {
  try {
    const { headers }: any = await api.head(`${Api.BASE_URL_WITHOUT_LAST_SLASH}${url}`);
    return headers;
  } catch (err) {
    console.log(`newspaper - apiGetFilePdfSize - ${err.message}`);
    return null;
  }
};
