export const BannerName = {
  TOP_BANNER: 'top_banner',
  CENTRAL_BANNER: 'central_banner',
  RIGHT_BANNER: 'right_banner',
  RIGHT_MAIN_BANNER: 'right_main_banner',
  FIX_BANNER: 'fix_banner',
  FIX_BANNER_SECOND: 'banner-lower-fixed-2',
  PUSH_BANNER: 'push_banner',
  PUSH_FULL_BANNER: 'push_full_banner',
  PUSH_FULL_BANNER_SECOND: 'push_full_banner_second',
  PARTNERS_BANNER: 'partners_banner',
  BANNER_INNER_ARTICLE: 'inner_article_banner',
  BANNER_MEDIAMETRIKA: 'media_metrika',
  BANNER_IN_SERVICES: 'in_services_banner',
  BANNER_INNER_ARTICLE_TOP: 'inner_article_banner_top',
  BANNER_INNER_ARTICLE_AFTER_TAGS: 'inner_article_banner_after_tags',
};

export const BannerKeys = {
  BANNER_TOP: 'banner-capital-desktop',
  BANNER_FIX: 'banner-bottom-fix-desktop',
  BANNER_FIX_SECOND: 'banner-lower-fixed-2',
  BANNER_CENTRAL: 'banner-news-feed-desktop',
  BANNER_RIGHT: 'banner-side-desktop',
  BANNER_MAIN_RIGHT: 'banner-capital-side-desktop',
  BANNER_PUSH: 'banner-push-mobile',
  BANNER_PUSH_FULL: 'banner-push-fullscreen',
  BANNER_PARTNERS: 'banner-passive-adverts-after-comments',
  BANNER_PARTNERS_FIRST: 'banner-passive-adverts-after-comments-1',
  BANNER_PARTNERS_SECOND: 'banner-passive-adverts-after-comments-2',
  BANNER_PARTNERS_THIRD: 'banner-passive-adverts-after-comments-3',
  BANNER_PARTNERS_FOURTH: 'banner-passive-adverts-after-comments-4',
  BANNER_AMP_TOP: 'banner-above-title',
  BANNER_AMP_MIDDLE: 'banner-inside-content',
  BANNER_AMP_BOTTOM: 'banner-under-read-also',
  BANNER_INNER_ARTICLE: 'banner-inside-content-2',
  BANNER_MEDIAMETRIKA: 'banner-mediametrica',
  BANNER_IN_SERVICES: 'banner-services',
  BANNER_PULS: 'banner-widget-puls',
  BANNER_INNER_ARTICLE_TOP: 'banner-inside-content-3',
  BANNER_INNER_ARTICLE_AFTER_TAGS: 'banner-passive-before-read-also',
  BANNER_INSTEAD_RELATED_ARTICLES: 'banner-block-read-also',
  BANNER_INSTEAD_MAIN_IMAGE_ARTICLES: 'banner-under-news-title',
  BANNER_PUSH_FULL_SECOND: 'banner-push-2-with-delay',
  BANNER_PUSH_FULL_THIRD: 'banner-push-3-with-delay',
};

export const NewsCommerce = {
  DAILY: 'daily_news',
  LAST: 'last_news',
  POPULAR: 'popular_news',
  PROMO: 'promo',
  PROMO_DAY: 'promo_day',
  PROMO_2: 'promo_2',
  PROMO_3: 'promo_3',
  PROMO_4: 'promo_4',
  CENTRAL_1: 'central_1',
  CENTRAL_2: 'central_2',
  CENTRAL_3: 'central_3',
  CENTRAL_4: 'central_4',
  CENTRAL_5: 'central_5',
};

const ImageDirectory = {
  USER_FILES: '/userfiles',
  PIC_ORIGINAL: '/picfullsize',
  PIC_MOBILE: '/picmobile', // 480x320
  PIC_MINI: '/picnews', // 155x105
  PIC_INTV: '/picintv',
  PIC_TITLE: '/pictitle',
};

export const ImagePath = {
  IMG_ORIGINAL: `${ImageDirectory.USER_FILES}${ImageDirectory.PIC_ORIGINAL}/`,
  IMG_MOBILE: `${ImageDirectory.USER_FILES}${ImageDirectory.PIC_MOBILE}/`,
  IMG_MINI: `${ImageDirectory.USER_FILES}${ImageDirectory.PIC_MINI}/`,
  IMG_INTV: `${ImageDirectory.USER_FILES}${ImageDirectory.PIC_INTV}/`,
  IMG_OG: `${ImageDirectory.USER_FILES}${ImageDirectory.PIC_TITLE}/`,
};

export const PAGES_IMAGE_RELEASE_DATE = new Date('2025-01-09').getTime() / 1000;

