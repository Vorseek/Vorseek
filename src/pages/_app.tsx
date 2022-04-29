import 'assets/styles/globals.css';
import 'simplebar/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { linkStyles } from 'const';

interface Props extends AppProps {
  stars: number;
  timeInitialProps: string;
}

const MyApp = ({ Component, pageProps, stars, timeInitialProps }: Props) => {
  const {
    asPath,
    query: { after },
  } = useRouter();

  return (
    <SimpleBar className="simple-scroll-custom">
      <a href={asPath?.split('?')[0]} style={linkStyles}>
        Worker
      </a>
      <a href={`${asPath}?after=true`} style={linkStyles}>
        afterInteractive
      </a>
      <Component {...pageProps} stars={stars} timeInitialProps={timeInitialProps} />

      {/* scripts zone */}

      {after ? (
        <Script
          id="googletagmanager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
 new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
 j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
 })(window,document,'script','dataLayer','GTM-WD9827X');`,
          }}
        />
      ) : (
        <Script
          id="googletagmanager"
          strategy="worker"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-WD9827X"
        />
      )}
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
