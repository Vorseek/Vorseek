import styles from 'assets/styles/Home.module.css';
import Header from 'components/HomePage/Header';
import Laptop from 'components/HomePage/Laptop';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>Vorseek</title>
      <meta name="description" content="Vorseek" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <Laptop />

    <Image
      src="https://i.ytimg.com/vi/UKl7R5bpVeQ/maxresdefaultx.jpg"
      width={500}
      height={500}
      onError={() => {
        console.log('error');
      }}
    />

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

export default Home;
