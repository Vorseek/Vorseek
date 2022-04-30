import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => (
  <Html lang="ru">
    <Head>
      <script
        data-partytown-config
        dangerouslySetInnerHTML={{
          __html: `
              partytown = {
                debug: true,
                lib: "/_next/static/~partytown/",
                forward: ["dataLayer.push", "ym"],
                resolveUrl: function(url) {
                  if (url.hostname === "connect.facebook.net") {
                    const pathname = "/proxy/facebook" + url.pathname + url.search;

                    var proxyUrl = new URL(pathname, self.location.origin);
                    
                    return proxyUrl;
                  }

                  if (url.hostname === "www.googletagmanager.com") {
                    const pathname = "/proxy/google" + url.pathname + url.search;

                    var proxyUrl = new URL(pathname, self.location.origin);
                    
                    return proxyUrl;
                  }

                  return url;
                },
                logStackTraces: true,
                logSendBeaconRequests: true,
                logScriptExecution: true,
                logSetters: true,
                logCalls: true,
                logGetters: true,
              };
            `,
        }}
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
