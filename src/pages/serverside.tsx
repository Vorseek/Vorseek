import axios from 'axios';
import type { GetServerSideProps } from 'next';
import React from 'react';

const serverside = ({ location, headers, ip, headersRes }) => {
  console.log({ headers, headersRes });

  return (
    <div>
      location: {JSON.stringify(location)}
      <h1>ServerSide</h1>
      {ip}
    </div>
  );
};

export default serverside;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { headers } = req;
  const headersRes = res.getHeaders();

  const forwarded = headers['x-forwarded-for'] as string | undefined;

  const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;

  const location = await axios.get('https://kind-johnson-e58017.netlify.app/geolocation', {
    headers: {
      'x-forwarded-for': ip,
    },
  });

  return {
    props: { location: location.data || null, headers, ip, headersRes }, // will be passed to the page component as props
  };
};
