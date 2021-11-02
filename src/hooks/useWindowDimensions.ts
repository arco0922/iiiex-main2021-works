import { useState, useEffect } from 'react';

/*
HOW to use this hooks

1. import this file
import { useWindowDimensions } from 'hooks/useWindowDimensions';

2. add function before return 
const { height, width } = useWindowDimensions();

3. call {width} and {heiht} in return ( );
<div>
    width: {width} ~ height: {height}
</div>
*/

interface WindowDimensions {
  width: number;
  height: number;
}

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};
