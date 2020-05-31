import { drawLine } from "../GraphFunctions";

function Xaxis(state, data, propsInObject, ctx) {
  const props = propsInObject;

  // Constants for graphical
  const width = props.renderSize.width;
  const height = props.renderSize.height;
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
  for (let i = 0; i < shownDates.length; i += Math.floor(props.zoomRatio)) {
    const date = shownDates[i].slice(5).replace("-", ". ") + ".";
    datesToRender.push(date);
  }
  datesToRender.push(
    shownDates[shownDates.length - 1].slice(5).replace("-", ". ") + "."
  );

  // Rendering X axis elements
  for (let i = 0; i <= 12; i++) {
    const xPos = (i * width) / props.lines.X + paddingX;
    const lineX = xPos + offsetX;

    // Rendering X lines
    const x1 = lineX;
    const y1 = height - paddingY;
    const x2 = lineX;
    const y2 = paddingY;
    const style = "#777777";
    const lineWidth = height / 300;

    drawLine(x1, y1, x2, y2, style, lineWidth, ctx);

    // Rendering X values
    ctx.font = `${width / 1000}em Bahnschrift`;
    ctx.fillStyle = "white";
    const Text = datesToRender[i];
    const xText = xPos - fontCenter;
    const yText = height - paddingY / 2;

    ctx.fillText(Text, xText, yText);
  }
}

export default Xaxis;
