function LinePoints(state, data, propsInObject, ctx, show) {
  const props = propsInObject;

  // Constants for graphical
  const paddingY = props.padding.horizontal;
  const offsetX = props.offsetX;
  const zoomRatio = props.zoomRatio;

  // Constants for data
  const datapoints = props.shownDataPoints;

  // Functions to calculate X and Y values
  const calX = (index) =>
    (index * props.renderSize.width) / props.lines.X / zoomRatio + offsetX;
  const calY = (value) =>
    ((value - props.min) / props.intervalY) * props.distY + paddingY;

  // Start point for rendering
  ctx.beginPath();
  ctx.moveTo(offsetX, props.renderSize.height - paddingY);

  // Rendering graph points
  datapoints.forEach((datapoint, index) => {
    try {
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
      const close = props.renderSize.height - calY(datapoint.close);
      ctx.lineTo(x, close);
    } catch {
      // Missing datapoint
    }
  });

  // Endpoint for fill
  const xEndpoint = calX(datapoints.length - 1);
  const yEndpoint = props.renderSize.height - paddingY;
  ctx.lineTo(xEndpoint, yEndpoint);

  let color;
  switch (propsInObject.color) {
    case "red":
      color = "rgba(207, 57, 57, 0.5)";
      break;
    case "orange":
      color = "rgba(207, 154, 57, 0.5)";
      break;
    case "yellow":
      color = "rgba(198, 207, 57, 0.5)";
      break;
    case "blue":
      color = "rgba(57, 96, 207, 0.5)";
      break;
    case "green":
      color = "rgba(57, 207, 68, 0.5)";
      break;
    default:
      color = "rgba(57, 207, 68, 0.5)";
      break;
  }

  ctx.fillStyle = color;
  if (show === "timestamp") {
    ctx.fillStyle = "rgba(0,0,0,0)";
  }
  ctx.strokeStyle = "white";
  ctx.fill();
  ctx.stroke();
}

export default LinePoints;
