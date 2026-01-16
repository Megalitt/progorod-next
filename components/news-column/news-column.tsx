import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { NewsColumnItem } from './index';
import { Loader } from '../loader';

import { isMobileSelector } from '../../store/seo/seo-selectors';

import styles from './news-column.module.scss';

type NewsType = {
  id: number,
  title: string,
  publish_at: number,
  uri: string,
  erid: string,
  empty_template: string | number,
  promo: string,
};

type Props = {
  title: string,
  news: Array<NewsType>,
  columnHeight?: null | number,
};

const NewsColumn: React.FC<Props> = React.memo(({
  title,
  news,
  columnHeight = null,
}) => {
  const refColRight = React.useRef(null);
  const [isLoaded, setLoaded] = React.useState(false);
  const isMobile = useSelector(isMobileSelector);
  const router = useRouter();

  const onHandleHideElements = React.useCallback(() => {
    setLoaded(false);
    if (refColRight.current) {
      for (let i = 0; i < refColRight.current.children.length; i += 1) {
        const currentElement = refColRight.current.children[i];

        if (refColRight.current.children.length > 2 && i < 3) {
          currentElement.style.display = 'block';
        } else {
          currentElement.style.display = 'none';
        }
      }
    }
  }, []);


  const onHandleSetCountPosts = React.useCallback(() => {
    if (refColRight.current) {
      let totalPositionElement = 0;
    
      for (let i = 0; i < refColRight.current.children.length; i += 1) {
        const currentElement = refColRight.current.children[i];
        currentElement.style.display = 'block';

        const observer = new ResizeObserver((entries) => {
          const {blockSize} = entries[0].borderBoxSize[0];
          totalPositionElement += blockSize;

          const clientHeight = refColRight.current?.parentNode?.parentNode?.clientHeight;
          if (clientHeight && totalPositionElement > refColRight.current.parentNode.parentNode.clientHeight - 60) {
            currentElement.style.display = 'none';
          }
        });
        observer.observe(currentElement);

        setTimeout(() => {
          observer.unobserve(currentElement);
        }, 50)
      }
    }
    setLoaded(true);
  }, []);

  // const onHandleSetCountPosts = () => {
  //   if (!refColRight.current) return;
  //   console.log('refColRight.current', refColRight.current);

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       console.log('запустился', entries);
  //       entries.forEach((entry, i) => {
  //         if (entry.isIntersecting) {
  //           console.log(`Ребёнок ${i} В ЗОНЕ`);
  //           refColRight.current.children[i].style.display = 'block';
  //         } else {
  //           console.log(`Ребёнок ${i} ВЫШЕЛ ЗА ГРАНИЦЫ`);
  //           refColRight.current.children[i].style.display = 'none';
  //         }
  //       });
  //     },
  //     {
  //       root: refColRight.current, // Наблюдаем относительно родителя
  //       rootMargin: '0px', // Без отступов
  //       threshold: [0, 1], // Срабатывает на входе/выходе
  //     }
  //   );

  //   // Наблюдаем за всеми детьми
  //   [...refColRight.current.children].forEach((ref) => {
  //     if (ref) {
  //       observer.observe(ref);
  //     };
  //   });

  //   // setTimeout(() => {
  //   //   observer.disconnect()
  //   // }, 30)

  //   setLoaded(true);
  // };


  React.useEffect(() => {
    if (!isMobile) {
      onHandleHideElements();
      router.events.on('routeChangeStart', onHandleHideElements);
      setTimeout(() => {
        onHandleSetCountPosts();
      }, 5000);
    }

    return () => router.events.off('routeChangeStart', onHandleHideElements);
  }, [router, isMobile]);

  
  return (
    <div className={styles.nwsCln}>
      <div className={styles.nwsClnInner}  style={{ height: '98vh' }}>
        <h2 className={styles.nwsClnTitle}>{title}</h2>
        <ul className={styles.nwsClnContainer} ref={refColRight}>
          {
            news.map((item, index) => (
              <NewsColumnItem
                {...item}
                key={`newsColumn-${item.id}-${index * 3}`}
              />
            ))
          }
        </ul>
        {!isLoaded && <Loader />}
      </div>
    </div>
  );
});

export default NewsColumn;
