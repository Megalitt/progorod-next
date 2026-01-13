import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const socialSlice = createSlice({
  name: 'social',
  initialState: {
    links: [],
  },
  reducers: {
    setSocialLinks: (state, action) => {
      state.links = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(HYDRATE, (state, action) => {
      // @ts-ignore
      state.links = action.payload.social.links;
    }),
});

export const { setSocialLinks } = socialSlice.actions;
export default socialSlice.reducer;
