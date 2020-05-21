import React from "react";
import Graph from "../Graph";

function GraphContainer(props) {
  return (
    <div
      className="GraphContainer"
      id="GraphID"
      style={{ width: props.width, height: props.height }}
    >
      <Graph show={props.show} />
    </div>
  );
}

export default GraphContainer;
