import React from "react";
import Graph from "./Draw/Graph";

function GraphContainer(props) {
  return (
    <div
      className={`GraphContainer`}
      id="GraphID"
      style={{ width: props.width, height: props.height }}
    >
      <Graph show={props.show} title={props.title} />
    </div>
  );
}

export default GraphContainer;