export const AmpPath = {
  originToAmp(domain = '', id = 0, erid = '') {
    let url = `https://${domain}/amp/${id}`;
    if (erid && erid.length > 0) {
      url += `?erid=${erid}`;
    }
    return url;
  },
  ampToOrigin(domain = '', rubric = '', id = 0, erid = '') {
    let url = `https://${domain}/${rubric}/${id}`;
    if (erid && erid.length > 0) {
      url += `?erid=${erid}`;
    }
    return url;
  },
};

export const MILLISECONDS_IN_A_DAY:number = 86400000;
export const DATE_CREATE_NEW_PICTURE_SIZES_NEWS:number = 1755291600;
export const DATE_CREATE_NEW_PICTURE_SIZES_SERVICES:number = 1761782400;

export const Role = {
  NONE: 0,
  WRITER: 2,
  ADMIN: 4,
};

export const month = {
  ru: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
};

export const ArticleInnerKeys = [
  'id',
  'text',
  'publish_at',
  'updated_at',
  'picauth_url',
  'image',
  'views_count',
  'add_caption',
  'cens',
  'image_picnews',
  'image_picnews_webp',
  'image_picfullsize',
  'image_picfullsize_webp',
  'image_pictv',
  'image_pictv_webp',
  'redactor',
  'tags',
  'lead',
  'uid',
  'erid',
  'endtext',
  'promo',
  'nameya',
  'kw',
  'ds',
  'title',
  'rubric_name',
  'voting',
  'uri',
  'picauth',
  'gallery',
  'textLength',
  'stat',
  'global_article_origin',
  'relatedArticles',
  'relatedArticles_comm',
];

export const NewsLineKeys = [
  'id',
  'title',
  'image',
  'rubric_name',
  'redactor',
  'image_picnews',
  'image_picnews_webp',
  'image_picintv',
  'image_picintv_webp',
  'image_pictv',
  'image_pictv_webp',
  'uri',
  'erid',
  'empty_template',
  'comments_count',
  'publish_at',
  'global_article_origin',
];

export const NewsLineReviewKeys = [
  'id',
  'name',
  'link',
  'data',
];

export const ArticleRelatedKeys = [
  'id',
  'title',
  'rubric',
  'publish_at',
  'uri',
  'empty_template',
];

export const ArticleInColumns = [
  'id',
  'title',
  'uri',
  'promo',
  'erid',
  'promo',
  'empty_template',
  'comments_count',
  'publish_at',
  'updated_at',
  'global_article_origin',
];

export const ConcursList = [
  'id',
  'voting_id',
  'creator_id',
  'creation_date',
  'date',
  'author_id',
  'end_date',
  'image',
  'title',
  'seo_title',
  'seo_desc',
  'is_open',
  'likes',
  'image_small',
  'image_small_webp',
  'image_medium',
  'image_medium_webp',
  'image_mobile',
  'image_mobile_webp',
];

export const AfishaList = [
  'id',
  'place_id',
  'creator_id',
  'cat_type',
  'category',
  'content',
  'creation_date',
  'event_date',
  'event_end_date',
  'order_title',
  'title',
  'footer_title',
  'footer_content',
  'place',
  'censor',
  'state',
  'seo_title',
  'seo_desc',
  'image',
  'image_picitem',
  'image_picitem_webp',
  'image_picintv',
  'image_picintv_webp',
  'image_pictv',
  'image_pictv_webp',
];

export const ArticleSuperPromotionKeys = [
  'id',
  'title',
  'image_picnews',
  'image_picnews_webp',
  'image_pictv',
  'image_pictv_webp',
  'image_picintv',
  'image_picintv_webp',
  'empty_template',
  'publish_at',
  'uri',
  'global_article_origin',
];

export const ArtilcesInCentralColumn = [
  'id',
  'title',
  'image',
  'image_picnews',
  'image_picnews_webp',
  'image_picintv',
  'image_picintv_webp',
  'image_pictv',
  'image_pictv_webp',
  'uri',
  'promo',
  'erid',
  'promo',
  'empty_template',
  'comments_count',
  'publish_at',
  'updated_at',
  'global_article_origin',
];

export const SocialListKey = [
  'url',
  'name',
  'iconName',
  'iconTitle'
];

export const isTemplateRegEx = /(api|rss|bs|specials|assets|announcement)|.+\.(ico|png|jpe?g|gif|svg|ttf|mp4|mov|swf|pdf|zip|rar|txt|xml|html)$/;
export const isTagScriptEmptyRegExp = /\s*<script\s*[^>]*><\s*\/\s*script>/g;
export const isScriptSrcAttribute = /<script.*?src="(.*?)"/gim;
export const isScriptFullTag = /\s*<script\s*[^>]*>(.|\n)*?<\s*\/\s*script>*/g;

export const articlesNoneCommerce = ['0', '3', '6', '7', '8', '11', '12'];
