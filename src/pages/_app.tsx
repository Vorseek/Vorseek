import 'assets/styles/globals.css';
import 'simplebar/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import { useRouter } from 'next/router';

interface Props extends AppProps {
  stars: number;
  timeInitialProps: string;
}

const MyApp = ({ Component, pageProps, stars, timeInitialProps }: Props) => {
  const router = useRouter();

  return (
    <SimpleBar className="simple-scroll-custom">
      <Component {...pageProps} stars={stars} timeInitialProps={timeInitialProps} />
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
      console.log('FCP', metric.value);
      break;
    case 'LCP':
      console.log('LCP', metric.value);
      break;
    case 'CLS':
      console.log('CLS', metric.value);
      break;
    case 'FID':
      console.log('FID', metric.value);
      break;
    case 'TTFB':
      console.log('TTFB', metric.value);
      break;
    default:
      break;
  }
}
