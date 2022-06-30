import type { GetServerSideProps } from 'next';
import React from 'react';

const index = ({ location, headers, ip }) => {
  console.log({ headers });

  return (
    <div>
      location: {JSON.stringify(location)}
      <h1>ServerSide</h1>
      {ip}
    </div>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { headers } = req as any;

  const forwarded = headers['x-forwarded-for'] as string | undefined;

  const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;

  const location = await fetch('https://kind-johnson-e58017.netlify.app/geolocation', {
    headers: { 'x-real-ip': '54.93.50.54' || ip, 'x-forwarded-for': '54.93.50.54' },
  }).then((value) => value.json());

  return {
    props: { location: location || null, headers }, // will be passed to the page component as props
  };
};
