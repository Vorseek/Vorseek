import classNames from 'classnames';
import styles from 'components/AnimationPage/style.module.css';
import type { FunctionComponent } from 'react';
import React from 'react';

export const MainComponent: FunctionComponent = () => {
  const [array, setArray] = React.useState(new Array(1));
  const [isAnimation, setIsAnimation] = React.useState(false);
  const [isBigImage, setIsBigImage] = React.useState(false);

  return (
    <div className={styles.container}>
      <title>{array.length}</title>
      <button
        type="button"
        onClick={() => {
          setArray((prev) => [...prev, null]);
        }}
      >
        Add 1 img
      </button>
      <button
        type="button"
        onClick={() => {
          setArray((prev) => [...prev, ...new Array(10)]);
        }}
      >
        Add 10 img
      </button>
      <button
        type="button"
        onClick={() => {
          setIsAnimation((prev) => !prev);
        }}
      >
        Set animation
      </button>
      <button
        type="button"
        onClick={() => {
          setArray((prev) => [...prev.slice(0, prev.length - 10)]);
        }}
      >
        Delete 10 img
      </button>
      <button
        type="button"
        onClick={() => {
          setArray((prev) => [...prev.slice(0, prev.length - 1)]);
        }}
      >
        Delete 1 img
      </button>
      <button
        type="button"
        onClick={() => {
          setIsBigImage((prev) => !prev);
        }}
      >
        Set big image
      </button>
      <div className={styles.wrapper}>
        {array.fill(null).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={index}>
            <img
              alt="img"
              src="/cat.jpeg"
              className={classNames(styles.img, {
                [styles.animation]: isAnimation,
                [styles.bigImage]: isBigImage,
              })}
            />
            <div
              className={classNames(styles.backgroundImg, {
                [styles.animation]: isAnimation,
                [styles.bigImage]: isBigImage,
              })}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
