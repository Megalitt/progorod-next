import { createAPI } from './api';
import { Api } from './endpoints';

const api = createAPI();

export const apiGetAllNav = async () => {
  try {
    const { data: navList } = await api.get(`${Api.API}${Api.MENU_LIST}?filter[stat]=1`);
    const menuAllArr = [];
    navList.forEach(async (menu) => {
      menuAllArr[`id_${menu.id}`] = [];
      const { data: navItems } = await api.get(`${Api.API}${Api.MENU}?filter[stat]=1&filter[nid]=${menu.id}&sort=rate`);
      await navItems.forEach((menuItem) => {
        if (Array.isArray(menuAllArr[`id_${menu.id}`])) {
          menuAllArr[`id_${menu.id}`].push(menuItem);
        }
      });
    });
    return menuAllArr;
  } catch (err) {
    console.log(`header - apiGetAllNav - ${err.message}`);
    return [];
  }
};

export const apiGetFooterInfo = async (settingName) => {
  try {
    const { data: settings } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=${settingName}`);
    const [value] = settings;
    return value;
  } catch (err) {
    console.log(`footer - apiGetFooterInfo - ${err.message}`);
    return [];
  }
};

export const apiGetYandexMetricaId = async () => {
  try {
    const { data: yandexData } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=yandex-counter-id`);
    return yandexData[0]?.value;
  } catch (err) {
    console.log(`footer - apiGetYandexMetricaId - ${err.message}`);
    return 0;
  }
};

export const apiGetGoogleMetricaId = async () => {
  try {
    const { data: googleData } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=google-tag-counter-id`);
    return googleData[0]?.value;
  } catch (err) {
    console.log(`footer - apiGetGoogleMetricaId - ${err.message}`);
    return 0;
  }
};

export const apiGetMailruMetricaId = async () => {
  try {
    const { data: mailruData } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=mailru-counter-id`);
    return mailruData[0]?.value;
  } catch (err) {
    console.log(`footer - apiGetMailruMetricaId - ${err.message}`);
    return 0;
  }
};

export const apiGetAllNews = async () => {
  try {
    const { data: news } = await api.get(`${Api.API}${Api.ARTICLE}/main`);
    return news;
  } catch (err) {
    console.log(`news - apiGetAllNews - ${err.message}`);
    return [];
  }
};

export const apiGetSuperPromotionNews = async () => {
  try {
    const { data: news } = await api.get(`${Api.API}${Api.ARTICLES}?filter[is_super_promotion]=1&filter[stat]=1&newest=1`);
    return news;
  } catch (err) {
    console.log(`news - apiGetSuperPromotionNews - ${err.message}`);
    return [];
  }
};

export const apiGetSocialList = async () => {
  try {
    const { data: socialList } = await api.get(`${Api.API}${Api.SETTINGS}?filter[stat]=3&filter[type]=var&filter[not][value]=`);
    const { data: activeSocialIcons } = await api.get(`${Api.API}${Api.SETTINGS}?filter[stat]=3&filter[type]=bool&filter[value]=1`);
    
    let socialLinksResult = [];
    
    Array.isArray(socialList) && socialList.forEach((item) => {
      const result = Array.isArray(activeSocialIcons) && activeSocialIcons.filter((activeItem) => {
        if (activeItem.name.indexOf(item.name) !== -1) {
          activeItem.url = item.value;
          activeItem.iconName = item.name;
          activeItem.iconTitle = item.text;
          return true;
        }
        return false;
      });
      socialLinksResult.push(...result);
    });
    return socialLinksResult;
  } catch (err) {
    console.log(`setting - apiGetSocialList - ${err.message}`);
    return [];
  }
};

