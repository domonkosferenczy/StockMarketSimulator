import React from "react";
import greenArrow from "images/green_arrow.svg";
import redArrow from "images/red_arrow.svg";
import line from "images/line.svg";

function Arrow(props) {
  // Attributes of Arrow
  let size = "23px";
  let source = greenArrow;
  let alt = "up arrow";

  if (props.size === "small") {
    size = "10px";
  }

  switch (props.dir) {
    case "up":
      source = greenArrow;
      alt = "up arrow";
      break;

    case "down":
      source = redArrow;
      alt = "down arrow";
      break;

    default:
      source = line;
      alt = "line";
  }

  return <img src={source} alt={alt} width={size} />;
}

export default Arrow;
