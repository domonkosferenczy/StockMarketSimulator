import React, { useState } from "react";

function Candle(props) {
  const [onMouse, setOnMouse] = useState(false);

  const lines = [];

  // Setting the color
  let color = "#5AEE64"; // green
  if (props.color === "red") {
    color = "#EE5A5A"; // red
  }

  // Constans for style
  const closeOpenStyle = {
    stroke: color,
    strokeWidth: props.width,
    strokeLinecap: "butt",
    opacity: onMouse ? 0.4 : 1,
  };
  const highLowStyle = {
    stroke: color,
    strokeWidth: props.width / 5,
    strokeLinecap: "butt",
    opacity: onMouse ? 0.2 : 1,
  };

  lines.push(
    // close-open line
    <line
      key={"CB" + props.x}
      x1={props.x}
      y1={props.close}
      x2={props.x}
      y2={props.open}
      style={closeOpenStyle}
      onMouseOver={() => setOnMouse(true)}
      onMouseLeave={() => setOnMouse(false)}
    />,

    // high-low line
    <line
      key={"CS" + props.x}
      x1={props.x}
      y1={props.high}
      x2={props.x}
      y2={props.low}
      style={highLowStyle}
      onMouseOver={() => setOnMouse(true)}
      onMouseLeave={() => setOnMouse(false)}
    />
  );

  return lines;
}

export default Candle;
