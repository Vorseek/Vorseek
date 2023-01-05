import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => (
  <Html lang="ru">
    <Head />
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js" />
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
