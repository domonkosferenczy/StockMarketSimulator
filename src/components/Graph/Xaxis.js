import { convertToRealY } from "./GraphFunctions";

function Xaxis(state, data, propsInObject, ctx) {
  const props = propsInObject;

  // Constants for graphical
  const paddingY = props.padding.horizontal;
  const paddingX = props.padding.vertical + props.renderSize.width / 20;
  const fontCenter = props.renderSize.width * 0.01;
  const offsetX = props.renderSize.width * 0.01;

  // Constants for data
  const allDates = data.dates;
  const shownDates = allDates.slice(
    allDates.indexOf(state.animation.shownFrom)
  );
  const datesToRender = [];

  // Calculating rendering X axis dates
  for (let i = 0; i < shownDates.length; i += props.zoomRatio) {
    const date = shownDates[i].slice(5).replace("-", ". ") + ".";
    datesToRender.push(date);
  }

  // Rendering X axis elements
  for (let i = 0; i <= 12; i++) {
    const xPos = (i * props.renderSize.width) / props.lines.X + paddingX;
    const lineX = xPos + offsetX;

    ctx.lineWidth = props.renderSize.height / 300;
    ctx.lineCap = "butt";
    ctx.strokeStyle = "#777777";
    ctx.beginPath();
    ctx.moveTo(lineX, convertToRealY(props.renderSize.height, paddingY));
    ctx.lineTo(
      lineX,
      convertToRealY(
        props.renderSize.height,
        props.renderSize.height - paddingY
      )
    );
    ctx.stroke();

    ctx.font = `${props.renderSize.width / 100}px Bahnschrift`;
    ctx.fillStyle = "white";
    ctx.fillText(
      `${datesToRender[i]}`,
      xPos - fontCenter,
      convertToRealY(props.renderSize.height, paddingY / 1.75)
    );
  }
}

export default Xaxis;
