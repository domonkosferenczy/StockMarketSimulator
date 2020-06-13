import React from "react";
import Graph from "./Draw/Graph";

function GraphContainer(props) {
  let classs = "GraphContainer showAnimation";
  let toShow = props.show;
  if (toShow === null || props.hide) {
    classs = "GraphContainer hideGraph";
  }

  const ContainerStyle = {
    width: props.width,
    height: props.height,
    position: props.position,
    top: props.top,
    bottom: props.bottom,
  };

  return (
    <div className={classs} id={"GraphID" + props.index} style={ContainerStyle}>
      <Graph show={toShow !== null ? toShow : "Chosen"} index={props.index} />
    </div>
  );
}

export default GraphContainer;
