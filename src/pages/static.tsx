import axios, { AxiosResponse } from 'axios';
import { NextPage } from 'next';
import React from 'react';

interface Props {
  res: string;
  timeInitialProps: string;
}

const StaticProps: NextPage<Props> = (props) => {
  const { res, timeInitialProps } = props;

  return (
    <div>
      <p>Static build</p>
      {res?.split('\n').map((text) => (
        <p key={text}>{text}</p>
      ))}
      <h1>static</h1>
      <p>InitialProps</p>
      {timeInitialProps?.split('\n').map((text) => (
        <p key={text}>{text}</p>
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `StaticProps build
          date: ${new Date().getDate()}
          hours: ${new Date().getHours()}
          minutes: ${new Date().getMinutes()} 
          `
      );
    }, 3000);
  });

  const arr = new Array(1).fill(null);

  const result = [] as Promise<AxiosResponse>[];

  arr.forEach(async () => {
    const image = axios.get(
      'https://images.pexels.com/photos/11254131/pexels-photo-11254131.jpeg?cs=srgb&dl=pexels-summer-rune-11254131.jpg&fm=jpg&w=1920&h=2868'
    );

    result.push(image);
  });

  const largeImageArr = await Promise.all(result).then((values) =>
    values.map((el) => JSON.stringify(el.data))
  );

  return {
    props: { res, largeImageArr },
  };
}

export default StaticProps;
