import { calculatePerformanceTime } from 'utils';

const PerformancePage = () => {
  const handler = async () => {
    // requestIdleCallback(() => {
    //   const time = calculatePerformanceTime(() => {
    //     new Array(100_000_000).fill(null).forEach(Boolean);
    //   });
    //
    //   console.log(time, 'idle callback');
    // });

    const time = calculatePerformanceTime(() => {
      new Array(1000000).fill({ test: 'test', data: { data: {} } }).forEach(Boolean);
    });

    console.log(time, 'callback');

    const time2 = calculatePerformanceTime(() => {
      new Array(1000000)
        .fill({ test: 'test', data: { data: {} } })
        .forEach((el) => Boolean({ ...el }));
    });

    console.log(time2, 'callback 2');

    console.log((time2 / time) * 100 - 100, '%');

    // const startTime = window.performance.now();
    //
    // new Array(100_000_000).fill(null).forEach(Boolean);
    //
    // const endTime = window.performance.now();
    //
    // console.log(endTime - startTime, 'test test test');
  };

  return (
    <button type="button" onClick={handler}>
      Test Performance
    </button>
  );
};

export default PerformancePage;
