import React from 'react';

const serverside = () => (
  <div>
    <h1>ServerSide</h1>
  </div>
);

export default serverside;

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}