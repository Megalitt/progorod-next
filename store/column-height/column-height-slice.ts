import { createSlice } from '@reduxjs/toolkit';

export const columnHeightSlice = createSlice({
  name: 'columnHeight',
  initialState: {
    colCentralHeight: null,
  },
  reducers: {
    setColCenterHeight: (state, action) => {
      state.colCentralHeight = action.payload;
    },
  },
});

export const { setColCenterHeight } = columnHeightSlice.actions;
export default columnHeightSlice.reducer;
