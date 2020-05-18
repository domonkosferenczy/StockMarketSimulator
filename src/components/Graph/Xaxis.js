import React, { useContext } from "react";
import { StoreContext } from "components/Store/Store";
import { DataContext } from "components/Store/Data";
import "stylesheet/graph.css";

function Xaxis(p) {
  const [state] = useContext(StoreContext);
  const [data] = useContext(DataContext);

  const props = p.propsInObject;

  // Constants for graphical
  const grid = [];
  const paddingY = props.padding.horizontal;
  const paddingX = props.padding.vertical + props.renderSize.width / 20;
  const fontCenter = props.renderSize.width * 0.01;
  const offsetX = props.renderSize.width * 0.01;

  // Constants for style
  const LineStyle = {
    strokeWidth: props.renderSize.height / 600,
  };
  const TextStyle = {
    fontSize: props.renderSize.height / 30,
  };

  // Constants for data
  const allDates = Object.keys(data.stocks[state.animation.chosen].datapoints);
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
  for (let i = 0; i <= 13; i++) {
    const xPos = (i * props.renderSize.width) / props.lines.X + paddingX;
    const lineX = xPos + offsetX;

    grid.push(
      // X axis line
      <line
        key={"X" + i}
        className="GridLine"
        x1={lineX}
        y1={paddingY}
        x2={lineX}
        y2={props.renderSize.height}
        style={LineStyle}
      />
    );

    // X axis date text
    grid.push(
      <text
        key={"XT" + i}
        className="GridTextX"
        x={xPos - fontCenter}
        y={paddingY / 1.75}
        style={TextStyle}
      >
        {datesToRender[i]}
      </text>
    );
  }

  return grid;
}

export default Xaxis;
