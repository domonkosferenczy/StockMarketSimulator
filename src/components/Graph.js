import React, { useLayoutEffect, useState, useContext} from 'react';
import Xaxis from './Graph/Xaxis'
import Yaxis from './Graph/Yaxis'
import Datapoints from './Graph/Datapoints'
import 'stylesheet/App.css';
import { StoreContext } from './Store';
import { DataContext } from './Data';

function Graph() {

  const [state, dispatch] = useContext(StoreContext);
  const data = useContext(DataContext);
  const [stateOff, setStateOff] = useState(0)

  const textWidthHandler = len => {
    if (stateOff !== len){
      setStateOff(len)
    }
  }

  const [width, height] = useWindowSize();
  const windowWidth = Math.round(width * 0.738);
  const windowHeight = Math.round(height * 0.74);
  const unit = {x: windowWidth / 20, y: windowHeight / 20}

  const allDates = Object.keys(data.stocks[state.animation.chosen].datapoints);
  const shownDates = allDates.slice(allDates.indexOf(state.animation.shownFrom), allDates.indexOf(state.animation.currentDate)+1)
  const constants = {min: Number.MAX_VALUE, max: Number.MIN_VALUE}
  for(let i = 0; i < shownDates.length; i++){
    if(data.stocks[state.animation.chosen].datapoints[shownDates[i]].close < constants.min){
      constants.min = data.stocks[state.animation.chosen].datapoints[shownDates[i]].close
    }
    if(data.stocks[state.animation.chosen].datapoints[shownDates[i]].close > constants.max){
      constants.max = data.stocks[state.animation.chosen].datapoints[shownDates[i]].close
    }
  }
  if(constants.max === constants.min){
    constants.max = constants.max + 40
  }

  return (
    <div className="Graph">
      <svg viewBox={"0 0 " + windowWidth + " " + windowHeight} width="100%" height="100%" style={{transform: "rotateZ(180deg) rotateY(180deg)"}} >
        <Xaxis stateOff={stateOff} width={windowWidth} height={windowHeight} unit={unit} />
        <Yaxis stateOff={stateOff} width={windowWidth} height={windowHeight} unit={unit} constants={constants} textWidthHandler={(len) => textWidthHandler(len)}/>
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
    window.addEventListener('fullscreenchange', updateSize);
    updateSize();
    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('fullscreenchange', updateSize);
    }
    }, []);
  return size;
}

export default Graph;
