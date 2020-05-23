import { formatMoney } from "components/Global_Components/calculations";
import { convertToRealY } from "./GraphFunctions";

function Yaxis(state, data, propsInObject, ctx) {
  const props = propsInObject;

  // Constants for graphical
  const paddingY = props.padding.horizontal;
  const paddingX = props.padding.vertical;
  const fontCenter = props.renderSize.height / 100;
  const offsetX = props.offsetX;

  const grid = [];

  // Rendering Y axis elements
  for (let i = 0; i <= props.lines.Y; i++) {
    const yPos = props.distY * i + paddingY;
    const value = props.intervalY * i + props.min;

    ctx.lineWidth = props.renderSize.height / 300;
    ctx.lineCap = "butt";
    ctx.strokeStyle = "#777777";
    ctx.beginPath();
    ctx.moveTo(offsetX, convertToRealY(props.renderSize.height, yPos));
    ctx.lineTo(
      props.renderSize.width,
      convertToRealY(props.renderSize.height, yPos)
    );
    ctx.stroke();

    ctx.font = `${props.renderSize.width / 1000}em Bahnschrift`;
    ctx.fillStyle = "white";
    ctx.fillText(
      `$${formatMoney(value)}`,
      paddingX,
      convertToRealY(props.renderSize.height, yPos - fontCenter)
    );
  }

  return grid;
}

export default Yaxis;
