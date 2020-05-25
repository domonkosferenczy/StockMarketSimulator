import { formatMoney } from "components/Global_Components/calculations";
import { drawLine } from "./GraphFunctions";

function Yaxis(propsInObject, ctx) {
  const props = propsInObject;

  // Constants for graphical
  const width = props.renderSize.width;
  const height = props.renderSize.height;
  const paddingY = props.padding.horizontal;
  const paddingX = props.padding.vertical;
  const fontCenter = height / 100;
  const offsetX = props.offsetX;

  const grid = [];

  // Rendering Y axis elements
  for (let i = 0; i <= props.lines.Y; i++) {
    const yPos = props.distY * i + paddingY;
    const value = props.intervalY * i + props.min;

    // Rendering Y lines
    ctx.lineWidth = height / 300;
    const x1 = offsetX;
    const y1 = height - yPos;
    const x2 = width;
    const y2 = height - yPos;
    const style = "#777777";
    const lineWidth = height / 300;

    drawLine(x1, y1, x2, y2, style, lineWidth, ctx);

    // Rendering Y values
    ctx.font = `${width / 1000}em Bahnschrift`;
    ctx.fillStyle = "white";
    const Text = `$${formatMoney(value)}`;
    const xText = paddingX;
    const yText = height - yPos + fontCenter;
    ctx.fillText(Text, xText, yText);
  }

  return grid;
}

export default Yaxis;
