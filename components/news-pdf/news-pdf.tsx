import React from 'react';
import { NewsPdfItem } from './index';
import styles from './news-pdf.module.scss';

type NewsType = {
  id: number,
  date: number,
  file: string,
  num: string,
  pic: string,
};

type Props = {
  news: Array<NewsType>,
};

const NewsPdf: React.FC<Props> = ({ news }) => (
  <div className={styles.newsPdf}>
    {news.map((item) => <NewsPdfItem {...item} key={`news-pdf-${item.id}`} />)}
  </div>
);

export default NewsPdf;
