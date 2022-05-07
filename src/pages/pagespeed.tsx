import { usePageSpeedRequest } from 'hooks/usePageSpeedRequest';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { CONTENT_WRAPPER, FORM_STYLES, INPUT_STYLES, LOADING_STYLES } from 'styles';

const InputRedirect = ({ loading }) => {
  const ref = useRef(null);
  const {
    push,
    query: { url, count },
  } = useRouter();

  const [urlForPageSpeed, setUrlForPageSpeed] = useState(url);
  const [numberOfRequest, setNumberOfRequest] = useState(count || '10');

  useEffect(() => {
    const handleFocus = () => {
      if (ref.current) {
        ref.current.focus();
      }
    };

    handleFocus();

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
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

const PageSpeed = () => {
  const {
    query: { count },
  } = useRouter();
  const { response } = usePageSpeedRequest();
  const { categoriesPerformance, avrResultTest, requestTime, strategy, loading } = response;

  const countRequest = count ? ` ${categoriesPerformance?.length || 0} / ${count}` : '';

  return (
    <div>
      <InputRedirect loading={loading} />
      <div style={CONTENT_WRAPPER}>
        <p>Count request: {countRequest}</p>
        <p>Results: {JSON.stringify(categoriesPerformance)}</p>
        <p>
          Avr {strategy} result (strategy: MOBILE | DESKTOP): {avrResultTest}
        </p>
        <p>Request time (sec): {requestTime}</p>
      </div>
    </div>
  );
};

export default PageSpeed;
