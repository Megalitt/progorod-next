import { Api } from './endpoints';
import { createAPI } from './api';

const api = createAPI();

export const apiGetOffers = async (id) => {
  try {
    const offers = await api.get(`${Api.API}${Api.OFFERS}/${id}`);
    return offers;
  } catch (err) {
    console.log(`apiGetOffers - ${err.message}`);
    return null;
  }
};
