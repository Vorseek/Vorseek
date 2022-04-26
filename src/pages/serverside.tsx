import React from 'react';
import type { GetServerSideProps } from 'next';

const serverside = () => (
  <div>
    <h1>ServerSide</h1>
  </div>
);

export default serverside;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=59');

  return {
    props: {}, // will be passed to the page component as props
  };
};
