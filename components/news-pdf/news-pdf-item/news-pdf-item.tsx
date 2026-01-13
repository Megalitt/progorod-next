import React from 'react';
import { getImagePath } from '../../../utils/core/get-image-path';
import { getNewsPagerDate } from '../../../utils/time/get-news-pager-date';
import { getFormatBytes } from '../../../utils/core/get-format-bytes';
import { apiGetFilePdfSize } from '../../../services/pdf';
import styles from './news-pdf-item.module.scss';

type Props = {
  num: string,
  pic: string,
  file: string,
  date: number,
};

const NewsPdfItem: React.FC<Props> = ({
  num,
  pic,
  date,
  file,
}) => {
  const [fileSize, setFileSize] = React.useState(null);

  React.useEffect(() => {
    const getFileSize = async () => {
      const data = await apiGetFilePdfSize(file);
      if (data) {
        setFileSize(data['content-length']);
      }
    };
    getFileSize();
  }, []);

  return (
    <div className={styles.newsPdfItem}>
      <div className={styles.newsPdfItemImgWrp}>
        <img
          className={styles.newsPdfItemImg}
          src={getImagePath({ image: pic })}
          alt={num}
        />
      </div>
      <div className={styles.newsPdfItemNumDate}>{`№ ${num} ${getNewsPagerDate(date)}`}</div>
      <a
        className={styles.newsPdfItemDownload}
        href={file}
        target="_blank"
        rel="noreferrer"
      >
        .pdf
        <span className={styles.newsPdfItemDownloadValue}>
          {getFormatBytes(+fileSize)}
        </span>
      </a>
    </div>
  );
};

export default NewsPdfItem;
