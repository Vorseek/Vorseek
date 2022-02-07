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

export default MyApp;
