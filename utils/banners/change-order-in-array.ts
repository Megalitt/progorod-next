import { isKeyInLocalStorage } from '../local-storage/is-key-in-local-storage';
import { getItemInLocalStorage } from '../local-storage/get-item-in-local-storage';
import { setItemInLocalStorage } from '../local-storage/set-item-in-local-storage';
import { changeOrderArray } from '../core/change-order-array';

export const changeOrderInArray = (arr, bannerKey: string) => {
  let nextValue = 0;
  const isTopBannerInLocalStorage = isKeyInLocalStorage(bannerKey);
  if (isTopBannerInLocalStorage && Array.isArray(arr)) {
    const prevValue = +getItemInLocalStorage(bannerKey);
    nextValue = arr.length - 1 >= prevValue + 1 ? prevValue + 1 : 0;
  }

  setItemInLocalStorage(bannerKey, String(nextValue));
  return changeOrderArray(arr, nextValue);
};
