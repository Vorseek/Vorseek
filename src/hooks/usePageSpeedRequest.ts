import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PageSpeedData } from 'types';

const PAGE_SPEED_KEY = 'AIzaSyD6CQTIkDv3fMgyj3sthUcpXI-0YNWuRW0';

interface PageSpeedResponse {
  categoriesPerformance?: number[];
  avrResultTest?: number;
  requestTime?: number;
  strategy?: string | string[];
  loading?: boolean;
}

export const usePageSpeedRequest = () => {
  const router = useRouter();
  const { url, count, strategy = 'MOBILE' } = router.query;

  const [response, setResponse] = useState<PageSpeedResponse>({});

  const request = (): unknown => {
    if (!url) {
      return;
    }

    setResponse((prev) => ({ ...prev, loading: true }));
    const startDate = +new Date();

    const pageSpeedResponse = [] as PageSpeedData[];

    const pageSpeedRequest = () =>
      axios
        .get(
          `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${PAGE_SPEED_KEY}&strategy=${strategy}&category=performance`
        )
        .then(async (el) => {
          pageSpeedResponse.push(el.data);

          if (pageSpeedResponse.length < +count) {
            await pageSpeedRequest();
          }
        });

    pageSpeedRequest().then(() => {
      const categoriesPerformance = pageSpeedResponse.map(
        (testResult) => testResult.lighthouseResult.categories.performance.score
      );

      const sumResult = categoriesPerformance.reduce((prev, current) => prev + current, 0);

      const avrResultTest = (sumResult / pageSpeedResponse.length) * 100;

      const requestTime = (+new Date() - startDate) / 1000;

      setResponse({
        categoriesPerformance,
        avrResultTest,
        requestTime,
        strategy,
        loading: false,
      });
    });
  };

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return { response };
};
