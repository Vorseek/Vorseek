import React from 'react';

const StaticProps = () => (
  <div>
    <h1>static</h1>
  </div>
);

export default StaticProps;

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
