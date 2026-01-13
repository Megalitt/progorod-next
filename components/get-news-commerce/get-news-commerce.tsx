import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCentralNewsComm1,
  setCentralNewsComm2,
  setCentralNewsComm3,
  setCentralNewsComm4,
  setCentralNewsComm5,
  setDailyComm,
  setLastNewsComm,
  setPopularNewsComm,
  setPromotionNewsComm,
  setPromotionNewsComm2,
  setPromotionNewsComm3,
  setPromotionNewsComm4,
  setPromotionNewsDaily,
} from '../../store/general-news/general-news-slice';
import { changeOrderInArray } from '../../utils/banners/change-order-in-array';
import { getOnlySelectedKeys } from '../../utils/get-only-selected-keys';
import { ArtilcesInCentralColumn, NewsCommerce } from '../../utils/consts';
import { lastNewsSelector } from '../../store/general-news/general-news-selectors';
import { getDailyNews } from '../../utils/time/get-daily-news';
import { apiGetAllNews } from '../../services/services';

const GetNewsCommerce = () => {
  const dispatch = useDispatch();
  const newsLast = useSelector(lastNewsSelector);

  useEffect(() => {
    const handleGetNews = async () => {
      const news = await apiGetAllNews();

      const is_dailynews_comm = 'is_dailynews_comm' in news && Array.isArray(news.is_dailynews_comm) ? news.is_dailynews_comm.slice(0, 10) : [];
      const most_viewed_comm = 'most_viewed_comm' in news && Array.isArray(news.most_viewed_comm) ? news.most_viewed_comm.slice(0, 20) : [];
      const left_bar_comm = 'left_bar_comm' in news && Array.isArray(news.left_bar_comm) ? news.left_bar_comm.slice(0, 18) : [];
      const right_bar_comm = 'left_bar' in news && Array.isArray(news.right_bar_comm) ? news.right_bar_comm.slice(0, 15) : [];
      const right_bar_comm2 = 'right_bar_comm2' in news && Array.isArray(news.right_bar_comm2) ? news.right_bar_comm2.slice(0, 15) : [];
      const right_bar_comm3 = 'right_bar_comm3' in news && Array.isArray(news.right_bar_comm3) ? news.right_bar_comm3.slice(0, 15) : [];
      const right_bar_comm4 = 'right_bar_comm4' in news && Array.isArray(news.right_bar_comm4) ? news.right_bar_comm4.slice(0, 15) : [];
      const main_central_comm1 = 'main_central_comm1' in news && Array.isArray(news.main_central_comm1) ? news.main_central_comm1.slice(0, 15) : [];
      const main_central_comm2 = 'main_central_comm2' in news && Array.isArray(news.main_central_comm2) ? news.main_central_comm2.slice(0, 15) : [];
      const main_central_comm3 = 'main_central_comm3' in news && Array.isArray(news.main_central_comm3) ? news.main_central_comm3.slice(0, 15) : [];
      const main_central_comm4 = 'main_central_comm4' in news && Array.isArray(news.main_central_comm4) ? news.main_central_comm4.slice(0, 15) : [];
      const main_central_comm5 = 'main_central_comm5' in news && Array.isArray(news.main_central_comm5) ? news.main_central_comm5.slice(0, 15) : [];

      getOnlySelectedKeys([
        ...left_bar_comm || [],
        ...right_bar_comm || [],
        ...right_bar_comm2 || [],
        ...right_bar_comm3 || [],
        ...right_bar_comm4 || [],
        ...most_viewed_comm || [],
        ...main_central_comm1 || [],
        ...main_central_comm2 || [],
        ...main_central_comm3 || [],
        ...main_central_comm4 || [],
        ...main_central_comm5 || [],
        ...is_dailynews_comm || [],
      ], ArtilcesInCentralColumn);

      setTimeout(() => {
        dispatch(setDailyComm(changeOrderInArray(is_dailynews_comm, NewsCommerce.DAILY)));
        dispatch(setPopularNewsComm(changeOrderInArray(most_viewed_comm, NewsCommerce.POPULAR)));
        dispatch(setPromotionNewsComm(changeOrderInArray(right_bar_comm, NewsCommerce.PROMO)));
        dispatch(setPromotionNewsDaily(changeOrderInArray(getDailyNews(newsLast), NewsCommerce.PROMO_DAY)));
        dispatch(setPromotionNewsComm2(changeOrderInArray(main_central_comm2, NewsCommerce.PROMO_2)));
        dispatch(setPromotionNewsComm3(changeOrderInArray(right_bar_comm3, NewsCommerce.PROMO_3)));
        dispatch(setPromotionNewsComm4(changeOrderInArray(right_bar_comm4, NewsCommerce.PROMO_4)));
        dispatch(setCentralNewsComm1(changeOrderInArray(main_central_comm1, NewsCommerce.CENTRAL_1)));
        dispatch(setCentralNewsComm2(changeOrderInArray(main_central_comm2, NewsCommerce.CENTRAL_2)));
        dispatch(setCentralNewsComm3(changeOrderInArray(main_central_comm3, NewsCommerce.CENTRAL_3)));
        dispatch(setCentralNewsComm4(changeOrderInArray(main_central_comm4, NewsCommerce.CENTRAL_4)));
        dispatch(setCentralNewsComm5(changeOrderInArray(main_central_comm5, NewsCommerce.CENTRAL_5)));
        dispatch(setLastNewsComm(left_bar_comm));
      }, 0);
    };

    handleGetNews();
  }, []);

  return (<div />);
};

export default GetNewsCommerce;
