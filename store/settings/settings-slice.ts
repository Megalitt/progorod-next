import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const settingSlice = createSlice({
  name: 'settings',
  initialState: {
    percentScrollTopForShowBannerFix: 5,
    pushBannersLimitMinutes: 180,
    pushBannersFullLimitMinutes: 180,
    pushBannerSecondAfterTime: 40,
    pushBannerThirdAfterTime: 70,
    bannerFixAfterTime: 40,
    cookiesNotification: '',
    disableRegistration: 0,
    agreementText: null,
    displayAgeCensor: 1,
    settingSuggestNews: 1,
    settingHideMetric: 0,
    settingTitleButtonMenu: '',
    logoMain: '',
  },
  reducers: {
    setPercentScrollTopForShowBannerFix: (state, action) => {
      state.percentScrollTopForShowBannerFix = action.payload;
    },
    setPushBannersLimitMinutes: (state, action) => {
      state.pushBannersLimitMinutes = action.payload;
    },
    setPushBannersFullLimitMinutes: (state, action) => {
      state.pushBannersFullLimitMinutes = action.payload;
    },
    setPushBannerSecondAfterTime: (state, action) => {
      state.pushBannerSecondAfterTime = action.payload;
    },
    setPushBannerThirdAfterTime: (state, action) => {
      state.pushBannerThirdAfterTime = action.payload;
    },
    setBannerFixAfterTime: (state, action) => {
      state.bannerFixAfterTime = action.payload;
    },
    setCookiesNotification: (state, action) => {
      state.cookiesNotification = action.payload;
    },
    setDisableRegistration: (state, action) => {
      state.disableRegistration = action.payload;
    },
    setAgreementText: (state, action) => {
      state.agreementText = action.payload;
    },
    setAgeCensor: (state, action) => {
      state.displayAgeCensor = action.payload;
    },
    setSuggestNews: (state, action) => {
      state.settingSuggestNews = action.payload;
    },
    setHideMetric: (state, action) => {
      state.settingHideMetric = action.payload;
    },
    setTitleButtonMenu: (state, action) => {
      state.settingTitleButtonMenu = action.payload;
    },
    setLogoMain: (state, action) => {
      state.logoMain = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(HYDRATE, (state, action) => {
      // @ts-ignore
      state.percentScrollTopForShowBannerFix = action.payload.settings.percentScrollTopForShowBannerFix;
      // @ts-ignore
      state.pushBannersLimitMinutes = action.payload.settings.pushBannersLimitMinutes;
      // @ts-ignore
      state.pushBannersFullLimitMinutes = action.payload.settings.pushBannersFullLimitMinutes;
      // @ts-ignore
      state.pushBannerSecondAfterTime = action.payload.settings.pushBannerSecondAfterTime;
      // @ts-ignore
      state.pushBannerThirdAfterTime = action.payload.settings.pushBannerThirdAfterTime;
      // @ts-ignore
      state.bannerFixAfterTime = action.payload.settings.bannerFixAfterTime;
      // @ts-ignore
      state.cookiesNotification = action.payload.settings.cookiesNotification;
      // @ts-ignore
      state.disableRegistration = action.payload.settings.disableRegistration;
      // @ts-ignore
      state.agreementText = action.payload.settings.agreementText;
      // @ts-ignore
      state.displayAgeCensor = action.payload.settings.displayAgeCensor;
      // @ts-ignore
      state.settingSuggestNews = action.payload.settings.settingSuggestNews;
      // @ts-ignore
      state.settingHideMetric = action.payload.settings.settingHideMetric;
      // @ts-ignore
      state.settingTitleButtonMenu = action.payload.settings.settingTitleButtonMenu;
      // @ts-ignore
      state.logoMain = action.payload.settings.logoMain;
    }),
});

export const {
  setPercentScrollTopForShowBannerFix,
  setPushBannersLimitMinutes,
  setPushBannersFullLimitMinutes,
  setPushBannerSecondAfterTime,
  setPushBannerThirdAfterTime,
  setBannerFixAfterTime,
  setCookiesNotification,
  setDisableRegistration,
  setAgreementText,
  setAgeCensor,
  setSuggestNews,
  setHideMetric,
	setTitleButtonMenu,
  setLogoMain,
} = settingSlice.actions;
export default settingSlice.reducer;
