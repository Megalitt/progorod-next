import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const seoSlice = createSlice({
  name: 'seo',
  initialState: {
    seoParameters: {},
    mainSeoParameters: {},
    domain: '',
    whiteDomainList: [],
    isMobile: false,
  },
  reducers: {
    setIsMobileFlag: (state, action) => {
      state.isMobile = action.payload;
    },
    setSeoParameters: (state, action) => {
      state.seoParameters = action.payload;
    },
    setMainSeoParameters: (state, action) => {
      state.mainSeoParameters = action.payload;
    },
    setDomain: (state, action) => {
      state.domain = action.payload;
    },
    setWhiteDomainList: (state, action) => {
      state.whiteDomainList = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(HYDRATE, (state, action) => {
      // @ts-ignore
      state.seoParameters = action.payload.seo.seoParameters;
      // @ts-ignore
      state.mainSeoParameters = action.payload.seo.mainSeoParameters;
      // @ts-ignore
      state.domain = action.payload.seo.domain;      
      // @ts-ignore
      state.whiteDomainList = action.payload.seo.whiteDomainList;
      // @ts-ignore
      state.isMobile = action.payload.seo.isMobile;
    }),
});

export const {
  setSeoParameters,
  setMainSeoParameters,
  setDomain,
  setWhiteDomainList,
  setIsMobileFlag,
} = seoSlice.actions;
export default seoSlice.reducer;
