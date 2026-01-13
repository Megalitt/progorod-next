import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { getImagePath } from '../../utils/core/get-image-path';
import { BannerKeys } from '../../utils/consts';
import { getFileExtension } from '../../utils/get-file-extension';
import { jsConnectInBody, jsSrcConnectInHead, jsInnerScriptConnectInHead } from '../../utils/js-connect';
import { getAllPreviousNodes } from '../../utils/get-all-previous-nodes';
import { apiPostBannerClickStat } from '../../services/banner';
import { onResize } from '../../utils/on-resize';

import styles from './banner.module.scss';

type Props = {
  id: number,
  position_key: string,
  name: string,
  uri: string,
  html: string,
  html_md: string,
  html_sm: string,
  image_file: string | null,
  image_file_md: string | null,
  image_file_sm: string | null,
  pixel_image_uri?: string | '',
  className?: string | '',
  flash_file: string | null,
  html_file: string | null,
  headscript: string | null,
  onHandleCloseToggleShow?: (isShow: boolean) => void,
};

declare global {
  interface Window {
    yaContextCb?: any;
  }
}

const Banner: React.FC<Props> = React.memo(({
  id,
  position_key,
  name,
  uri,
  html,
  html_md,
  html_sm,
  image_file,
  image_file_md,
  image_file_sm,
  pixel_image_uri,
  flash_file,
  html_file,
  headscript,
  className,
  onHandleCloseToggleShow,
}) => {
  const refContainer = useRef(null);
  const router = useRouter();
  const [userAgent, setUserAgent] = React.useState(false);
  const [deviceType, setDeviceType] = React.useState('');

  const handleBannerClickCounter = (id) => {
    apiPostBannerClickStat(id);
  };

  const setDangerousHtml = React.useCallback((bannersHtml) => {
    const scriptsWrap = document.querySelector('#body-scripts');
    const scriptsContected = jsConnectInBody(bannersHtml);
    const isUserAgentGoogle = window && window.navigator.userAgent.indexOf('moto g power') !== -1 ? true : false;

    if (scriptsContected && scriptsContected.length > 0) {
      for (let i = 0; i < scriptsContected.length; i += 1) {
        if (scriptsWrap && !scriptsWrap.querySelector(`script[src="${scriptsContected[i].getAttribute('src')}"]`)) {
          const scriptTag = document.createElement('script');
          if (scriptsContected[i].getAttribute('async') !== null) {
            scriptTag.async = true;
            scriptTag.src = scriptsContected[i].getAttribute('src');
            if (!isUserAgentGoogle) {
              scriptsWrap.prepend(scriptTag);
            }
          }
        }
      }
    }

    const container = refContainer.current;
    const range = document.createRange();

    if (container !== null) {
      range.selectNodeContents(container);
      range.deleteContents();

      const htmlBannerChild = range.createContextualFragment(bannersHtml).childNodes;
      const totalHtmlBanner = document.createElement('div');

      Array.prototype.forEach.call(htmlBannerChild, (node) => {
        if ((node.src && node.src !== '') && (node.getAttribute('async') !== null)) {
          node.parentNode.removeChild(node);
        } else {
          totalHtmlBanner.append(node);
        }
      });

      if (totalHtmlBanner.childNodes.length > 0) {
        const isYaContextCbInterval = setInterval(() => {
          if (window.yaContextCb) {
            setTimeout(() => {
              container.innerHTML = '';
              container.append(totalHtmlBanner);
            }, 1500);
            clearInterval(isYaContextCbInterval);
          }
        }, 100);
      }
      const link = document.querySelector('.bannerViewLink');
      if (link) {
        link.addEventListener('click', () => {
          handleBannerClickCounter(id);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (refContainer) {
      onResize((deviceType) => {
        if (deviceType.flag === 'Desktop') {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          html && html.length > 0 ? setDangerousHtml(html) : setDangerousHtml('');
          if (html && html.length === 0) {
            if (typeof onHandleCloseToggleShow === 'function') {
              onHandleCloseToggleShow(false);
            }
            if (image_file && BannerKeys.BANNER_FIX === position_key) {
              if (typeof onHandleCloseToggleShow === 'function') {
                onHandleCloseToggleShow(true);
              }
              setDangerousHtml(`
                <a class="bannerViewLink" href="${uri}" target="_blank" rel="noopener">
                  <img src="${getImagePath({ image: image_file })}" alt="" />
                  ${pixel_image_uri && `<img class="${styles.bannerView}" src={${getImagePath({ image: pixel_image_uri })} alt="" />`}
                </a>
              `);
            }
          }
          setDeviceType('Desktop');
        }

        if (deviceType.flag === 'Tablet') {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          html_md ? setDangerousHtml(html_md) : setDangerousHtml('');
          if (typeof onHandleCloseToggleShow === 'function') {
            onHandleCloseToggleShow(true);
          }
          setDeviceType('Tablet');
        }

        if (deviceType.flag === 'Mobile') {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          html_sm ? setDangerousHtml(html_sm) : setDangerousHtml('');
          if (typeof onHandleCloseToggleShow === 'function') {
            onHandleCloseToggleShow(true);
          }
          setDeviceType('Mobile');
        }
      }, {
        mobile: 640,
        desktop: 1024,
      });
    }
  }, [refContainer, html, html_md, html_sm]);

  useEffect(() => {
    jsSrcConnectInHead(headscript);
    jsInnerScriptConnectInHead(headscript);

    router.events.on('routeChangeStart', () => {
      const siblingsBodyScripts = getAllPreviousNodes(document.querySelector('#body-scripts'));
      if (Array.isArray(siblingsBodyScripts)) {
        siblingsBodyScripts.forEach((item) => item.remove());
      }

      const scriptsWrap = document.querySelector('#body-scripts');
      if (scriptsWrap) {
        scriptsWrap.innerHTML = '';
      }
    });
    setUserAgent(window.navigator.userAgent.indexOf('moto g power') !== -1);
  }, []);

  if (userAgent) {
    return null;
  }

  const ImageFileRender = () => (
    <>
      {getFileExtension(image_file) === 'webm' || getFileExtension(image_file_sm) === 'webm' || getFileExtension(image_file_md) === 'webm' ? (
        //eslint-disable-next-line
        <video autoPlay={true} muted={true} loop={true}>
          <source media="(max-width: 640px)" src={getImagePath({ image: image_file_sm })} type="video/webm" />
          <source media="(max-width: 1024px)" src={getImagePath({ image: image_file_md })} type="video/webm" />
          <source src={getImagePath({ image: image_file })} type="video/webm" />
        </video>
      ) : (
        <picture>
          <source media="(max-width: 640px)" srcSet={getImagePath({ image: image_file_sm })} />
          <source media="(max-width: 1024px)" srcSet={getImagePath({ image: image_file_md })} />
          <img
            src={getImagePath({ image: image_file })}
            alt={name}
            loading={BannerKeys.BANNER_TOP !== position_key ? 'lazy' : 'eager'}
          />
        </picture>
      )}
      {pixel_image_uri && <img className={styles.bannerView} src={pixel_image_uri} alt="" />}
    </>
  );

  const FlashFileRender = () => (
    <>
      <img src={getImagePath({ image: flash_file })} alt={name} loading="lazy" />
      {pixel_image_uri && <img src={pixel_image_uri} alt="" className={styles.bannerView} loading="lazy" />}
    </>
  );

  const HtmlFileRender = () => (
    <>
      <div className={styles.bannerBlocker} />
      {pixel_image_uri && <img src={pixel_image_uri} alt="" className={styles.bannerView} loading="lazy" />}
      <iframe
        className={styles.bannerIframe}
        src={getImagePath({ image: html_file })}
        title={name}
        frameBorder="0"
        scrolling="no"
        width="100%"
      />
    </>
  );

  return (
    <>
      {
        ((image_file && BannerKeys.BANNER_FIX !== position_key)
        || (image_file && deviceType === 'Desktop' && BannerKeys.BANNER_FIX === position_key)
        || (image_file && !(html || html_md || html_sm))) && (
          <div
            className={classNames(styles.banner, className)}
            data-id-promo={id}
          >
            {uri ? (
              <a
                className={classNames(styles.bannerLink, className)}
                onClick={() => handleBannerClickCounter(id)}
                href={uri}
                target="_blank"
                rel="noopener"
              >
                <ImageFileRender />
              </a>
            ) : (
              <span className={styles.bannerLink}>
                <ImageFileRender />
              </span>
            )}
          </div>
        )
      }
      {
        flash_file && (
          <div
            className={classNames(styles.banner, className)}
            data-id-promo={id}
          >
            { uri ? (
              <a
                className={styles.bannerLink}
                onClick={() => handleBannerClickCounter(id)}
                href={uri}
                target="_blank"
                rel="noopener"
              >
                <FlashFileRender />
              </a>
            ) : (
              <span className={styles.bannerLink}>
                <FlashFileRender />
              </span>
            )}
          </div>
        )
      }
      {
        html_file && (
          <div
            className={classNames(styles.banner, className)}
            data-id-promo={id}
          >
            {uri ? (
              <a
                className={classNames(styles.bannerLinkIframe, className)}
                onClick={() => handleBannerClickCounter(id)}
                href={uri}
                target="_blank"
                rel="noopener"
              >
                <HtmlFileRender />
              </a>
            ) : (
              <span className={styles.bannerLink}>
                <HtmlFileRender />
              </span>
            )}
          </div>
        )
      }
      {((image_file && (html || html_md || html_sm) && deviceType !== 'Desktop' && BannerKeys.BANNER_FIX === position_key)
      || (!image_file && (html || html_md || html_sm))) && (
        <div
          className={classNames(styles.banner, className)}
          id={`promo-${id}`}
          data-id-promo={id}
          ref={refContainer}
        />
      ) }
    </>
  );
});

export default Banner;
