import React from 'react';
import Head from 'next/head';

import {
  Article,
  Menu,
  Banner,
  AmpLayout,
} from '../../components/amp';
import { compareRandom } from '../../utils/core/compare-random';
import { createMarkup } from '../../utils/core/create-markup';
import {
  apiGetAllNav,
  apiGetDisableAmpPages,
  apiGetSuggestNews,
  apiGetPicModerateYear,
  apiGetLogos,
} from '../../services/services';
import { apiGetArticle, apiGetAmpCounters } from '../../services/amp';
import { apiGetBanner } from '../../services/banner';
import { apiGetDomain } from '../../services/seo';
import { AmpPath, BannerKeys, ImagePath } from '../../utils/consts';
import { getSubstrByWord } from '../../utils/get-substr-by-word';
import { getTagsMicroData } from '../../utils/get-tags-micro-data';
import { getTagsArray } from '../../utils/get-tags-array';
import { getImagePath } from '../../utils/core/get-image-path';

export const config = { amp: true };

const AmpPage = ({
  rubrics,
  article,
  counters,
  bannerTop,
  bannerMiddle,
  bannerBottom,
  domain,
  serverHostname,
  picModerateYear,
  settingSuggestNews,
  logoAmp,
}) => (
  <>
    <Head>
      <title key="title">{article.title}</title>
      <meta name="keywords" content={article.kw} key="keywords" />
      <meta name="description" content={article.ds} key="description" />
      <link rel="canonical" href={AmpPath.ampToOrigin(domain, article.rubric, article.id, article.erid)} key="canonical" />
      <link rel="amphtml" href={AmpPath.originToAmp(domain, article.id, article.erid)} key="amphtml" />
    </Head>
    <Menu
      rubrics={rubrics}
      settingSuggestNews={settingSuggestNews}
    />
    <AmpLayout serverHostname={serverHostname} logoAmp={logoAmp}>
      { bannerTop.length > 0 && <Banner bannerData={bannerTop.sort(compareRandom)[0]} /> }
      <Article article={article} picModerateYear={picModerateYear}>
        { bannerMiddle.length > 0 && <Banner bannerData={bannerMiddle.sort(compareRandom)[0]} /> }
      </Article>
      { bannerBottom.length > 0 && <Banner bannerData={bannerBottom.sort(compareRandom)[0]} /> }
      {
        Array.isArray(counters)
        && counters.length > 0
        && <div className="counters" dangerouslySetInnerHTML={createMarkup(counters[0]?.value)} />
      }
    </AmpLayout>
    <style jsx global amp-custom>
      {
        `
       .header .logo-oren {
          width: 95px;
          height: 50px;
          margin: 0 auto;
          opacity: 1;
        }

        .pensnewsHeader .header {
          background-color: #ffc000;
        }

        .pensnewsHeader .header amp-img {
          width: 150px;
          height: 30px;
        }

        .pensnewsHeader .hamburger::before {
          background-color: #000;
          box-shadow: 0 10px 0 #000, 0 -10px 0 #000;
        }

        .pensnewsHeader .article__img-label {
          color: #000;
          background-color: #ffc000;
        }

        .header .logo-magnitogorsk {
          width: 150px;
          height: 30px;
        }

        .header .logoPg23 {
          width: 110px;
          height: 47px;
        }

        .header .logoUsinsk {
          width: 120px;
          height: 30px;
        }

        .header .logo-bryansk {
          width: 99px;
          height: 47px;
        }

        .header .logo-irkutsk {
          width: 170px;
          height: 40px;
        }

        .header .logo-kaliningradtv {
          width: 200px;
          height: 50px;
        }

        .header .logo-women365 {
          width: 170px;
          height: 35px;
        }

        .header .logo-materinstvo {
          width: 130px;
          height: 62px;
        }

        .header .logo-newtambov {
          width: 150px;
          height: 54px;
        }
        
        .header .logo-lipetsknews {
          width: 170px;
          height: 40px;
        }
        
        .header amp-img {
          object-fit: contain;
          width: 95px;
          height: 20px;
          margin: 0 auto;
        }

        .pensnewsHeader .article .button {
          color: #000;
          background-color: #ffc000;
        }

        .pensnewsHeader .footer {
          color: #000;
          background-color: #ffc000;
        }

        .article__main a  {
          color: #4D7299;
        }

        .article .button {
          color: #FFFFFF;
          text-decoration: none;
        }
          .breadcrumbs__list {
            margin: 0;
            padding: 0;
            list-style: none;
            display: flex;
            flex-wrap: wrap
          }
  
          .breadcrumbs__link {
            display: block;
            padding: 0 7px 0 5px;
            color: #4D7299;
            text-decoration: none;
          }
          
          .breadcrumbs__link::after {
            content: "/";
            margin-left: 7px;
          }
  
          amp-img.contain img {
           object-fit: contain;
          }
        
          amp-img.cover img {
            object-fit: cover;
          }
      
          .article-related {
            margin: 15px 0;
          }
  
          .article-related__link {
            display: block;
            color: inherit;
            text-decoration: none;
          }
  
          .article-related__wrap {
            display: flex;
            align-items: flex-start;
          }
          
          .article-related__image-wrap {
            position: relative;
            width: 100px;
            height: 100px;
            margin-right: 15px;
            flex-shrink: 0;
            border-radius: 6px;
            overflow: hidden;
          }
          
          .article-related__title {
            margin: 0;
            font-size: 16px;
          }
          
          .article__wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            color: #777272;
            font-size: 12px;
          }
          
          .article__img-wrap {
            padding-top: 58%;
            position: relative;
            width: 100%;
            margin: 0;
          }

          .article__img-wrap img {
            object-fit: contain;
          }

          .article__img-label {
            padding: 5px;
            color: #fff;
            background-color: #4D7299;
            border-top-right-radius: 5px;
            position: absolute;
            left: 0;
            bottom: 0;
          }
          
          .button {
            display: block;
            padding: 10px;
            color: #fff;
            font-family: inherit;
            font-size: 12px;
            font-weight: bold;
            text-align: center;
            text-transform: uppercase;
            text-decoration: none;
            background-color: #4D7299;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            outline: none;
          }
        `
      }
    </style>

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={createMarkup(`{
        "@context":"http://schema.org",
        "@startDate": "${new Date(+article?.publish_at * 1000).toISOString()}",
        "@type": "Thing",
        "@graph":[
          {
            "@type":"BreadcrumbList",
            "itemListElement":[
                {
                  "@type":"ListItem",
                  "position":1,
                  "item":{
                    "@id":"//${domain}/${article?.rubric}",
                    "name":"${article?.rubric_name}"
                   }
                 }
               ]
          },
          {
            "@type": "NewsArticle",
            "headline": "${getSubstrByWord(article?.title.replace(/(<(\/?[^>]+)>)/g, '').replace(/"/g, '\\"'))}",
            "datePublished":"${new Date(+article?.publish_at * 1000).toISOString()}",
            "dateModified":"${new Date(+article?.updated_at * 1000).toISOString()}",
            "mainEntityOfPage": "https://${domain}/amp/${article?.id}",
            "articleBody": "${getSubstrByWord(article?.text.replace(/(<(\/?[^>]+)>)/g, '').replace(/"/g, '\\"'))}",
            "genre": "${article?.rubric}",
            "author": [
                {
                  "@type":"Person",
                  "name":"${article?.redactor}",
                  "url": "https://${domain}/redactors/${article?.uid}"
                  }
              ],
            "about": [${getTagsMicroData(getTagsArray(article?.tags))}],
            "url": "https://${domain}/${article?.rubric}/${article?.id}",
            "image": "${article?.image_picfullsize !== '' ? `https://${domain}${getImagePath({ image: article?.image_picfullsize })}` : `https://${domain}${ImagePath.IMG_OG}${article?.id}.png`}"
          }
        ]
       }
    `)}
      key="product-jsonld"
    />
  </>
);

export const getServerSideProps = async (ctx) => {
  const serverHostname = ctx.req.headers.host;
  const id = ctx.query['amp-id'];
  let rubricNav:any = [];
  let article:any = null;
  let counters = [];
  let bannerTop = [];
  let bannerMiddle = [];
  let bannerBottom = [];
  let domain = '';
  let picModerateYear = null;
  let settingSuggestNews = 0;
  let disableAmpPages = 0;
  let logoAmp = '';

  try {
    rubricNav = await apiGetAllNav();
    article = await apiGetArticle(id);
    counters = await apiGetAmpCounters();
    domain = await apiGetDomain();
    bannerTop = await apiGetBanner(BannerKeys.BANNER_AMP_TOP);
    bannerMiddle = await apiGetBanner(BannerKeys.BANNER_AMP_MIDDLE);
    bannerBottom = await apiGetBanner(BannerKeys.BANNER_AMP_BOTTOM);
    picModerateYear = await apiGetPicModerateYear();
    settingSuggestNews = await apiGetSuggestNews();
    disableAmpPages = await apiGetDisableAmpPages();
    logoAmp = await apiGetLogos('file-logotip-amp');

    if (
      (Array.isArray(article) && article.length === 0)
      || article.statusCode === 404
      || article.statusCode === 403
      || +disableAmpPages === 1) {
      return {
        notFound: true,
      };
    }
  } catch (err) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      rubrics: rubricNav.id_1,
      article,
      counters,
      bannerTop,
      bannerMiddle,
      bannerBottom,
      domain,
      serverHostname,
      picModerateYear,
      settingSuggestNews,
      logoAmp,
    },
  };
};

export default AmpPage;
