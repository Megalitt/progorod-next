import { createSlice } from '@reduxjs/toolkit';

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    commentsCounts: null,
    commentsPerPage: -1,
    newCommentData: {},
    nickname: 'Аноним',
    mainInputDisabled: false,
    commentsMode: 0,
    isFormAnswerSend: false,
  },
  reducers: {
    setNewCommentData: (state, action) => {
      state.newCommentData = action.payload;
    },
    setNickname: (state, action) => {
      state.nickname = action.payload;
    },
    setCommentsCounts: (state, action) => {
      state.commentsCounts = action.payload;
    },
    setMainInputDisabled: (state, action) => {
      state.mainInputDisabled = action.payload;
    },
    setFormAnswerSend: (state, action) => {
      state.isFormAnswerSend = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setCommentsPerPage: (state, action) => {
      state.commentsPerPage = action.payload;
    },
    setCommentsMode: (state, action) => {
      state.commentsMode = action.payload;
    },
  },
});

export const {
  setNewCommentData,
  setNickname,
  setCommentsCounts,
  setMainInputDisabled,
  setFormAnswerSend,
  setComments,
  setCommentsPerPage,
  setCommentsMode,
} = commentsSlice.actions;
export default commentsSlice.reducer;
