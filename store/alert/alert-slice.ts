import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    alerts: [],
  },
  reducers: {
    setAlerts: (state, action) => {
      state.alerts.push({
        message: action.payload.message ? action.payload.message : action.payload,
        messageType: action.payload.messageType ? action.payload.messageType : 'success',
      });
    },
    delAlert: (state, action) => {
      const newAlerts = state.alerts.filter((item) => {
        item.message !== action.payload.message
      });
      state.alerts = newAlerts;
    },
  },
  extraReducers: (builder) => builder
    .addCase(HYDRATE, (state, action) => {
      // @ts-ignore
      state.alerts = action.payload.alert.alerts;
    }),
});

export const { setAlerts, delAlert } = alertSlice.actions;
export default alertSlice.reducer;
