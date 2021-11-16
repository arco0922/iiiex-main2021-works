import { isMobile } from 'react-device-detect';
import * as React from 'react';

export const useFixScroll = (
  scrollContainerRef: React.RefObject<HTMLElement>,
  scrollerRef: React.RefObject<HTMLElement>,
): void => {
  React.useEffect(() => {
    if (scrollContainerRef.current === null || scrollerRef.current === null || !isMobile) {
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

    // 最初にページ上部にいるときは、1px下に移動する
    if (scrollContainer.scrollTop === 0) {
      scrollContainer.scrollTop = 1;
    }

    scrollContainer.addEventListener('scroll', scrollHandler);

    return () => {
      scrollContainer.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollContainerRef, scrollerRef]);
};
