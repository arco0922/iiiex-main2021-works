import { useState, useEffect } from 'react';

/*
HOW to use this hooks

1. import this file
import useWindowDimensions from 'hooks/useWindowDimensions';

2. add function before return 
const { height, width } = useWindowDimensions();

3. call {width} and {heiht} in return ( );
<div>
    width: {width} ~ height: {height}
</div>
*/

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
