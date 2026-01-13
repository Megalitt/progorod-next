import React from 'react';
import NewsLine120 from './news-line-120/news-line-120';
import NewsLine140 from './news-line-140/news-line-140';

type Props = {
  id: number,
  title: string,
  image: string,
  image_picnews: string,
  image_picnews_webp: string,
  image_picintv: string,
  image_picintv_webp: string,
  image_pictv: string,
  image_pictv_webp: string,
  uri: string,
  empty_template: boolean | number,
  comments_count: number,
  updated_at: number,
  publish_at: number,
  isLoadedComponent?: boolean,
  disableComment: string | number,
  picModerateYear: number,
  global_article_origin: string | boolean,
};

const NewsLine: React.FC<Props> = (props) => (
  <>
    {process.env.NEXT_PUBLIC_TITLE_LENGTH === '120' && <NewsLine120 {...props} />}
    {process.env.NEXT_PUBLIC_TITLE_LENGTH === '140' && <NewsLine140 {...props} />}
  </>
);

export default NewsLine;
