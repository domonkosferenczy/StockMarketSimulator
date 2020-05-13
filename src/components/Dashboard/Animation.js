import React, { useContext, useEffect } from 'react';
import 'stylesheet/App.css';
import Faster from 'images/faster.svg'
import Play from 'images/play.svg'
import PlayEnd from 'images/playEnd.svg'
import Minus from 'images/minus.svg'
import Plus from 'images/plus.svg'
import Pause from 'images/pause.svg'
import { StoreContext } from 'components/Store'
import { DataContext } from 'components/Data';

function Animation() {

  const [state, dispatch] = useContext(StoreContext);
  const [data] = useContext(DataContext);

  const chosenDatapoints = data.stocks[state.animation.chosen].datapoints
  const allDates = Object.keys(chosenDatapoints);
  const shownDates = allDates.slice(allDates.indexOf(state.animation.shownFrom), allDates.indexOf(state.animation.currentDate)+1)

  const ticker = () => {
    let dir = (state.animation.speed < 0)?-1:1
    let nextIndex = data.dates.indexOf(state.animation.currentDate) + dir
    if (nextIndex < data.dates.length && nextIndex >= 0) {
      let nextDate = data.dates[nextIndex]
      if (shownDates.length > 12 * (state.animation.zoom / 10)){
        let shownFromDate = data.dates[nextIndex -  12 * (state.animation.zoom / 10)]
        dispatch({type: "GRAPH_MOVE", payload: {currentDate: nextDate, shownFromData: shownFromDate}});
      } else {
        dispatch({type: "SET_CURRENT_DATE", payload: nextDate});
      }
    } else {
      dispatch({type: "SET_PAUSED", payload: true})
    }
  }

  useEffect(() => {
    let interval
    if (!state.animation.paused){
      interval = setInterval(() => {
      ticker()
    }, 1000 / Math.abs(state.animation.speed));

    return () => {
      clearInterval(interval);
      
    };
  } else {
    clearInterval(interval)
  }
  });

  const changeSpeed = (val) => {
    if (state.animation.speed + val === 0){
      dispatch({type: 'INCR_SPEED', payload: 2 * val})
    } else {
      dispatch({type: 'INCR_SPEED', payload: val})
    }
  }

  const changeZoom = (val) => {
    if (val > 0 || state.animation.zoom > 10){
      dispatch({type: 'INCR_ZOOM', payload: val})
    }
  }

  const startPause = () => {
    dispatch({type: 'SET_PAUSED', payload: !state.animation.paused})
  }

  const jumpTo = to => {
    let date = data.dates[(to === "start")?0:data.dates.length-1]
    dispatch({type: 'SET_CURRENT_DATE', payload: date})
  }

  const swtichCandles = () => {
    const switcher = !state.animation.candle
    dispatch({type: 'SET_CANDLE', payload: switcher})
  }

  return (
    <div className="Animation">
    ANIMATION
    <div className="DashboardButtons">
      <div className="AnimationButtons">
        <div className="AnimationButtons-plusMinus">
          <button onClick={() => changeZoom(10)}><img src={Plus} alt="Plus" /></button>
          <button onClick={() => changeZoom(-10)}><img src={Minus} alt="Minus" /></button>
        </div>
        <button onClick={() => jumpTo("start")} ><img src={PlayEnd} alt="PlayEndBack" style={{transform: "rotateZ(180deg)"}} /></button>
        <button onClick={() => changeSpeed(-1)} ><img src={Faster} alt="Slower" style={{transform: "rotateZ(180deg)"}} /></button>
        <button onClick={startPause} ><img src={(state.animation.paused)?Play:Pause} alt="Play" /></button>
        <button onClick={() => changeSpeed(1)} ><img src={Faster} alt="Faster"  /></button>
        <button onClick={() => jumpTo("end")}><img src={PlayEnd} alt="PlayEnd" /></button>
      </div>
    </div>
    <div className="DashboardInformation">
      <div>SPEED: {state.animation.speed + "x" + ((state.animation.paused)?" PAUSED":"")}</div>
      <div>ZOOM: {state.animation.zoom}x</div>
      <div>SHOWN: 148 days</div>
      <div>CANDLES: <button onClick={swtichCandles} className="Dashboard-button">{(state.animation.candle)?"ON":"OFF"}</button></div>
    </div>
  </div>
  )
}

export default Animation;
