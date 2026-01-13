import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const headerSlice = createSlice({
  name: 'header',
  initialState: {
    nav: [],
    subMenu: [],
    modalNavCities: [],
  },
  reducers: {
    setNav: (state, action) => {
      state.nav = action.payload;
    },
    setSubMenu: (state, action) => {
      state.subMenu = action.payload;
    },
    setModalNavCities: (state, action) => {
      state.modalNavCities = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(HYDRATE, (state, action) => {
      // @ts-ignore
      state.nav = action.payload.header.nav;
      // @ts-ignore
      state.subMenu = action.payload.header.subMenu;
      // @ts-ignore
      state.modalNavCities = action.payload.header.modalNavCities;
    }),
});

export const { setNav, setSubMenu, setModalNavCities } = headerSlice.actions;
export default headerSlice.reducer;
