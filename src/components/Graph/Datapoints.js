import React, { useContext } from "react";
import Candle from "./Candle";
import { StoreContext } from "components/Store/Store";

function Datapoints(p) {
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
    let color = "green";
    if (index - 1 >= 0 && datapoints[index - 1].close > datapoint.close) {
      color = "red";
    }

    // Calculating X and Y values
    const x = calX(index);
    const close = calY(datapoint.close);
    const open = calY(datapoint.open);
    const high = calY(datapoint.high);
    const low = calY(datapoint.low);

    // Adding values for the point graph
    if (!state.animation.candle) {
      pointsGon += "" + x + "," + close + " ";
      pointsLine += "" + x + "," + close + " ";
    }

    return (
      <Candle
        key={"C" + index}
        x={x}
        close={close}
        high={high}
        low={low}
        open={open}
        color={color}
        width={width}
      />
    );
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

export default Datapoints;
