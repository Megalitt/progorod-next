import { Api } from './endpoints';
import { createAPI } from './api';

const api = createAPI();

export const apiGetBanner = async (position_key, promo = null) => {
  try {
    // @ts-ignore
    const filterRequest = +promo !== 13 ? '' : '&isImage=1';
    const { data: banners } = await api.get(`${Api.API}${Api.BANNER}?filter[enabled]=1&position_key=${position_key}${filterRequest}`);
    return banners;
  } catch (err) {
    console.log(`banner - apiGetBanner - ${err.message}`);
    return [];
  }
};

export const apiHeadBanner = async (position_key) => {
  try {
    const bannersHeaders = await api.head(`${Api.API}${Api.BANNER}?filter[enabled]=1&position_key=${position_key}`);
    const bannerCountInPosition = parseInt(bannersHeaders?.headers['x-pagination-total-count']);
    return typeof bannerCountInPosition === 'number' ? bannerCountInPosition : 0;
  } catch (err) {
    console.log(`banner - apiHeadBanner - ${err.message}`);
    return [];
  }
};

export const apiPostBannerStat = async (data) => {
  try {
    return await api.post('/bs/sm', data);
  } catch (err) {
    console.log(`banner - apiPostBannerStat - ${err.message}`);
    return [];
  }
};

export const apiPostBannerClickStat = async (id) => {
  try {
    return await api.post(`/bs/c/${id}`);
  } catch (err) {
    console.log(`banner - apiPostBannerClickStat - ${err.message}`);
    return [];
  }
};
