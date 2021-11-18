import { isMobile, isIOS, isTablet } from 'react-device-detect';
import * as React from 'react';

export const isSmoothScrollable = isIOS || isMobile || isTablet;

export const useFixScroll = (
  scrollContainerRef: React.RefObject<HTMLElement>,
  scrollerRef: React.RefObject<HTMLElement>,
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps: any[] = [],
): void => {
  React.useEffect(() => {
    if (scrollContainerRef.current === null || scrollerRef.current === null || !isSmoothScrollable) {
      return;
    }
    const scrollContainer = scrollContainerRef.current;
    const scroller = scrollerRef.current;

    let is_top = true;
    let is_bottom = false;
    let moving: NodeJS.Timeout;

    const setPos = (v: number) => {
      if (moving) clearTimeout(moving);
      moving = setTimeout(() => {
        scrollContainer.scrollTop = v;
        if (v === 1) {
          is_top = false;
        } else {
          is_bottom = false;
        }
      }, 10);
    };

    const scrollHandler = () => {
      const t = scrollContainer.scrollTop;
      const h = Math.ceil(scroller.offsetHeight - scrollContainer.offsetHeight);

      if (t < 0) {
        is_top = true;
      } else if (is_top) {
        setPos(1);
      }

      if (t > h) {
        is_bottom = true;
      } else if (is_bottom) {
        setPos(t - 1);
      }
    };

    scrollContainer.addEventListener('scroll', scrollHandler);

    return () => {
      scrollContainer.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollContainerRef, scrollerRef]);

  React.useEffect(() => {
    if (scrollContainerRef.current === null || scrollerRef.current === null || !isSmoothScrollable) {
      return;
    }
    if (scrollContainerRef.current.scrollTop === 0) {
      scrollContainerRef.current.scrollTop = 1;
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, scrollContainerRef, scrollerRef]);
};
