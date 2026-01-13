import { Api } from './endpoints';
import { createAPI } from './api';

const api = createAPI();

export const apiGetSeoSettingsMain = async (settingName) => {
  try {
    const { data: seo } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=${settingName}`);
    const [value] = seo;
    return value;
  } catch (err) {
    console.log(`seo - apiGetSeoSettingsMain - ${err.message}`);
    return {};
  }
};

export const apiGetSeoModuleSettings = async (url) => {
  try {
    const { data: seo } = await api.get(`${Api.API}${Api.SEO}/${url}`);
    return seo;
  } catch (err) {
    console.log(`seo - apiGetSeoModuleSettings - ${err.message}`);
    return {};
  }
};

export const apiGetDomain = async () => {
  try {
    const { data: domain } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=mdomain`);
    return domain.length > 0 ? domain[0].value : '';
  } catch (err) {
    console.log(`seo - apiGetDomain - ${err.message}`);
    return '';
  }
};

export const apiGetDomainsWhiteList = async () => {
  try {
    const { data: domain } = await api.get(`${Api.API}${Api.SETTINGS_DOMAINS_WHITE}`);
    return domain;
  } catch (err) {
    console.log(`seo - apiGetDomainsWhiteList - ${err.message}`);
    return '';
  }
};
