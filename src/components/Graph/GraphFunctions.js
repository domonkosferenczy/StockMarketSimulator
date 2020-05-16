import { useState, useLayoutEffect } from 'react';

// Return with the size of the GraphContainer in px
export const useContainerSize = () => {
    const [size, setSize] = useState({width: 0, height: 0});
    useLayoutEffect(() => {
      function updateSize() {
        const graphContainer = document.getElementById("GraphID")
        setSize({width: graphContainer.offsetWidth, height: graphContainer.offsetHeight});
      }
      window.addEventListener('resize', updateSize);
      window.addEventListener('fullscreenchange', updateSize);
      updateSize();
      return () => {
        window.removeEventListener('resize', updateSize);
        window.removeEventListener('fullscreenchange', updateSize);
      }
    }, []);
    return size;
  }

