import React, { useLayoutEffect, useState } from 'react';
import Xaxis from './Graph/Xaxis'
import Yaxis from './Graph/Yaxis'
import Datapoints from './Graph/Datapoints'
import 'stylesheet/App.css';

function Graph() {

  const [width, height] = useWindowSize();
  let windowWidth = Math.round(width * 0.738);
  let windowHeight = Math.round(height * 0.74);
  let unit = {x: windowWidth / 20, y: windowHeight}

  return (
    <div className="Graph">
      <div className="GraphTicker">
        AAPL
      </div>
      <svg viewBox={"0 0 " + windowWidth + " " + windowHeight} width="100%" height="100%" style={{transform: "rotateZ(180deg) rotateY(180deg)"}} >
        <Yaxis width={windowWidth} height={windowHeight} unit={unit} />
        <Xaxis width={windowWidth} height={windowHeight} unit={unit} />
        <Datapoints />
      </svg>
    </div>
  )
}

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default Graph;