export const apiGetChatSettings = async (name) => {
  try {
    const { data: setting } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=${name}`);
    return setting[0]?.value;
  } catch (err) {
    console.log(`setting - apiGetChatSettings - ${err.message}`);
    return [];
  }
};

export const apiGetSettingBannerCommArticles = async () => {
  try {
    const { data: setting } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=setting-banner-comm-articles`);
    let result = 0;
    if (Array.isArray(setting)) {
      if ((setting.length === 0)) {
        result = 0;
      } else if ((setting.length > 0) && ('value' in setting[0])) {
        result = +setting[0].value;
      }
    }
    return result;
  } catch (err) {
    console.log(`setting - apiGetSettingBannerCommArticles - ${err.message}`);
    return [];
  }
};

export const apiGetBannerInsteadRelatedArticles = async () => {
  try {
    const { data: setting } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=banner-instead-related-articles`);
    let result = 0;
    if (Array.isArray(setting)) {
      if ((setting.length === 0)) {
        result = 0;
      } else if ((setting.length > 0) && ('value' in setting[0])) {
        result = setting[0].value;
      }
    }
    return result;
  } catch (err) {
    console.log(`setting - apiGetBannerInsteadRelatedArticles - ${err.message}`);
    return 0;
  }
};

export const apiGetMinCharacterArticleForShowBanner = async () => {
  try {
    const { data: setting } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=min_character_article_for_show_banner`);
    let result = 0;
    if (Array.isArray(setting)) {
      if ((setting.length === 0)) {
        result = 0;
      } else if ((setting.length > 0) && ('value' in setting[0])) {
        result = setting[0].value;
      }
    }
    return result;
  } catch (err) {
    console.log(`setting - apiGetMinCharacterArticleForShowBanner - ${err.message}`);
    return 0;
  }
};

export const apiGetCharacterSpacingBannerInArticle = async () => {
  try {
    const { data: setting } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=character_spacing_banner_in_article`);
    let result = 0;
    if (Array.isArray(setting)) {
      if ((setting.length === 0)) {
        result = 0;
      } else if ((setting.length > 0) && ('value' in setting[0])) {
        result = setting[0].value;
      }
    }
    return result;
  } catch (err) {
    console.log(`setting - apiGetCharacterSpacingBannerInArticle - ${err.message}`);
    return 0;
  }
};

export const apiGetPicModerateYear = async () => {
  try {
    const { data: setting } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=picModerateYear`);
    let result = 0;
    if (Array.isArray(setting)) {
      if ((setting.length === 0)) {
        result = 0;
      } else if ((setting.length > 0) && ('value' in setting[0])) {
        result = setting[0].value;
      }
    }
    return result;
  } catch (err) {
    console.log(`setting - apiGetPicModerateYear - ${err.message}`);
    return [];
  }
};

export const apiGetPercentScrollTopForShowBannerFix = async () => {
  try {
    const { data: setting } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=bottom-banner-show-percent-page`);
    return setting[0]?.value;
  } catch (err) {
    console.log(`setting - apiGetPercentScrollTopForShowBannerFix - ${err.message}`);
    return [];
  }
};

export const apiGetMinutesLimitPushBanner = async () => {
  try {
    const { data: setting } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=minutes_limit_push_banner`);
    return setting[0]?.value;
  } catch (err) {
    console.log(`setting - apiGetMinutesLimitPushBanner - ${err.message}`);
    return [];
  }
};

export const getMinutesLimitPushFullBanner = async () => {
  try {
    const { data: setting } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=minutes_limit_full_push_banner`);
    return setting[0]?.value;
  } catch (err) {
    console.log(`setting - getMinutesLimitPushFullBanner - ${err.message}`);
    return [];
  }
};

export const apiGetDelayPushBannerSecond = async () => {
  try {
    const { data: setting } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=push_banner_delay`);
    return setting[0]?.value;
  } catch (err) {
    console.log(`setting - getSecondsPushFullBanner - ${err.message}`);
    return [];
  }
};

