import React, { useContext } from "react";
import { StoreContext } from "components/Store/Store";

function LinePoints(p) {
  const [state] = useContext(StoreContext);

  const props = p.propsInObject;

  // Constants for graphical
  const paddingY = props.padding.horizontal;
  const offsetX = props.offsetX;
  const zoomRatio = props.zoomRatio;
  const width = props.renderSize.width / zoomRatio / 20;

  // Constants for style
  const polylineStyle = {
    strokeWidth: props.renderSize.width / 500,
  };

  // Constants for data
  const datapoints = props.shownDataPoints;

  // Declaring variables for the point graph
  let pointsGon = `${offsetX}, ${paddingY} `;
  let pointsLine = "";

  // Functions to calculate X and Y values
  const calX = (index) =>
    (index * props.renderSize.width) / props.lines.X / zoomRatio + offsetX;
  const calY = (value) =>
    ((value - props.min) / props.intervalY) * props.distY + paddingY;

  // Rendering candles and graph points
  const candles = datapoints.map((datapoint, index) => {
    if (typeof datapoint === "number") {
      let temp = datapoint;
      datapoint = {};
      datapoint["close"] = temp;
    } else if (datapoint === undefined) {
      datapoint = {};
      datapoint["close"] = 0;
    }

    // Calculating X and Y values
    const x = calX(index);
    const y = calY(datapoint.close);

    // Adding values for the point graph
    if (!state.animation.candle) {
      pointsGon += "" + x + "," + y + " ";
      pointsLine += "" + x + "," + y + " ";
    }
  });

  // Rendering the candles or the point graph
  if (!state.animation.candle) {
    // Adding the last point to the polygon
    pointsGon += `${calX(datapoints.length - 1)} ,${paddingY}`;

    return [
      <polygon points={pointsGon} key="polygon" className="Polygon" />,
      <polyline
        points={pointsLine}
        key="polyline"
        className="Polyline"
        style={polylineStyle}
      />,
    ];
  } else {
    return candles;
  }
}

export default LinePoints;
