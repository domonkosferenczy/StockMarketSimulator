import React from "react";
import Candle from "./Candle";

function CandlePoints(p) {
  const props = p.propsInObject;

  // Constants for graphical
  const paddingY = props.padding.horizontal;
  const offsetX = props.offsetX;
  const zoomRatio = props.zoomRatio;
  const width = props.renderSize.width / zoomRatio / 20;

  // Constants for data
  const datapoints = props.shownDataPoints;

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
      datapoint["open"] = props.min;
    } else if (datapoint === undefined) {
      datapoint = {};
      datapoint["close"] = 0;
      datapoint["open"] = props.min;
    }
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

  return candles;
}

export default CandlePoints;
