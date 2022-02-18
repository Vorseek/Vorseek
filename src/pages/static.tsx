import React from 'react';

const StaticProps = ({ context }) => {
  console.log(context);
  return (
    <div>
      <h1>static</h1>
    </div>
  );
};

export default StaticProps;

export async function getStaticProps(context) {
  return {
    props: { context }, // will be passed to the page component as props
  };
}
