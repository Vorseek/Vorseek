export const yandexMetricScript = () => ({
  __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(88665534, "init", {
clickmap:true,
trackLinks:true,
accurateTrackBounce:true,
webvisor:true
});`,
});

export const getIsSlowNetwork = () => {
  if (typeof window !== 'undefined') {
    return window.navigator.connection.downlink < 2;
  }

  return false;
};

export const calculatePerformanceTime = (func: () => void) => {
  const startTime = window.performance.now();

  func();

  const endTime = window.performance.now();

  const time = endTime - startTime;
  return time > 0 ? time : 0.1;
};
