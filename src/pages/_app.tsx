import 'assets/styles/globals.css';
import { linkStyles } from 'const';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

interface Props extends AppProps {
  stars: number;
  timeInitialProps: string;
}

const MyApp = ({ Component, pageProps, stars, timeInitialProps }: Props) => {
  const {
    asPath,
    query: { after },
    push,
  } = useRouter();

  // useEffect(() => {
  //   window.dataLayer = [];
  //
  //   const script = document.createElement('script');
  //   script.async = true;
  //   // script.type = 'text/partytown';
  //   script.src = `https://www.googletagmanager.com/gtm.js?id=GTM-KN43R7Q`;
  //   window.document.head.prepend(script);
  //
  //   script.onload = () => {
  //     console.log(window.google_tag_manager);
  //   };
  //   script.onerror = (error) => {
  //     console.error('Failed to load GTM script', error);
  //   };
  // }, []);

  const [state, setState] = useState(true);

  useEffect(() => {
    let test = true;

    const handleMove = () => {
      if (!state || !test) {
        return;
      }
      test = false;

      const innerScript = document.createElement('script');

      innerScript.innerHTML =
        'var cpm = {};\n' +
        '(function(h,u,b){\n' +
        'var d=h.getElementsByTagName("script")[0],e=h.createElement("script");\n' +
        "e.async=true;e.src='https://cookiehub.net/c2/be78eaaf.js';\n" +
        'e.onload=function(){u.cookiehub.load(b);}\n' +
        'd.parentNode.insertBefore(e,d);\n' +
        '})(document,window,cpm);';

      window.document.head.prepend(innerScript);

      const gtmScript = document.createElement('script');
      gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-KN43R7Q';
      window.document.head.prepend(gtmScript);

      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('scroll', handleMove);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('scroll', handleMove);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('scroll', handleMove);
    };
  }, [state]);

  return (
    <SimpleBar className="simple-scroll-custom">
      <a href={asPath?.split('?')[0]} style={linkStyles}>
        Worker
      </a>
      <a href={`${asPath}?after=true`} style={linkStyles}>
        afterInteractive
      </a>
      <Link href="/serverside">
        <a style={linkStyles}>To</a>
      </Link>
      <button
        type="button"
        onClick={() => {
          push('/');
        }}
      >
        Back
      </button>
      <Component {...pageProps} stars={stars} timeInitialProps={timeInitialProps} />

      {/* scripts zone */}

      {/*     {after ? ( */}
      {/*       <> */}
      {/*         <Script */}
      {/*           id="googletagmanager" */}
      {/*           strategy="afterInteractive" */}
      {/*           dangerouslySetInnerHTML={{ */}
      {/*             __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': */}
      {/* new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], */}
      {/* j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= */}
      {/* 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); */}
      {/* })(window,document,'script','dataLayer','GTM-WD9827X');`, */}
      {/*           }} */}
      {/*         /> */}
      {/*         <Script */}
      {/*           id="CookieHub" */}
      {/*           strategy="afterInteractive" */}
      {/*           dangerouslySetInnerHTML={{ */}
      {/*             __html: */}
      {/*               'var cpm = {};\n' +*/}
      {/*               '(function(h,u,b){\n' +*/}
      {/*               'var d=h.getElementsByTagName("script")[0],e=h.createElement("script");\n' +*/}
      {/*               "e.async=true;e.src='https://cookiehub.net/c2/be78eaaf.js';\n" +*/}
      {/*               'e.onload=function(){u.cookiehub.load(b);}\n' +*/}
      {/*               'd.parentNode.insertBefore(e,d);\n' +*/}
      {/*               '})(document,window,cpm);', */}
      {/*           }} */}
      {/*         /> */}
      {/*       </> */}
      {/*     ) : ( */}
      {/*       <Script */}
      {/*         id="googletagmanager" */}
      {/*         strategy="worker" */}
      {/*         src="https://www.googletagmanager.com/gtm.js?id=GTM-KN43R7Q" */}
      {/*       /> */}
      {/*     )} */}
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