export const apiGetDelayPushBannerThird = async () => {
  try {
    const { data: setting } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=delay-push-banner-3`);
    return setting[0]?.value;
  } catch (err) {
    console.log(`setting - apiGetDelayPushBannerThird - ${err.message}`);
    return [];
  }
};

export const apiGetDelayBannerFixSecond = async () => {
  try {
    const { data: setting } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=delay-lower-fixed-2-banner`);
    return setting[0]?.value;
  } catch (err) {
    console.log(`setting - apiGetDelayBannerFixSecond - ${err.message}`);
    return [];
  }
};

export const apiGetRedirects = async (url) => {
  try {
    const { data } = await api.get(`${Api.API}${Api.REDIRECTS}?filter[from]=${encodeURIComponent(url)}`);
    console.info('redirect was executed');
    return data;
  } catch (err) {
    console.info('redirect was not executed');
    return [];
  }
};

export const apiGetPushGravitec = async () => {
  try {
    const { data: script } = await api.get(`${Api.API}${Api.SETTINGS}/head-scripts`);
    return script;
  } catch (err) {
    console.log(`setting - apiGetPushGravitec - ${err.message}`);
    return [];
  }
};

export const apiGetCookiesNotification = async () => {
  try {
    const { data: cookieText } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=cookies`);
    return cookieText.length > 0 ? cookieText[0].value : '';
  } catch (err) {
    console.log(`seo - apiGetCookiesNotification - ${err.message}`);
    return '';
  }
};

export const apiGetDisableRegistration = async () => {
  try {
    const { data: registration } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=disable-registration`);
    return registration.length > 0 ? registration[0].value : 0;
  } catch (err) {
    console.log(`seo - apiGetDisableRegistration - ${err.message}`);
    return 0;
  }
};

export const apiGetAgreementText = async () => {
  try {
    const { data: agreementText } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=agreement`);
    return agreementText.length > 0 ? agreementText[0].value : '';
  } catch (err) {
    console.log(`seo - apiGetAgreementText - ${err.message}`);
    return '';
  }
};

export const apiGetAgeCensor = async () => {
  try {
    const { data: displayAgeCensor } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=display-age-censor`);
    return displayAgeCensor.length > 0 ? +displayAgeCensor[0].value : '';
  } catch (err) {
    console.log(`seo - apiGetAgeCensor - ${err.message}`);
    return '';
  }
};

export const apiGetSuggestNews = async () => {
  try {
    const { data: settingSuggestNews } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=suggest-news`);
    return settingSuggestNews[0]?.value;
  } catch (err) {
    console.log(`setting - apiGetSuggestNews - ${err.message}`);
    return 0;
  }
};

export const apiGetDisableAmpPages = async () => {
  try {
    const { data: disableAmpPages } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=disable-amp-pages`);
    return disableAmpPages[0]?.value;
  } catch (err) {
    console.log(`setting - apiGetDisableAmpPages - ${err.message}`);
    return 0;
  }
};

export const apiGetHideMetric = async () => {
  try {
    const { data: apiGetHideMetric } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=hide-metrics`);
    return apiGetHideMetric[0]?.value;
  } catch (err) {
    console.log(`setting - apiGetHideMetric - ${err.message}`);
    return 0;
  }
};

export const apiGetTitleButtonMenu = async () => {
  try {
    const { data: apiGetTitleButtonMenu } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=title-button-menu`);
    return apiGetTitleButtonMenu[0]?.value;
  } catch (err) {
    console.log(`setting - apiGetTitleButtonMenu - ${err.message}`);
    return 0;
  }
};

export const apiGetServiceFlags = async () => {
  try {
    const { data } = await api.get(`${Api.API}${Api.SETTINGS}?filter[stat]=4`);
    return data;
  } catch (err) {
    console.log(`serviceFlags - apiGetServiceFlags - ${err.message}`);
    return [];
  }
};

export const apiGetLogos = async (settingName) => {
  try {
    const { data: logo } = await api.get(`${Api.API}${Api.SETTINGS}?filter[name]=${settingName}`);
    return logo[0]?.value;
  } catch (err) {
    console.log(`setting - getLogo - ${err.message}`);
    return 0;
  }
};
