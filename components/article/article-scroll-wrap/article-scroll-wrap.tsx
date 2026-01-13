import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { getNextArticleNew } from '../../../services/article';
import { ArticleInfiniteScroll } from '../article-infinite-scroll';
import { Loader } from '../../loader';

import {
  yandexIdSelector,
  googleIdSelector,
} from '../../../store/footer/footer-selectors';

type Props = {
  id: number,
  rightMainBanners: any,
  superPromotionNews: any,
  popularNews: any,
  lastNews: any,
  lastNewsHeight: number,
  isPreview: boolean,
  disableComment: number,
  picModerateYear: number,
  disableCommentForAnonim: number,
  fetchDataPinnedNews: any,
  fetchArticleCaption: any,
  isBnnerInsteadRelatedArticles: number | string,
  minCharacterArticleForShowBanner: number | string,
  characterSpacingBannerInArticle: number | string,
};

declare global {
  interface Window {
    ym?: any;
    gtag?: any;
    _tmr?: any;
  }
}

const ArticleScrollWrap: React.FC<Props> = React.memo(({
  id,
  rightMainBanners,
  superPromotionNews,
  popularNews,
  lastNews,
  lastNewsHeight,
  isPreview,
  disableComment,
  disableCommentForAnonim,
  picModerateYear,
  fetchDataPinnedNews,
  fetchArticleCaption,
  isBnnerInsteadRelatedArticles,
  minCharacterArticleForShowBanner,
  characterSpacingBannerInArticle,
}) => {
  const yandexMetricaId = useSelector(yandexIdSelector);
  const googleMetricaId = useSelector(googleIdSelector);
  const [isLoadedArticles, setLoadArticles] = useState(null);
  const [scrollLoadArticle, setScrollLoadArticle] = useState([null]);
  const [nextArticleId, setNextArticleId] = useState(`${id}`);
  const [isLoadingShow, setLoadingShow] = useState(true);
  const [requestString, setRequestString] = useState('');

  const getNextArticle = useCallback(async (nextId) => {
    setLoadingShow(false);
    await getNextArticleNew(nextId)
      .then((data) => {
        if ('article' in data) {
          setTimeout(() => {
            setScrollLoadArticle((prev) => prev.concat(
              <div className="article-next" data-article-id={data.article.id} data-article-rubric={data.article.rubric} key={`article-next-${data.article.id}`}>
                <ArticleInfiniteScroll
                  fetchDataContent={data.article}
                  fetchDataPinnedNews={fetchDataPinnedNews}
                  fetchArticleCaption={fetchArticleCaption}
                  picModerateYear={picModerateYear}
                  isPreview={isPreview}
                  lastNews={lastNews}
                  rightMainBanners={rightMainBanners}
                  superPromotionNews={superPromotionNews}
                  popularNews={popularNews}
                  lastNewsHeight={lastNewsHeight}
                  disableComment={disableComment}
                  disableCommentForAnonim={disableCommentForAnonim}
                  isBnnerInsteadRelatedArticles={isBnnerInsteadRelatedArticles}
                  minCharacterArticleForShowBanner={minCharacterArticleForShowBanner}
                  characterSpacingBannerInArticle={characterSpacingBannerInArticle}
                />
              </div>
              ,
            ));
            const footer = document.querySelector('footer');
            if (footer.classList.contains('active')) {
              footer.classList.remove('active');
            }
          }, 1000);
        }
        setLoadingShow(true);
        setLoadArticles(false);

        if ('err' in data) {
          setRequestString(`,${id}`);
          setNextArticleId(`${id}`);
        }
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const footer = document.querySelector('footer');
      if (window.scrollY + window.innerHeight > footer.getBoundingClientRect().top + window.pageYOffset && !footer.classList.contains('active')) {
        footer.classList.add('active');
        setLoadArticles(true);
      }
    });
  }, []);

  useEffect(() => {
    if (scrollLoadArticle) {
      const parallaxPageItemCurrent = document.querySelectorAll('.article-next');
      let lastScrollTop = 0;

      window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;

        for (let i = 0; i < parallaxPageItemCurrent.length; i += 1) {
          if (st > lastScrollTop) {
            if (parallaxPageItemCurrent[i].classList.contains('is-current') && window.scrollY > parallaxPageItemCurrent[i].getBoundingClientRect().bottom + window.pageYOffset) {
              if (parallaxPageItemCurrent[i].nextElementSibling) {
                parallaxPageItemCurrent[i].nextElementSibling.classList.add('is-current');
                parallaxPageItemCurrent[i].classList.remove('is-current');
                const currentArticleId = parallaxPageItemCurrent[i].nextElementSibling.getAttribute('data-article-id');
                const currentArticleRubric = parallaxPageItemCurrent[i].nextElementSibling.getAttribute('data-article-rubric');

                if (currentArticleId && currentArticleRubric) {
                  setNextArticleId((prev) => prev.concat(`,${currentArticleId}`));
                  window.history.pushState('', '', `/${currentArticleRubric}/${currentArticleId}`);

                  //Учёт просмотров в метриках
                  if (typeof window.ym !== 'undefined' && yandexMetricaId) {
                    window.ym(yandexMetricaId, 'hit', `${window.location.origin}/${currentArticleRubric}/${currentArticleId}`);
                  }

                  if (typeof window.gtag !== 'undefined' && googleMetricaId) {
                    window.gtag('event', 'page_view', {
                      page_location: `${window.location.origin}/${currentArticleRubric}/${currentArticleId}`,
                    });
                  }

                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const updateLiveInternetCounter = () => {
                    new Image().src = `//counter.yadro.ru/hit?r=${
                      // eslint-disable-next-line no-restricted-globals
                      (typeof (screen) === 'undefined') ? '' : `;s${screen.width
                      // eslint-disable-next-line no-restricted-globals
                      }*${screen.height}*${screen.colorDepth ? screen.colorDepth
                        // eslint-disable-next-line no-restricted-globals
                        : screen.pixelDepth}`};u${escape(`${window.location.origin}/${currentArticleRubric}/${currentArticleId}`)
                    };${Math.random()}`;
                  };

                  updateLiveInternetCounter();

                  // eslint-disable-next-line no-underscore-dangle
                  const _tmr = window._tmr || (window._tmr = []);
                  _tmr.push({ type: 'pageView', url: `${window.location.origin}/${currentArticleRubric}/${currentArticleId}` });
                }
              }
            }
          } else if (parallaxPageItemCurrent[i].classList.contains('is-current') && (window.scrollY + window.innerHeight) < parallaxPageItemCurrent[i].getBoundingClientRect().top + window.pageYOffset) {
            if (parallaxPageItemCurrent[i].previousElementSibling) {
              parallaxPageItemCurrent[i].classList.remove('is-current');
              parallaxPageItemCurrent[i].previousElementSibling.classList.add('is-current');
              const currentArticleId = parallaxPageItemCurrent[i].previousElementSibling.getAttribute('data-article-id');
              const currentArticleRubric = parallaxPageItemCurrent[i].nextElementSibling.getAttribute('data-article-rubric');

              if (currentArticleId && currentArticleRubric) {
                setNextArticleId((prev) => prev.concat(`,${currentArticleId}`));
                window.history.pushState('', '', `/${currentArticleRubric}/${currentArticleId}`);
              }
            }
          }
        }

        lastScrollTop = st <= 0 ? 0 : st;
      });
    }
  }, [scrollLoadArticle]);

  useEffect(() => {
    if (isLoadedArticles) {
      const requestValues = Array.from(new Set(nextArticleId.split(',')));
      setRequestString('');

      for (let i = 0; i < requestValues.length; i += 1) {
        setRequestString((prev) => prev.concat(`,${requestValues[i]}`));
      }
    }
  }, [isLoadedArticles, nextArticleId]);

  useEffect(() => {
    if (requestString.length > 0) {
      getNextArticle(requestString.substring(1));
    }
  }, [requestString]);

  return (
    <>
      {scrollLoadArticle.length > 0 && scrollLoadArticle}
      {isLoadingShow === false && <Loader /> }
    </>
  );
});

export default ArticleScrollWrap;
