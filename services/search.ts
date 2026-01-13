import { Api } from './endpoints';
import { createAPI } from './api';

const api = createAPI();

export const apiGetSearchResult = async (searchRequest, pageCounter = 1, perPage = 5) => {
  try {
    const searchRequestValue = searchRequest.searchRequest
      ? searchRequest.searchRequest : searchRequest;
    return await api.get(`${Api.API}/search?q=${encodeURI(searchRequestValue)}&per-page=${perPage}&page=${pageCounter}`);
  } catch (err) {
    console.log(`search - apiGetSearchResult - ${err.message}`);
  }
  return [];
};

export const apiGetSearchComplaintsResult = async (searchRequest, pageCounter = 1) => {
  try {
    const category = searchRequest.category ? searchRequest.category : 0;
    const { dataFrom, dataTo } = searchRequest;
    if (dataFrom || dataTo) {
      return await api.get(`${Api.API}/people-control-complaints?filter[enabled]=1&sort=-date&filter[category_id]=${category}&dateFrom=${dataFrom}&dateTo=${dataTo}&per-page=12&page=${pageCounter}`);
    }
    if (category) {
      return await api.get(`${Api.API}/people-control-complaints?filter[enabled]=1&sort=-date&filter[category_id]=${category}&per-page=12&page=${pageCounter}`);
    }
    return await api.get(`${Api.API}/people-control-complaints?filter[enabled]=1&sort=-date&per-page=12&page=${pageCounter}`);
  } catch (err) {
    console.log(`search - apiGetSearchComplaintsResult - ${err.message}`);
  }
  return [];
};

export const apiGetCategoriesComplaints = async () => {
  try {
    return await api.get(`${Api.API}/people-control-category`);
  } catch (err) {
    console.log(`search - apiGetCategoriesComplaints - ${err.message}`);
    return [];
  }
};
