import axios from 'axios';
import type { GetServerSideProps } from 'next';
import React from 'react';

const serverside = ({ location, headers, ip }) => {
  console.log(headers);

  return (
    <div>
      location: {JSON.stringify(location)}
      <h1>ServerSide</h1>
      {ip}
    </div>
  );
};

export default serverside;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { headers } = req;

  const forwarded = headers['x-forwarded-for'] as string | undefined;

  const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;

  const location = await axios.get('https://kind-johnson-e58017.netlify.app/geolocation', {
    headers: {
      'x-forwarded-for': ip,
    },
  });

  return {
    props: { location: location.data || null, headers, ip }, // will be passed to the page component as props
  };
};
