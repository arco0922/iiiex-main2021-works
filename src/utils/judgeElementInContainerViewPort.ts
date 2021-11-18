import * as React from 'react';

export const judgeElementInContainerViewPort = (
  elementRef: React.RefObject<HTMLElement>,
  containerRef: React.RefObject<HTMLElement>,
): boolean | undefined => {
  const element = elementRef.current;
  const container = containerRef.current;

  if (element === null || container === null) {
    return;
  }

  const containerRect = container.getBoundingClientRect();
  const containerClientHeight = containerRect.bottom - containerRect.top;
  return (
    container.scrollTop + containerClientHeight >= element.offsetTop + element.offsetHeight &&
    container.scrollTop <= element.offsetTop
  );
};
