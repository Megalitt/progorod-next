import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import headerReducer from './header/header-slice';
import socialReducer from './social/social-slice';
import loginReducer from './login/login-slice';
import footerReducer from './footer/footer-slice';
import alertReducer from './alert/alert-slice';
import generalNewsReducer from './general-news/general-news-slice';
import seoReducer from './seo/seo-slice';
import columnHeightReducer from './column-height/column-height-slice';
import commentsReducer from './comments/comments-slice';
import settingReducer from './settings/settings-slice';
import bannerPositionReducer from './banner-position/banner-position-slice';

const rootReducer = combineReducers({
  header: headerReducer,
  social: socialReducer,
  login: loginReducer,
  footer: footerReducer,
  alert: alertReducer,
  generalNews: generalNewsReducer,
  seo: seoReducer,
  columnHeight: columnHeightReducer,
  comments: commentsReducer,
  settings: settingReducer,
  banners: bannerPositionReducer,
});

const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  return store;
};

export const wrapper = createWrapper(makeStore);
