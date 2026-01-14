import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import {
  PosterItem,
  SliderNextArrow,
  SliderPrevArrow,
} from './index';
import { getActiveComplaint } from '../../services/peoplecontrol';

import styles from './slider-peoplecontrol.module.scss';
import { Loader } from '../loader';

const SliderPeoplecontrol: React.FC = React.memo(() => {
  const [isLoading, setIsLoadingFlag] = useState(false);
  const [isMounted, setIsMountedFlag] = useState(true);
  const [complaintData, setComplaintData] = useState([]);
  const [renderSlider, setRenderSlider] = useState(false);
  const settings = {
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
    dots: false,
    infinite: true,
    nextArrow: <SliderNextArrow />,
    prevArrow: <SliderPrevArrow />,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1.391,
          infinite: false,
          adaptiveHeight: false,
        },
      },
    ],
  };

  const fetchingData = () => {
    setIsLoadingFlag(true);
    getActiveComplaint().then((data) => {
      setComplaintData(data);
      setIsMountedFlag(false);
      setIsLoadingFlag(false);
    });
  };

  useEffect(() => {
    if (isMounted) setTimeout(fetchingData, 0);

    setTimeout(() => {
      setRenderSlider(true);
    }, 100); // отсрочка рендера слайдера, для исключения компоновки

    return () => setIsMountedFlag(false);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <article className={`${styles.poster} poster-custom`}>
      <Link prefetch={false} href="/peoplecontrol">
        <a className={styles.posterTitleLink} title="Народный контроль">
          <h2 className={styles.posterTitle}>
            <span className={styles.posterTitleInner}>Народный контроль</span>
          </h2>
        </a>
      </Link>
      <div className={styles.posterWrap}>
        {renderSlider && (
          <Slider {...settings}>
            {complaintData.map((item) => <PosterItem key={`poster-item-${item.id}`} text={item.text} id={item.id} />)}
          </Slider>
        )}
      </div>
    </article>
  );
});

export default SliderPeoplecontrol;
