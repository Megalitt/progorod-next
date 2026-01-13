import React from 'react';
import NextDocument, {
  Html, Head, Main, NextScript,
} from 'next/document';
import Script from 'next/script';
import { isScriptSrcAttribute } from '../utils/consts';
import { getFaviconTags } from '../utils/get-favicon-tags';
import { MetaTag } from '../components/meta-tag';
import { apiGetLogos, apiGetPushGravitec } from '../services/services';
import { apiGetSeoSettingsMain } from '../services/seo';

const consoleStamp = require('console-stamp');

type Props = {};
class Document extends NextDocument<Props> {
  static async getInitialProps(ctx) {
    const initialProps: any = await NextDocument.getInitialProps(ctx);
    const script = await apiGetPushGravitec();
    const mainTitle = await apiGetSeoSettingsMain('main-title');
    const favicon = await apiGetLogos('file-favicon');
    const serverHostname = ctx.req.headers.host;
    initialProps.serverHostname = serverHostname;
    initialProps.scripts = Array.isArray(script) && script.length > 0 ? script : [];
    initialProps.currentUrl = ctx.req.url;
    initialProps.userAgent = ctx.req.headers['user-agent'];
    initialProps.favicon = favicon;
    const url = ['/favicon.ico', '/manifest.json'].includes(initialProps.currentUrl) ? '/' : initialProps.currentUrl;

    // @ts-ignore
    consoleStamp(console, {
      format: `:date(yyyy/mm/dd HH:MM:ss) - currentUrl: https://${ctx.req.headers.host}${url}`,
    });

    initialProps.mainTitle = mainTitle?.value;
    return initialProps;
  }

  render() {
    const {
      scripts,
      currentUrl,
      mainTitle,
      userAgent,
      serverHostname,
      favicon,
    }: any = this.props;
    return (
      <Html lang="ru" id={process.env.NEXT_PUBLIC_FORK_NAME}>
        <Head>
          {typeof favicon === 'string' && favicon.length > 0 && getFaviconTags(favicon)}
          {process.env.NEXT_PUBLIC_FORK_NAME === 'CHEBOKSARY' && (
            <>
              <link rel="preload" href="/fonts/roboto.woff2" type="font/woff2" as="font" crossOrigin="anonymous" />
              <link rel="preload" href="/fonts/robotobold.woff2" type="font/woff2" as="font" crossOrigin="anonymous" />
            </>
          )}
          {process.env.NEXT_PUBLIC_FORK_NAME === 'KIROV' && (
            <>
              <link rel="preload" href="/fonts/ptserif.woff2" type="font/woff2" as="font" crossOrigin="anonymous" />
              <link rel="preload" href="/fonts/ptserifbold.woff2" type="font/woff2" as="font" crossOrigin="anonymous" />
            </>
          )}
          {process.env.NEXT_PUBLIC_FORK_NAME === 'CHEBOKSARY' && (
            <style jsx>
              {
                `@font-face {
                  font-family: 'Roboto';
                  font-weight: 400;
                  font-style: normal;
                  font-display: swap;
                  src:
                      url("/fonts/roboto.woff2") format("woff2"),
                      url("/fonts/roboto.woff") format("woff");
                }

                @font-face {
                  font-family: 'Roboto';
                  font-weight: 700;
                  font-style: normal;
                  font-display: swap;
                  src:
                      url("/fonts/robotobold.woff2") format("woff2"),
                      url("/fonts/robotobold.woff") format("woff");
                }`
              }
            </style>
          )}
          {process.env.NEXT_PUBLIC_FORK_NAME === 'KIROV' && (
            <style jsx>
              {
                `@font-face {
                  font-family: "PT Serif";
                  font-weight: normal;
                  font-style: normal;
                  font-display: swap;
                  src:
                      url("/fonts/ptserif.woff2") format("woff2"),
                      url("/fonts/ptserif.woff") format("woff");
                }
                
                @font-face {
                  font-family: "PT Serif";
                  font-weight: bold;
                  font-style: normal;
                  font-display: swap;
                  src:
                      url("/fonts/ptserifbold.woff2") format("woff2"),
                      url("/fonts/ptserifbold.woff") format("woff");
                }`
              }
            </style>
          )}
          <link rel="manifest" href="/manifest.json" />
          <link type="application/rss+xml" href={`https://${serverHostname}/rss.xml`} rel="alternate" title={mainTitle} />
          <Script
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: 'window.yaContextCb=window.yaContextCb||[]',
            }}
          />
          {userAgent.indexOf('moto g power') === -1 && <Script strategy="lazyOnload" src="https://yandex.ru/ads/system/context.js" async />}
          {Array.isArray(scripts) && scripts.length > 0 && scripts.map((item) => {
            const renderTag = [];
            if (typeof item === 'object' && 'url' in item) {
              if (item.url === currentUrl) {
                // eslint-disable-next-line no-restricted-syntax, guard-for-in
                for (const key in item) {
                  if (typeof item[key] === 'string' && key !== 'url') {
                    const getSrc = isScriptSrcAttribute.exec(item[key]);
                    if (getSrc) {
                      renderTag.push(<script key={`script-item-${item}`} src={`${getSrc[1]}`} />);
                    }
                  }
                  if (typeof item[key] === 'object') {
                    renderTag.push(<MetaTag name={item[key].name} content={item[key].content} />);
                  }
                }
              }
            }

            if (typeof item === 'object' && 'src' in item && item.src.length > 0) {
              renderTag.push(<Script strategy="lazyOnload" key={`script-item-${item}`} src={`${item.src}`} />);
            }

            if (typeof item === 'object' && 'scriptCode' in item && item.scriptCode.length > 0) {
              renderTag.push(
                <Script
                  strategy="lazyOnload"
                  dangerouslySetInnerHTML={{
                    __html: item.scriptCode,
                  }}
                />,
              );
            }
            return userAgent.indexOf('moto g power') === -1 ? renderTag : null;
          })}
        </Head>
        <body>
          <div id="body-scripts" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
