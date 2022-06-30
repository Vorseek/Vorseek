import axios from 'axios';
import type { GetServerSideProps } from 'next';
import React from 'react';

const serverside = ({ location }) => (
  <div>
    location: {JSON.stringify(location)}
    <h1>ServerSide</h1>
  </div>
);

export default serverside;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { headers } = req;

  const location = await axios.get('https://kind-johnson-e58017.netlify.app/geolocation', {
    headers: headers as Record<string, any>,
  });

  return {
    props: { location: location.data || null }, // will be passed to the page component as props
  };
};
