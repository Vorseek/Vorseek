import React from 'react';
import type { GetServerSideProps } from 'next';
import axios, { AxiosResponse } from 'axios';

const serverside = ({ min }) => (
  <div>
    min: {min}
    <h1>ServerSide</h1>
  </div>
);

export default serverside;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=59');

  // const min = await new Promise((resolve) => {
  // setTimeout(() => {
  // resolve(new Date().getMinutes());
  // }, 1000);
  // });
  const arr = new Array(1).fill(null);

  const result = [] as Promise<AxiosResponse>[];

  arr.forEach(async () => {
    const image = axios.get(
      'https://images.pexels.com/photos/11254131/pexels-photo-11254131.jpeg?cs=srgb&dl=pexels-summer-rune-11254131.jpg&fm=jpg&w=900&h=800'
    );

    result.push(image);
  });

  return {
    props: { res }, // will be passed to the page component as props
  };
};
