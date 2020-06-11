import React from "react";
import Graph from "./Draw/Graph";

function GraphContainer(props) {
  let classs = "GraphContainer showAnimation";
  let toShow = props.show;
  if (toShow === null) {
    classs = "GraphContainer hideGraph";
  }
  return (
    <div
      className={classs}
      id={"GraphID" + props.index}
      style={{
        width: props.width,
        height: props.height,
        position: props.position,
      }}
    >
      <Graph show={toShow !== null ? toShow : "Chosen"} index={props.index} />
    </div>
  );
}

export default GraphContainer;
