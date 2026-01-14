import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import {
  ConcursSliderItem,
  SliderNextArrow,
  SliderPrevArrow,
} from './index';
import { apiGetPhotoConcurs } from '../../services/concurs';

import styles from './slider-concurs.module.scss';

const SliderConcurs: React.FC = React.memo(() => {
  const [concursData, setConcursData] = useState([]);
  const [renderSlider, setRenderSlider] = useState(false);
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    infinite: true,
    nextArrow: <SliderNextArrow />,
    prevArrow: <SliderPrevArrow />,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1.391,
          infinite: false,
        },
      },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      apiGetPhotoConcurs().then((data) => setConcursData(data?.data));
    }, 0);

    setTimeout(() => {
      setRenderSlider(true);
    }, 30);
  }, []);

  return (
    <article className={`${styles.concursSlider} poster-custom`}>
      <Link prefetch={false} href="/concurs">
        <a className={styles.concursSliderTitleLink} title="Конкурсы">
          <h2 className={styles.concursSliderTitle}>
            <span className={styles.concursSliderTitleInner}>Конкурсы</span>
          </h2>
        </a>
      </Link>
      <div className={styles.concursSliderWrap}>
        {renderSlider && (
          <Slider {...settings}>
            {concursData && Array.isArray(concursData) && concursData.map((item) => <ConcursSliderItem key={`concurs-item-${item.id}`} {...item} />)}
          </Slider>
        )}
      </div>
    </article>
  );
});

export default SliderConcurs;
