import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetLoginStatusActual, apiGetLogoutActual } from '../../services/auth';

export const getLoginStatus = createAsyncThunk('loginSlice/getLoginStatus', async () => apiGetLoginStatusActual());
export const getLogout = createAsyncThunk('loginSlice/getLogout', async () => apiGetLogoutActual());

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: {
    loginStatus: null,
    loginShowModal: null,
    loginUserData: [],
    showModaltype: '',
    status: null,
    closeLoginAnimated: false,
  },
  reducers: {
    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
    },
    setLoginShowModal: (state, action) => {
      state.loginShowModal = action.payload;
    },
    setLoginCloseModalAnimated: (state, action) => {
      state.closeLoginAnimated = action.payload;
    },
    setShowModalType: (state, action) => {
      state.showModaltype = action.payload;
    },
  },
  extraReducers: {
    // @ts-ignore
    [getLoginStatus.fulfilled]: (state, { payload }) => {
      const { resultCode } = payload;
      state.loginUserData = resultCode ? payload : [];
    },
    // @ts-ignore
    [getLogout.fulfilled]: (state) => {
      state.loginUserData = [];
      state.loginStatus = false;
    },
  },
});

export const {
  setLoginStatus,
  setLoginShowModal,
  setShowModalType,
  setLoginCloseModalAnimated,
} = loginSlice.actions;
export default loginSlice.reducer;
