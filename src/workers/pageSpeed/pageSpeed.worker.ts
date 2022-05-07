import axios from 'axios';
import { PageSpeedData } from 'types';

interface DataEvent {
  url?: string;
  count?: string;
  strategy?: string;
}

const PAGE_SPEED_KEY = 'AIzaSyD6CQTIkDv3fMgyj3sthUcpXI-0YNWuRW0';

const getCategoriesPerformance = (pageSpeedResponse: PageSpeedData[]) =>
  pageSpeedResponse.map((testResult) => testResult.lighthouseResult.categories.performance.score);

const getPageSpeedResult = (pageSpeedResponse: PageSpeedData[]) => {
  const categoriesPerformance = getCategoriesPerformance(pageSpeedResponse);
  const sumResult = categoriesPerformance.reduce((prev, current) => prev + current, 0);
  const avrResultTest = (sumResult / pageSpeedResponse.length) * 100;

  return { categoriesPerformance, avrResultTest };
};

addEventListener('message', async (event: MessageEvent<DataEvent>) => {
  const { url, count = 0, strategy } = event.data;

  postMessage({
    loading: true,
    count,
    strategy,
    pageSpeedResponse: null,
    categoriesPerformance: null,
    avrResultTest: null,
    requestTime: null,
  });

  try {
    if (!url) {
      throw new Error();
    }

    const startDate = +new Date();

    const countRequest = new Array(+count).fill(null);
    const pageSpeedResponse = [] as PageSpeedData[];

    for (const elem of countRequest) {
      const { data } = await axios.get(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${PAGE_SPEED_KEY}&strategy=${strategy}&category=performance`
      );

      pageSpeedResponse.push(data);

      postMessage(getPageSpeedResult(pageSpeedResponse));
    }

    const { categoriesPerformance, avrResultTest } = getPageSpeedResult(pageSpeedResponse);

    const requestTime = (+new Date() - startDate) / 1000;

    postMessage({
      categoriesPerformance,
      avrResultTest,
      requestTime,
      strategy,
      loading: false,
    });
  } catch {
    postMessage({ loading: false });
  } finally {
    postMessage({ loading: false });
  }
});
