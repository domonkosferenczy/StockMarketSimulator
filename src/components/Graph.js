import React, { useLayoutEffect, useState, useContext, useEffect} from 'react';
import Xaxis from './Graph/Xaxis'
import Yaxis from './Graph/Yaxis'
import Datapoints from './Graph/Datapoints'
import 'stylesheet/App.css';
import { StoreContext } from './Store';
import { DataContext } from './Data';

function Graph(props) {

  const [state] = useContext(StoreContext);
  const data = useContext(DataContext);
  const container = useContainerSize();

  const chosenDatapoints = data.stocks[state.animation.chosen].datapoints
  const allDates = Object.keys(chosenDatapoints);
  const shownDates = allDates.slice(allDates.indexOf(state.animation.shownFrom), allDates.indexOf(state.animation.currentDate)+1)
  const constants = {min: Number.MAX_VALUE, max: Number.MIN_VALUE, maxLength: 0}

  const listOfNumbers = []
  shownDates.map(date => {
    const numbers = Object.keys(chosenDatapoints[date]).map((key) => {
      return chosenDatapoints[date][key]
    })
    listOfNumbers.push(...numbers)
  })
  console.log(listOfNumbers)
  constants.min = Math.min(...listOfNumbers) - Math.min(...listOfNumbers) / 10
  constants.max = Math.max(...listOfNumbers) + Math.max(...listOfNumbers) / 10


  /*for(let i = 0; i < shownDates.length; i++){
    const listOfNumbers = Object.keys(chosenDatapoints[shownDates[i]]).map((key) => {
      return chosenDatapoints[shownDates[i]][key]
    })
    const min = Math.min(...listOfNumbers)
    const max = Math.max(...listOfNumbers)

    if(min < constants.min){
      constants.min = min - (min / 10)
    }
    if(max > constants.max){
      constants.max = max + (max / 10)
    }
  }*/

  const padding = {horizontal: container.width / 20, vertical: container.height / 20}
  const renderSize = {width: container.width - padding.horizontal, height: container.height - padding.vertical}
  const linesY = 7 // 6 but it shouldn't be a constant
  const linesX = 13 // 6 but it shouldn't be a constant
  let difference = (constants.max - constants.min) / linesY
  if (difference < 10){

    //constants.min -= constants.min / 2
    //constants.max += constants.max / 2
    //difference = (constants.max - constants.min) / linesY
    //difference = 30

  }

  const distY = renderSize.height / linesY
  const distX = renderSize.width / linesX
  const intervalY = difference
  


  return (
    <div className="Graph">
      <svg viewBox={"0 0 " + container.width + " " + container.height} width="100%" height="100%" style={{transform: "rotateZ(180deg) rotateY(180deg)"}} >
        <Xaxis linesX={linesX} distX={distX} distY={distY} padding={padding} width={container.width - padding.horizontal} height={container.height - padding.vertical} constants={constants} renderSize={renderSize} />
        <Yaxis linesY={linesY} constants={constants} distX={distX} distY={distY} padding={padding} renderSize={renderSize} intervalY={intervalY} />
        <Datapoints difference={difference} distX={distX} linesY={linesY} constants={constants} distY={distY} padding={padding} renderSize={renderSize} intervalY={intervalY} data={data} shownDates={shownDates} />
      </svg>
    </div>
  )
}

function useContainerSize() {
  

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

export default Graph;
