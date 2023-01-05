import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => (
  <Html lang="ru">
    <Head />
    <script
      src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"
      integrity="sha384-r1y8TJcloKTvouxnYsi4PJAx+nHNr90ibsEn3zznzDzWBN9X3o3kbHLSgcIPtzAp"
      crossOrigin="anonymous"
    />
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
