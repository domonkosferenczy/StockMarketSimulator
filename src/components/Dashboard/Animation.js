import React, { useContext, useEffect } from "react";
import { StoreContext } from "Store/Store";
import { DataContext } from "Store/Data";
import Faster from "images/faster.svg";
import Play from "images/play.svg";
import PlayEnd from "images/playEnd.svg";
import Minus from "images/minus.svg";
import Plus from "images/plus.svg";
import Pause from "images/pause.svg";
import {
  GRAPH_MOVE,
  SET_PAUSED,
  INCR_SPEED,
  INCR_ZOOM,
  SET_CURRENT_DATE,
} from "Store/Actions";

function Animation() {
  const [state, dispatch] = useContext(StoreContext);
  const [data] = useContext(DataContext);

  // Constants for data
  const currentDate = state.animation.currentDate;
  const paused = state.animation.paused;
  const dates = data.dates;
  const ownedStocks = state.user.ownedStocks;

  const chosenDatapoints = data.stocks[state.animation.chosen].datapoints;
  const allDates = Object.keys(chosenDatapoints);
  const shownDates = allDates.slice(
    allDates.indexOf(state.animation.shownFrom),
    allDates.indexOf(currentDate) + 1
  );
  const zoomRatio = Math.round(
    Math.round(allDates.length / 12) / state.animation.zoom
  );

  // Function of one tick
  const ticker = () => {
    let dir = state.animation.speed < 0 ? -1 : 1;
    let nextIndex = dates.indexOf(currentDate) + dir;
    if (nextIndex < dates.length && nextIndex >= 0) {
      const nextDate = dates[nextIndex];
      if (shownDates.length > 12 * zoomRatio) {
        let shownFromDate = dates[nextIndex - 12 * zoomRatio];
        if (shownFromDate === undefined) {
          shownFromDate = dates[0];
        }
        dispatch({
          type: GRAPH_MOVE,
          payload: { currentDate: nextDate, shownFromData: shownFromDate },
        });
      } else {
        dispatch({ type: SET_CURRENT_DATE, payload: nextDate });
      }
    } else {
      dispatch({
        type: "ADD_MESSAGE",
        payload: { content: "Animation ended!", id: state.message.lastId },
      });
      dispatch({ type: SET_PAUSED, payload: true });
    }
  };

  // Handling interval
  useEffect(() => {
    let interval;
    if (!paused) {
      interval = setInterval(() => {
        ticker();
      }, 1000 / Math.abs(state.animation.speed));

      // unmount
      return () => {
        clearInterval(interval);
      };
    } else {
      clearInterval(interval);
    }
  });

  const changeSpeed = (val) => {
    if (state.animation.speed + val === 0) {
      dispatch({ type: INCR_SPEED, payload: 2 * val });
    } else {
      dispatch({ type: INCR_SPEED, payload: val });
    }
  };

  const changeZoom = (val) => {
    if (
      (val > 0 && state.animation.zoom < 10) ||
      (val < 0 && state.animation.zoom >= 2)
    ) {
      dispatch({ type: INCR_ZOOM, payload: val });
      let shownFromData =
        dates[
          dates.indexOf(currentDate) -
            12 *
              Math.round(
                Math.round(allDates.length / 12) / (state.animation.zoom + val)
              )
        ];
      if (shownFromData === undefined) {
        shownFromData = dates[0];
      }
      dispatch({
        type: GRAPH_MOVE,
        payload: { currentDate: currentDate, shownFromData: shownFromData },
      });
    } else {
      dispatch({
        type: "ADD_MESSAGE",
        payload: { content: "Maximum zoom reached!", id: state.message.lastId },
      });
    }
  };

  const startPause = () => {
    dispatch({ type: SET_PAUSED, payload: !paused });
  };

  const jumpTo = (to) => {
    let currentDate;
    let shownFrom;
    dispatch({ type: SET_PAUSED, payload: true });
    if (to === "start") {
      currentDate = dates[0];
      shownFrom = allDates[0];
      dispatch({
        type: "CLEAR_HISTORY",
      });
    } else {
      // Calculating the present value of the Stocks
      const historyValueOfStocks = state.user.history.valueOfStocks;
      const historyCapitalAvailable = state.user.history.capitalAvailable;
      allDates.forEach((date) => {
        const valueOfStocks = Object.keys(ownedStocks).reduce(
          (accumulator, stock) => {
            const number = ownedStocks[stock].numberOfStocks;
            const stockValue = data.stocks[stock].datapoints[date].close;
            return accumulator + number * stockValue;
          },
          0
        );
        if (!Object.keys(state.user.history.valueOfStocks).includes(date)) {
          historyValueOfStocks[date] = valueOfStocks;
        }

        if (!Object.keys(state.user.history.capitalAvailable).includes(date)) {
          historyCapitalAvailable[date] = state.user.capitalAvailable;
        }
      });

      dispatch({
        type: "ADD_HISTORY_VALUE_OF_STOCKS",
        payload: historyValueOfStocks,
      });
      dispatch({
        type: "ADD_HISTORY_CAPITAL_AVAILABLE",
        payload: historyCapitalAvailable,
      });

      currentDate = dates[dates.length - 1];
      shownFrom = dates[dates.length - 1 - 12 * zoomRatio];
      if (shownFrom === undefined) {
        shownFrom = dates[0];
      }
    }
    dispatch({
      type: GRAPH_MOVE,
      payload: { currentDate: currentDate, shownFromData: shownFrom },
    });
  };

  return (
    <div className="Animation">
      ANIMATION
      <div className="DashboardButtons">
        <div className="AnimationButtons">
          <div className="AnimationButtons-plusMinus">
            <button onClick={() => changeZoom(1)}>
              <img src={Plus} alt="Plus" />
            </button>
            <button onClick={() => changeZoom(-1)}>
              <img src={Minus} alt="Minus" />
            </button>
          </div>
          <button onClick={() => jumpTo("start")}>
            <img src={PlayEnd} alt="PlayEndBack" className="reverseImg" />
          </button>
          <button onClick={() => changeSpeed(-1)}>
            <img src={Faster} alt="Slower" className="reverseImg" />
          </button>
          <button onClick={startPause}>
            <img src={paused ? Play : Pause} alt="Play" />
          </button>
          <button onClick={() => changeSpeed(1)}>
            <img src={Faster} alt="Faster" />
          </button>
          <button onClick={() => jumpTo("end")}>
            <img src={PlayEnd} alt="PlayEnd" />
          </button>
        </div>
      </div>
      <div className="DashboardInformation">
        <div>SPEED: {state.animation.speed + "x"}</div>
        <div>ZOOM: {state.animation.zoom}x</div>
      </div>
    </div>
  );
}

export default Animation;
