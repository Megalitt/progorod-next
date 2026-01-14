import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import {
  QuestionItem,
  SliderNextArrow,
  SliderPrevArrow,
} from './index';

import styles from './slider-faq.module.scss';
import { apiGetFaqSortByTime } from '../../services/faq';

const SliderFaq: React.FC = React.memo(() => {
  const [faqData, setFaqData] = useState([]);
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
      apiGetFaqSortByTime().then(({ data }: any) => setFaqData(data));
    }, 0);

    setTimeout(() => {
      setRenderSlider(true);
    }, 50);
  }, []);

  return (
    <article className={`${styles.question} question-custom`}>
      <Link prefetch={false} href="/faq">
        <a className={styles.questionTitleLink} title="Вопрос-ответ">
          <h2 className={styles.questionTitle}>
            <span className={styles.questionTitleInner}>Вопрос-ответ</span>
          </h2>
        </a>
      </Link>
      <div className={styles.questionWrp}>
        {renderSlider && (
          <Slider {...settings}>
            {
              faqData && faqData.map((item) => <QuestionItem {...item} key={`faq-id-${item.id}`} />)
            }
          </Slider>
          )}
      </div>
    </article>
  );
});

export default SliderFaq;
