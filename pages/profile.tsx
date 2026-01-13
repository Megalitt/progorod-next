import React from 'react';
import { useSelector } from 'react-redux';
import { ProjectLayout } from '../layouts/project-layout';
import { Profile } from '../components/profile';
import { seoParametersSelector } from '../store/seo/seo-selectors';
import { bannersCountInPositionSelector } from '../store/banner-position/banner-position-selectors';
import { getBanners } from '../utils/get-banners';
import { apiPostBannerStat, apiGetBanner } from '../services/banner';
import { BannerKeys } from '../utils/consts';

const ProfilePage: React.FC = React.memo(() => {
  const seoForPage = useSelector(seoParametersSelector);
  const subTitle = 'title' in seoForPage && seoForPage?.title?.length > 0 ? seoForPage.title : 'Профиль';

  const [bannersTop, setBannersTop] = React.useState([]);
  const [bannersPush, setBannersPush] = React.useState([]);
  const [bannersPushFullSecond, setBannersPushFullSecond] = React.useState([]);
  const [bannersPushFullThird, setBannersPushFullThird] = React.useState([]);
  const [bannersFix, setBannersFix] = React.useState([]);
  const [bannersFixSecond, setBannersFixSecond] = React.useState([]);
  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);

  React.useEffect(() => {
    getBanners(
      apiGetBanner,
      {
        bannerIdTop: BannerKeys.BANNER_TOP,
        bannerIdPuhs: BannerKeys.BANNER_PUSH,
        bannerIdPuhsFull: BannerKeys.BANNER_PUSH_FULL,
        bannerIdPuhsFullSecond: BannerKeys.BANNER_PUSH_FULL_SECOND,
        bannerIdPuhsFullThird: BannerKeys.BANNER_PUSH_FULL_THIRD,
        bannerIdFix: BannerKeys.BANNER_FIX,
        bannerIdFixSecond: BannerKeys.BANNER_FIX_SECOND,
        bannersCountInPosition,
      },
    ).then(({
      bannersTop,
      bannersPush,
      bannersPushFullSecond,
      bannersPushFullThird,
      bannersFix,
      bannersFixSecond,
      formData,
    }: any) => {
      setBannersTop(bannersTop);
      setBannersFix(bannersFix);
      setBannersFixSecond(bannersFixSecond);
      setBannersPush(bannersPush);
      setBannersPushFullSecond(bannersPushFullSecond);
      setBannersPushFullThird(bannersPushFullThird);

      setTimeout(() => {
        apiPostBannerStat(formData);
      }, 10000);
    });
  }, []);

  return (
    <ProjectLayout
      subTitle={subTitle}
      bannersTop={bannersTop}
      bannersPush={bannersPush}
      bannersPushFullSecond={bannersPushFullSecond}
      bannersPushFullThird={bannersPushFullThird}
      bannersFix={bannersFix}
      bannersFixSecond={bannersFixSecond}
    >
      <Profile />
    </ProjectLayout>
  );
});

export default ProfilePage;
