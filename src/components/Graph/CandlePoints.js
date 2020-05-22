import Candle from "./Candle";
import { convertToRealY } from "./GraphFunctions";

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

    ctx.beginPath();

    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(x, convertToRealY(props.renderSize.height, close));
    ctx.lineTo(x, convertToRealY(props.renderSize.height, open));
    ctx.stroke();

    ctx.lineWidth = width / 10;
    ctx.moveTo(x, convertToRealY(props.renderSize.height, high));
    ctx.lineTo(x, convertToRealY(props.renderSize.height, low));
    ctx.stroke();

    /*return (
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
    );*/
  });

  return candles;
}

export default CandlePoints;
