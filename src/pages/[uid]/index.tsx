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

  const arr = new Array(10).fill(null);

  const result = [] as Promise<AxiosResponse<any, any>>[];

  arr.forEach(async () => {
    const image = axios.get(
      'https://images.pexels.com/photos/5998117/pexels-photo-5998117.jpeg?cs=srgb&dl=pexels-max-vakhtbovych-5998117.jpg&fm=jpg'
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
  return {
    paths: [{ params: { uid: '1' } }, { params: { uid: '2' } }],
    fallback: false,
  };
}

export default StaticProps;
