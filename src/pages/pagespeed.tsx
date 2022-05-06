import axios from 'axios';
import type { GetServerSideProps } from 'next';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { CONTENT_WRAPPER, FORM_STYLES, INPUT_STYLES, LOADING_STYLES } from 'styles';
import { PageSpeedData } from 'types';

const PAGE_SPEED_KEY = 'AIzaSyD6CQTIkDv3fMgyj3sthUcpXI-0YNWuRW0';

const InputRedirect = () => {
  const ref = useRef(null);
  const {
    push,
    query: { url, count },
  } = useRouter();

  const [urlForPageSpeed, setUrlForPageSpeed] = useState(url);
  const [numberOfRequest, setNumberOfRequest] = useState(count || '10');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const focusHandle = () => {
      if (ref.current) {
        ref.current.focus();
      }
    };

    focusHandle();

    const changeLoading = () => setLoading((value) => !value);

    Router.events.on('routeChangeStart', changeLoading);
    Router.events.on('routeChangeComplete', changeLoading);
    window.addEventListener('focus', focusHandle);

    return () => {
      Router.events.off('routeChangeStart', changeLoading);
      Router.events.off('routeChangeComplete', changeLoading);
      window.removeEventListener('focus', focusHandle);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    push({ query: { url: urlForPageSpeed, count: numberOfRequest } });
  };

  const handleUrlChange = (event) => {
    setUrlForPageSpeed(event.target.value);
  };
  const handleCountChange = (event) => {
    setNumberOfRequest(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={FORM_STYLES}>
        <input
          ref={ref}
          type="text"
          name="url"
          style={INPUT_STYLES}
          placeholder="url"
          defaultValue={url}
          onChange={handleUrlChange}
        />
        <input
          type="number"
          name="request-count"
          style={INPUT_STYLES}
          placeholder="count"
          defaultValue={numberOfRequest}
          onChange={handleCountChange}
        />
        <input type="submit" hidden />
      </form>
      {loading && (
        <h1 style={LOADING_STYLES} className="loading">
          loading <span>.</span> <span>.</span> <span>.</span>
        </h1>
      )}
    </>
  );
};

const PageSpeed = ({ categoriesPerformance, avrResultTest, requestTime, strategy }) => (
  <div>
    <InputRedirect />
    <div style={CONTENT_WRAPPER}>
      <p>Count request: {categoriesPerformance?.length}</p>
      <p>Results: {JSON.stringify(categoriesPerformance)}</p>
      <p>
        Avr {strategy} result (strategy: MOBILE | DESKTOP): {avrResultTest}
      </p>
      <p>Request time (sec): {requestTime}</p>
    </div>
  </div>
);

export default PageSpeed;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { url, count, strategy = 'MOBILE' } = query;

  if (!url) {
    return {
      props: {},
    };
  }

  const startDate = +new Date();

  const arr = new Array(+count).fill(null);

  const pageSpeedResponse = [] as PageSpeedData[];

  const pageSpeedRequest = () =>
    axios
      .get(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${PAGE_SPEED_KEY}&strategy=${strategy}&category=performance`
      )
      .then(async (el) => {
        pageSpeedResponse.push(el.data);

        if (pageSpeedResponse.length < arr.length) {
          await pageSpeedRequest();
        }
      });

  await pageSpeedRequest();

  const categoriesPerformance = pageSpeedResponse.map(
    (testResult) => testResult.lighthouseResult.categories.performance.score
  );

  const sumResult = categoriesPerformance.reduce((prev, current) => prev + current, 0);

  const avrResultTest = (sumResult / pageSpeedResponse.length) * 100;

  const requestTime = (+new Date() - startDate) / 1000;

  return {
    props: { categoriesPerformance, avrResultTest, requestTime, strategy },
  };
};
