import { useState, useRef, useEffect } from 'react';

const useDimensions = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, size: 0 });
  const ref = useRef();

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const { offsetWidth, offsetHeight } = ref.current;
        const size = Math.min(offsetWidth, offsetHeight);
        setDimensions({
          width: offsetWidth,
          height: offsetHeight,
          size: size
        });
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return [ref, dimensions];
};

export default useDimensions;