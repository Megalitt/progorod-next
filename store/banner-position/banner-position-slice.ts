import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const bannerPosition = createSlice({
  name: 'bannerPosition',
  initialState: {
    bannersCountInPosition: {
      bannerTop: 0,
      bannerFix: 0,
      bannerCentral: 0,
      bannerRight: 0,
      bannerMainRight: 0,
      bannerPush: 0,
      bannerPushFull: 0,
      bannerPartners: 0,
      bannerAmpTop: 0,
      bannerAmpMiddle: 0,
      bannerAmpBottom: 0,
      bannerInnerArticle: 0,
      bannerMediametrika: 0,
      bannerInServices: 0,
      bannerPuls: 0,
      bannerInnerArticleTop: 0,
      bannerInnerArticleAfterTags: 0,
      bannerInsteadRelatedArticles: 0,
      bannerinsteadMainImageArticles: 0,
      bannerPushFullSecond: 0,
    },
  },
  reducers: {
    setBannersCountInPosition: (state, action) => {
      state.bannersCountInPosition = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(HYDRATE, (state, action) => {
      // @ts-ignore
      state.bannersCountInPosition = action.payload.banners.bannersCountInPosition;
    }),
});

export const {
  setBannersCountInPosition,
} = bannerPosition.actions;
export default bannerPosition.reducer;
