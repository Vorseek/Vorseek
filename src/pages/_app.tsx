import 'assets/styles/globals.css';
import 'simplebar/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import Script from 'next/script';
import { yandexMetricScript } from 'utils';

interface Props extends AppProps {
  stars: number;
  timeInitialProps: string;
}
const getIsSlowNetwork = () => {
  if (typeof window !== 'undefined') {
    return window.navigator.connection.downlink < 2;
  }

  return false;
};

const MyApp = ({ Component, pageProps, stars, timeInitialProps }: Props) => {
  const isSlowConnect = getIsSlowNetwork();

  return (
    <SimpleBar className="simple-scroll-custom">
      <Component {...pageProps} stars={stars} timeInitialProps={timeInitialProps} />

      {/* scripts zone */}
      {isSlowConnect ? (
        <Script
          id="yandex-metric"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={yandexMetricScript()}
        />
      ) : null}
    </SimpleBar>
  );
};

MyApp.getInitialProps = async () => {
  // TODO: remove / default function
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const json = await res.json();

  const timeInitialProps = `Initial => _app
  date: ${new Date().getDate()} 
  hours: ${new Date().getHours()} 
  minutes: ${new Date().getMinutes()} 
  `;

  return { stars: json.stargazers_count, timeInitialProps };
};

export default MyApp;

export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case 'FCP':
      // eslint-disable-next-line no-console
      console.log('FCP', metric.value);
      break;
    case 'LCP':
      // eslint-disable-next-line no-console
      console.log('LCP', metric.value);
      break;
    case 'CLS':
      // eslint-disable-next-line no-console
      console.log('CLS', metric.value);
      break;
    case 'FID':
      // eslint-disable-next-line no-console
      console.log('FID', metric.value);
      break;
    case 'TTFB':
      // eslint-disable-next-line no-console
      console.log('TTFB', metric.value);
      break;
    default:
      break;
  }
}
