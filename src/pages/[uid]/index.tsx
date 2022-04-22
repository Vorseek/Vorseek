import axios, { AxiosResponse } from 'axios';
import React from 'react';

const StaticProps = ({ res }) => (
  <div>
    {res}
    <h1>static</h1>
  </div>
);

export async function getStaticProps() {
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `Build
          date:${new Date().getDate()} 
          hours: ${new Date().getHours()} 
          minutes: ${new Date().getMinutes()} 
          seconds: ${new Date().getSeconds()}
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

export async function getStaticPaths() {
  const paths = new Array(20).fill(null).map((_, index) => ({ params: { uid: `${index + 1}` } }));

  return {
    paths,
    fallback: true,
  };
}

export default StaticProps;
