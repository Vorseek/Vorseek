import React from 'react';

const Error = ({ statusCode }) => (
  <div>
    <h1>error, status: {statusCode}</h1>
  </div>
);

// Error.getInitialProps = ({ asPath, err, res }) => {
//   const statusCode = res?.statusCode || err?.statusCode || 404;
//
//   if (asPath && asPath !== asPath.toLowerCase()) {
//     res.writeHead(307, { Location: asPath.toLowerCase() });
//     res.end();
//   }
//
//   return { statusCode };
// };

export default Error;
