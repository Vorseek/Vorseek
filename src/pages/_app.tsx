import 'assets/styles/globals.css';
import 'simplebar/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SimpleBar className="simple-scroll-custom">
      <Component {...pageProps} />
    </SimpleBar>
  );
}

MyApp.getInitialProps = async () => {
  // TODO: remove / default function
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const json = await res.json();
  return { stars: json.stargazers_count };
};

export default MyApp;
