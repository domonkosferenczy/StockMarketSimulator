import { convertToRealY } from "./GraphFunctions";

function LinePoints(state, data, propsInObject, ctx) {
  const props = propsInObject;

  // Constants for graphical
  const paddingY = props.padding.horizontal;
  const offsetX = props.offsetX;
  const zoomRatio = props.zoomRatio;

  // Constants for data
  const datapoints = props.shownDataPoints;

  // Declaring variables for the point graph

  // Functions to calculate X and Y values
  const calX = (index) =>
    (index * props.renderSize.width) / props.lines.X / zoomRatio + offsetX;
  const calY = (value) =>
    ((value - props.min) / props.intervalY) * props.distY + paddingY;

  ctx.beginPath();
  ctx.moveTo(offsetX, convertToRealY(props.renderSize.height, paddingY));
  // Rendering candlesctx.beginPath(); and graph points
  datapoints.map((datapoint, index) => {
    if (typeof datapoint === "number") {
      let temp = datapoint;
      datapoint = {};
      datapoint["close"] = temp;
    } else if (datapoint === undefined) {
      datapoint = {};
      datapoint["close"] = props.min;
    }

    // Calculating X and Y values
    const x = calX(index);
    const close = convertToRealY(
      props.renderSize.height,
      calY(datapoint.close)
    );

    ctx.lineTo(x, close);
    return "";
  });

  ctx.lineTo(
    calX(datapoints.length - 1),
    convertToRealY(props.renderSize.height, paddingY)
  );

  ctx.fillStyle = "rgba(57, 207, 68, 0.54)";
  ctx.strokeStyle = "white";

  ctx.fill();
  ctx.stroke();
}

export default LinePoints;
