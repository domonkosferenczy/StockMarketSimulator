import { drawLine } from "./GraphFunctions";

function CandlePoints(state, data, propsInObject, ctx) {
  const props = propsInObject;

  // Constants for graphical
  const paddingY = props.padding.horizontal;
  const offsetX = props.offsetX;
  const zoomRatio = props.zoomRatio;
  let width = props.renderSize.width / zoomRatio / 20;
  if (state.animation.zoom <= 2) {
    width *= 2;
  }

  // Constants for data
  const datapoints = props.shownDataPoints;

  // Functions to calculate X and Y values
  const calX = (index) =>
    (index * props.renderSize.width) / props.lines.X / zoomRatio + offsetX;
  const calY = (value) =>
    ((value - props.min) / props.intervalY) * props.distY + paddingY;

  // Rendering candles and graph points
  const candles = datapoints.forEach((datapoint, index) => {
    let color = "#5AEE64";
    if (index - 1 >= 0 && datapoints[index - 1].close > datapoint.close) {
      color = "#EE5A5A";
    }

    // Calculating X and Y values
    const x = calX(index);
    const close = calY(datapoint.close);
    const open = calY(datapoint.open);
    const high = calY(datapoint.high);
    const low = calY(datapoint.low);

    drawLine(
      x,
      props.renderSize.height - close,
      x,
      props.renderSize.height - open,
      color,
      width,
      ctx
    );

    drawLine(
      x,
      props.renderSize.height - high,
      x,
      props.renderSize.height - low,
      color,
      width / 10,
      ctx
    );
  });

  return candles;
}

export default CandlePoints;
