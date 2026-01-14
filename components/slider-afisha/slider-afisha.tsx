import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import {
  AfishaSliderItem,
  SliderNextArrow,
  SliderPrevArrow,
} from './index';

import styles from './slider-afisha.module.scss';
import { apiGetAfishaForMainPage } from '../../services/afisha';

const SliderAfisha: React.FC = React.memo(() => {
  const [afishaData, setAfishaData] = useState([]);
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
      apiGetAfishaForMainPage().then((data) => setAfishaData(data));
    }, 0);

    setTimeout(() => {
      setRenderSlider(true);
    }, 30);
  }, []);

  return (
    <article className={`${styles.concursSlider} poster-custom`}>
      <Link prefetch={false} href="/afisha">
        <a className={styles.concursSliderTitleLink} title="Афиша">
          <h2 className={styles.concursSliderTitle}>
            <span className={styles.concursSliderTitleInner}>Афиша</span>
          </h2>
        </a>
      </Link>
      <div className={styles.concursSliderWrap}>
        {renderSlider && (
          <Slider {...settings}>
            {afishaData.map((item) => <AfishaSliderItem key={`afisha-item-${item.id}`} {...item} />)}
          </Slider>
        )}
      </div>
    </article>
  );
});

export default SliderAfisha;
