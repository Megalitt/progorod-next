import { getCookie } from '../cookie/get-cookie';
import { setCookie } from '../cookie/set-cookie';
import { BannerKeys } from '../consts';

export const setPushBanner = (banners = [], pushBannersLimitMinutes, pushBannersFullLimitMinutes) => {
  let pushBanner = null;
  for (let i = 0; i < banners.length; i += 1) {
    const currentBanner = getCookie(`push${banners[i].id}`);
    if (!currentBanner && !pushBanner) {
      if (banners[i].position_key === BannerKeys.BANNER_PUSH_FULL) {
        setCookie(`push${banners[i].id}`, `push${banners[i].id}`, { 'max-age': +pushBannersFullLimitMinutes * 60 });
      } else {
        setCookie(`push${banners[i].id}`, `push${banners[i].id}`, { 'max-age': +pushBannersLimitMinutes * 60 });
      }
      pushBanner = banners[i];
    }
  }
  return pushBanner;
};
