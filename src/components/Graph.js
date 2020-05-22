import React, { useContext, useRef, useEffect, useState } from "react";
import Xaxis from "./Graph/Xaxis";
import Yaxis from "./Graph/Yaxis";
import LinePoints from "./Graph/LinePoints";
import CandlePoints from "./Graph/CandlePoints";
import GraphInfo from "./Graph/GraphInfo";
import { StoreContext } from "./Store/Store";
import { DataContext } from "./Store/Data";
import { useContainerSize } from "components/Graph/GraphFunctions";
import "stylesheet/graph.css";

function Graph(props) {
  const [state] = useContext(StoreContext);
  const [data] = useContext(DataContext);

  const [color, setColor] = useState("candle");
  const container = useContainerSize();

  // Constants for data
  const show = props.show;
  let chosenDatapoints;
  if (typeof show === "string") {
    chosenDatapoints = data.stocks[show].datapoints;
  } else {
    chosenDatapoints = show;
  }

  const allDates = data.dates;
  const shownFrom = allDates.indexOf(state.animation.shownFrom);
  const shownTo = allDates.indexOf(state.animation.currentDate) + 1;
  const shownDates = allDates.slice(shownFrom, shownTo);
  const shownDataPoints = shownDates.map((date, index) => {
    return chosenDatapoints[date];
  });

  // Constants for graphical
  const padding = {
    horizontal: container.width / 40,
    vertical: container.height / 40,
  };
  const renderSize = {
    width: container.width - padding.horizontal,
    height: container.height - padding.vertical,
  };
  const offsetX = padding.vertical + renderSize.width * 0.06;
  const lines = { X: 13, Y: 6 };
  const distY = renderSize.height / lines.Y;
  const zoomRatio = Math.round(
    Math.round(allDates.length / (lines.X - 1)) / state.animation.zoom
  );
  const edge = { min: Number.MAX_VALUE, max: Number.MIN_VALUE };
  let distance = 0;

  // Searching for the lowest and highest value
  const listOfNumbers = [];
  shownDataPoints.map((date) => {
    if (typeof date === "number") {
      listOfNumbers.push(date);
    } else if (typeof date === "object") {
      const numbers = Object.keys(date).map((key) => {
        return date[key];
      });
      listOfNumbers.push(...numbers);
    }
    return "";
  });

  // Expand limit
  edge.min = Math.min(...listOfNumbers) * 0.8;
  edge.max = Math.max(...listOfNumbers) * 1.2;

  // Calculating distance from min to max
  if (edge.min < 0 || edge.max < 0) {
    distance = edge.max + Math.abs(edge.min);
  } else {
    distance = edge.max - edge.min;
  }

  const intervalY = distance / lines.Y;

  // Taking constants to an object
  const propsInObject = {
    padding: padding,
    renderSize: renderSize,
    lines: lines,
    intervalY: intervalY,
    distY: distY,
    min: edge.min,
    zoomRatio: zoomRatio,
    shownDataPoints: shownDataPoints,
    offsetX: offsetX,
    color: color,
  };
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;

    Xaxis(state, data, propsInObject, ctx);
    Yaxis(state, data, propsInObject, ctx);
    if (color === "candle" && typeof show === "string") {
      CandlePoints(state, data, propsInObject, ctx);
    } else {
      LinePoints(state, data, propsInObject, ctx);
    }
  }, [state, container, data, propsInObject, state.user.capitalAvailable]);

  return (
    <div className="Graph">
      <canvas
        className="GraphSVG"
        ref={canvasRef}
        width={container.width}
        height={container.height}
      ></canvas>
      <GraphInfo
        title={props.title}
        color={color}
        colorHandler={(color) => setColor(color)}
      />
    </div>
  );
}

export default Graph;
