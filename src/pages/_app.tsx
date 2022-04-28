import 'assets/styles/globals.css';
import 'simplebar/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

interface Props extends AppProps {
  stars: number;
  timeInitialProps: string;
}

const MyApp = ({ Component, pageProps, stars, timeInitialProps }: Props) => {
  const router = useRouter();

  return (
    <SimpleBar className="simple-scroll-custom">
      <h1>Router locale {router.locale}</h1>
      <Component {...pageProps} stars={stars} timeInitialProps={timeInitialProps} />
      <h1>
        {timeInitialProps?.split('\n').map((text) => (
          <p key={text}>{text}</p>
        ))}
      </h1>
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
