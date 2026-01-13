import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { wrapper } from '../../store/store';
import { createMarkup } from '../../utils/core/create-markup';
import { getImagePath } from '../../utils/core/get-image-path';
import { apiGetOffers } from '../../services/offers';

import { seoMainParametersSelector } from '../../store/seo/seo-selectors';
import { bannersCountInPositionSelector } from '../../store/banner-position/banner-position-selectors';

import { ProjectLayout } from '../../layouts/project-layout';
import { ProjectCol2Layout } from '../../layouts/project-col2-layout';
import { ArticleLayout } from '../../layouts/article-layout';
import { RowsLayout } from '../../layouts/rows-layout';
import { StaticLayout } from '../../layouts/static-layout';

import { ColumnContent } from '../../components/column-content';
import { getBanners } from '../../utils/get-banners';
import { apiGetBanner, apiPostBannerStat } from '../../services/banner';
import { BannerKeys } from '../../utils/consts';

const Offers = ({ fetchData }) => {
  const { cityName } = useSelector(seoMainParametersSelector);
  const bannersCountInPosition = useSelector(bannersCountInPositionSelector);

  const [bannersTop, setBannersTop] = React.useState([]);
  const [bannersPush, setBannersPush] = React.useState([]);
  const [bannersPushFullSecond, setBannersPushFullSecond] = React.useState([]);
  const [bannersPushFullThird, setBannersPushFullThird] = React.useState([]);
  const [bannersFix, setBannersFix] = React.useState([]);
  const [bannersFixSecond, setBannersFixSecond] = React.useState([]);

  React.useEffect(() => {
    getBanners(
      apiGetBanner,
      {
        bannerIdTop: BannerKeys.BANNER_TOP,
        bannerIdFix: BannerKeys.BANNER_FIX,
        bannerIdFixSecond: BannerKeys.BANNER_FIX_SECOND,
        bannerIdPuhs: BannerKeys.BANNER_PUSH,
        bannerIdPuhsFull: BannerKeys.BANNER_PUSH_FULL,
        bannerIdPuhsFullSecond: BannerKeys.BANNER_PUSH_FULL_SECOND,
        bannerIdPuhsFullThird: BannerKeys.BANNER_PUSH_FULL_THIRD,
        bannersCountInPosition,
      },
    ).then(({
      bannersTop,
      bannersFix,
      bannersFixSecond,
      bannersPush,
      bannersPushFullSecond,
      bannersPushFullThird,
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
    <>
      <ProjectLayout
        bannersTop={bannersTop}
        bannersPush={bannersPush}
        bannersPushFullSecond={bannersPushFullSecond}
        bannersPushFullThird={bannersPushFullThird}
        bannersFix={bannersFix}
        bannersFixSecond={bannersFixSecond}
      >
        <Head>
          <title key="title">{fetchData.content.seo_title}</title>
          <meta name="description" content={fetchData.content.seo_desc} key="description" />
          <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
        </Head>
        <ProjectCol2Layout>
          <StaticLayout>
            <ArticleLayout>
              <div>
                {fetchData.content.image_path && (
                  <picture>
                    <source type="image/webp" srcSet={fetchData.content.image_path && getImagePath({ image: `${fetchData.content.image_path}`, isWebp: 'webp' })} />
                    <img
                      src={getImagePath({ image: `${fetchData.content.image_path}` })}
                      alt={fetchData.content.title}
                    />
                  </picture>
                )}
                <h1>{fetchData.content.title}</h1>
                <div dangerouslySetInnerHTML={createMarkup(fetchData.content.content)} />
              </div>
            </ArticleLayout>
          </StaticLayout>
          {fetchData.content.column_content.length > 0 && (
          <RowsLayout>
            <ColumnContent
              title={`Прогород ${cityName && cityName.value.length !== 0 ? cityName.value : ''}`}
              content={fetchData.content.column_content}
            />
          </RowsLayout>
          )}
        </ProjectCol2Layout>
      </ProjectLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const { id } = context.query;

  const fetchData = {
    content: null,
  };

  try {
    const { data: offers }: any = await apiGetOffers(id);
    fetchData.content = await offers;
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      fetchData,
    },
  };
});

export default Offers;
