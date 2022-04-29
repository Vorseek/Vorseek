import { Html, Head, Main, NextScript } from 'next/document';

const create = () => ({
  __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(88665534, "init", {
clickmap:true,
trackLinks:true,
accurateTrackBounce:true,
webvisor:true
});`,
});

const Document = () => (
  <Html lang="ru">
    <Head>
      <script type="text/javascript" dangerouslySetInnerHTML={create()} />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
