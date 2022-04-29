import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => (
  <Html lang="ru">
    <Head>
      <script
        data-partytown-config
        dangerouslySetInnerHTML={{
          __html: `
              partytown = {
                lib: "/_next/static/~partytown/",
                debug: true,
                forward: ["dataLayer.push"]
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
