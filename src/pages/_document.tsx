import { Head, Html, Main, NextScript } from 'next/document';

// import { Partytown } from '@builder.io/partytown/react';

const Document = () => (
  <Html lang="ru">
    <Head>
      {/* <Partytown
          debug
          lib="/_next/static/~partytown/"
          forward={['dataLayer.push', 'ym']}
          resolveUrl={(url, location) => {
            if (url.hostname === 'connect.facebook.net') {
              const pathname = `/proxy/facebook${url.pathname}${url.search}`;
  
              let proxyUrl = new URL(pathname, location.origin);
  
              return proxyUrl;
            }
  
            return url;
          }}
        /> */}
      <script
        data-partytown-config
        dangerouslySetInnerHTML={{
          __html: `
                partytown = {
                  lib: "/_next/static/~partytown/",
                  forward: ["dataLayer.push", "ym"],
                  resolveUrl: function(url, location) {
                    if (url.hostname === "connect.facebook.net") {
                      const pathname = "/proxy/facebook" + url.pathname + url.search;
  
                      var proxyUrl = new URL(pathname, location.origin);
                      
                      return proxyUrl;
                    }
  
                    return url;
                  },
                  // debug: true,
                  // logStackTraces: true,
                  // logSendBeaconRequests: true,
                  // logScriptExecution: true,
                  // logSetters: true,
                  // logCalls: true,
                  // logGetters: true,
                };
              `,
        }}
      />
      <title />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
