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
      resolve(new Date().getSeconds());
    }, 3000);
  });

  return {
    props: { res }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { uid: '1' } }, { params: { uid: '2' } }],
    fallback: false,
  };
}

export default StaticProps;
