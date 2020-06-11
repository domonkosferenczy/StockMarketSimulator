import { drawLine } from "../GraphFunctions";

function Marker(state, data, propsInObject, ctx) {
  const props = propsInObject;

  // Constants for graphical
  const paddingY = props.padding.horizontal;
  const offsetX = props.offsetX;
  const zoomRatio = props.zoomRatio;
  let width = props.renderSize.width / zoomRatio / 20;
  if (state.animation.zoom <= 2) {
    width *= 3;
  }

  // Constants for data

  // Functions to calculate X and Y values
  const calX = (index) =>
    (index * props.renderSize.width) / props.lines.X / zoomRatio + offsetX;
  // Rendering candles and graph points

  // Calculating X and Y values
  const allDates = data.dates;
  const xShownFrom = calX(data.dates.indexOf(state.animation.shownFrom));
  const xShownTo = calX(data.dates.indexOf(state.animation.currentDate));

  drawLine(
    xShownFrom,
    paddingY,
    xShownFrom,
    props.renderSize.height - paddingY,
    "#5a6cee",
    width,
    ctx
  );

  drawLine(
    xShownTo,
    paddingY,
    xShownTo,
    props.renderSize.height - paddingY,
    "#5a6cee",
    width,
    ctx
  );

  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.beginPath();
  ctx.moveTo(xShownFrom, paddingY);
  ctx.lineTo(xShownTo, paddingY);
  ctx.lineTo(xShownTo, props.renderSize.height - paddingY);
  ctx.lineTo(xShownFrom, props.renderSize.height - paddingY);
  ctx.lineTo(xShownFrom, paddingY);
  ctx.fill();
}

export default Marker;
