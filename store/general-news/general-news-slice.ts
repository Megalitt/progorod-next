import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const generalNewsSlice = createSlice({
  name: 'generalNews',
  initialState: {
    allNews: [],
    mainNews: [],
    commented: [],
    daily: [],
    dailyComm: [],
    lastNews: [],
    lastNewsComm: [],
    popularNews: [],
    popularNewsComm: [],
    promotionNews: [],
    promotionNewsComm: [],
    promotionNewsDaily: [],
    promotionNewsComm2: [],
    promotionNewsComm3: [],
    promotionNewsComm4: [],
    centralNews: [],
    centralComm1: [],
    centralComm2: [],
    centralComm3: [],
    centralComm4: [],
    centralComm5: [],
  },
  reducers: {
    setAllNewsComm: (state, action) => {
      state.allNews = action.payload;
    },
    setMainNews: (state, action) => {
      state.mainNews = action.payload;
    },
    setCommented: (state, action) => {
      state.commented = action.payload;
    },

    setDaily: (state, action) => {
      state.daily = action.payload;
    },
    setDailyComm: (state, action) => {
      state.dailyComm = action.payload;
    },

    setLastNews: (state, action) => {
      state.lastNews = action.payload;
    },
    setLastNewsComm: (state, action) => {
      state.lastNewsComm = action.payload;
    },

    setPopularNews: (state, action) => {
      state.popularNews = action.payload;
    },
    setPopularNewsComm: (state, action) => {
      state.popularNewsComm = action.payload;
    },

    setPromotionNews: (state, action) => {
      state.promotionNews = action.payload;
    },
    setPromotionNewsComm: (state, action) => {
      state.promotionNewsComm = action.payload;
    },
    setPromotionNewsDaily: (state, action) => {
      state.promotionNewsDaily = action.payload;
    },
    setPromotionNewsComm2: (state, action) => {
      state.promotionNewsComm2 = action.payload;
    },
    setPromotionNewsComm3: (state, action) => {
      state.promotionNewsComm3 = action.payload;
    },
    setPromotionNewsComm4: (state, action) => {
      state.promotionNewsComm4 = action.payload;
    },
    setCentralNews: (state, action) => {
      state.centralNews = action.payload;
    },
    setCentralNewsComm1: (state, action) => {
      state.centralComm1 = action.payload;
    },
    setCentralNewsComm2: (state, action) => {
      state.centralComm2 = action.payload;
    },
    setCentralNewsComm3: (state, action) => {
      state.centralComm3 = action.payload;
    },
    setCentralNewsComm4: (state, action) => {
      state.centralComm4 = action.payload;
    },
    setCentralNewsComm5: (state, action) => {
      state.centralComm5 = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(HYDRATE, (state, action) => {
      // @ts-ignore
      state.mainNews = action.payload.generalNews.mainNews;
      // @ts-ignore
      state.commented = action.payload.generalNews.commented;
      // @ts-ignore
      state.daily = action.payload.generalNews.daily;
      // @ts-ignore
      state.lastNews = action.payload.generalNews.lastNews;
      // @ts-ignore
      state.popularNews = action.payload.generalNews.popularNews;
      // @ts-ignore
      state.promotionNews = action.payload.generalNews.promotionNews;
      // @ts-ignore
      state.centralNews = action.payload.generalNews.centralNews;
      // @ts-ignore
      state.allNews = action.payload.generalNews.allNews;
    }),
});

export const {
  setAllNewsComm,
  setMainNews,
  setCommented,
  setDaily,
  setDailyComm,
  setLastNews,
  setLastNewsComm,
  setPopularNews,
  setPopularNewsComm,
  setPromotionNews,
  setPromotionNewsDaily,
  setPromotionNewsComm,
  setPromotionNewsComm2,
  setPromotionNewsComm3,
  setPromotionNewsComm4,
  setCentralNews,
  setCentralNewsComm1,
  setCentralNewsComm2,
  setCentralNewsComm3,
  setCentralNewsComm4,
  setCentralNewsComm5,
} = generalNewsSlice.actions;
export default generalNewsSlice.reducer;
