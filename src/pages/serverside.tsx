import React from 'react';
import type { GetServerSideProps } from 'next';

const serverside = ({ min }) => (
  <div>
    min: {min}
    <h1>ServerSide</h1>
  </div>
);

export default serverside;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=59');

  const min = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(new Date().getMinutes());
    }, 1000);
  });

  return {
    props: { min }, // will be passed to the page component as props
  };
};
