import React, { useContext, useRef, useEffect, useState } from "react";
import Xaxis from "./Xaxis";
import Yaxis from "./Yaxis";
import LinePoints from "./LinePoints";
import CandlePoints from "./CandlePoints";
import GraphInfo from "../GraphInfo";
import { StoreContext } from "../../../Store/Store";
import { DataContext } from "../../../Store/Data";
import { useContainerSize, minAndMax } from "components/Graph/GraphFunctions";
import "stylesheet/graph.css";

function Graph(props) {
  const [state] = useContext(StoreContext);
  const [data] = useContext(DataContext);

  const [color, setColor] = useState("candle");
  const container = useContainerSize();
  const canvasRef = useRef(null);

  // Constants for data
  let show;
  switch (props.show) {
    case "Chosen":
      show = state.animation.chosen;
      break;
    case "Value Of Stocks":
      show = state.user.history.valueOfStocks;
      break;
    case "Capital Available":
      show = state.user.history.capitalAvailable;
      break;
    default:
      show = props.show;
      break;
  }

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
  let distance = 0;

  // Searching for the lowest and highest value
  const edge = minAndMax(shownDataPoints);

  // Calculating distance from min to max
  if (edge.min < 0 || edge.max < 0) {
    distance = edge.max + Math.abs(edge.min);
  } else {
    distance = edge.max - edge.min;
  }

  const intervalY = distance / lines.Y;

  // Taking constants to object
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

  // Drawing on canvas
  const drawGraph = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Drawing parts of the graph
    Xaxis(state, data, propsInObject, ctx);
    Yaxis(propsInObject, ctx);
    if (color === "candle" && typeof show === "string") {
      CandlePoints(state, data, propsInObject, ctx);
    } else {
      LinePoints(state, data, propsInObject, ctx);
    }
  };

  // Re-render condition
  let refreshWhen = state.animation.currentDate;
  if (typeof show === "object") {
    refreshWhen = show;
  }

  // Re-drawing canvas
  useEffect(() => {
    drawGraph();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshWhen, container, color]);

  return (
    <div className="Graph">
      <canvas
        className="GraphSVG"
        ref={canvasRef}
        width={container.width}
        height={container.height}
      ></canvas>
      <GraphInfo
        show={props.show}
        color={color}
        colorHandler={(color) => setColor(color)}
      />
    </div>
  );
}

export default Graph;
