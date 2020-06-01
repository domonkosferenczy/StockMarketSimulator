import React from "react";
import Graph from "./Draw/Graph";

function GraphContainer(props) {
  let classs = "GraphContainer showAnimation";
  if (props.show === null) {
    classs = "GraphContainer hideGraph";
  }
  return (
    <div
      className={classs}
      id="GraphID"
      style={{
        width: props.width,
        height: props.height,
        position: props.position,
      }}
    >
      <Graph show={props.show !== null ? props.show : "Chosen"} />
    </div>
  );
}

export default GraphContainer;
