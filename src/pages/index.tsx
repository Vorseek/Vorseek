import styles from 'assets/styles/Home.module.css';
import Header from 'components/HomePage/Header';
import Laptop from 'components/HomePage/Laptop';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

const Home: NextPage = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute(
      'integrity',
      'sha512-aVKKRRi/Q/YV+4mjoKBsE4x3H+BkegoM/em46NNlCqNTmUYADjBbeNefNxYV7giUp0VxICtqdrbqU7iVaeZNXA=='
    );

    document.head.appendChild(script);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Vorseek</title>
        <meta name="description" content="Vorseek" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Laptop />

      <Link href="/serverside">to serverside page</Link>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
