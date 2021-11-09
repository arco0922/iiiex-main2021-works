export const judgeElementInViewPort = (elem: HTMLElement): boolean => {
  const container = elem.parentNode as HTMLElement;
  const containerRect = container.getBoundingClientRect();
  const containerClientHeight = containerRect.bottom - containerRect.top;
  return (
    container.scrollTop + containerClientHeight >= elem.offsetTop + elem.offsetHeight &&
    container.scrollTop <= elem.offsetTop
  );
};
