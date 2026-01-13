import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const footerSlice = createSlice({
  name: 'footer',
  initialState: {
    cities: [],
    nav: [],
    info: {},
    yandexId: 0,
    googleId: 0,
    mailruId: 0,
  },
  reducers: {
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setFooterNav: (state, action) => {
      state.nav = action.payload;
    },
    setFooterInfo: (state, action) => {
      state.info = action.payload;
    },
    setYandexId: (state, action) => {
      state.yandexId = action.payload;
    },
    setGoogleId: (state, action) => {
      state.googleId = action.payload;
    },
    setMailruId: (state, action) => {
      state.mailruId = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(HYDRATE, (state, action) => {
      // @ts-ignore
      state.cities = action.payload.footer.cities;
      // @ts-ignore
      state.nav = action.payload.footer.nav;
      // @ts-ignore
      state.info = action.payload.footer.info;
      // @ts-ignore
      state.yandexId = action.payload.footer.yandexId;
      // @ts-ignore
      state.googleId = action.payload.footer.googleId;
      // @ts-ignore
      state.mailruId = action.payload.footer.mailruId;
    }),
});

export const {
  setCities,
  setFooterNav,
  setFooterInfo,
  setYandexId,
  setGoogleId,
  setMailruId,
} = footerSlice.actions;
export default footerSlice.reducer;
