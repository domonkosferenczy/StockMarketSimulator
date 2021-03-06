import React from "react";
import arrow from "images/play.svg";

function GraphInfo(props) {
  const title = props.show;

  const candleAvailable =
    title !== "Capital Available" &&
    title !== "Value Of Stocks" &&
    title !== "timestamp";

  return (
    <div className="GraphInfo">
      <div>
        {title + " "}
        <img
          src={arrow}
          style={{ transform: "rotateZ(90deg)", width: "0.6em" }}
          alt="down arrow"
        />
      </div>
      <div className="GraphInfo-alt">
        <select
          onChange={(event) => props.colorHandler(event.target.value)}
          defaultValue={props.color}
        >
          {candleAvailable ? <option>candle</option> : ""}
          <option>red</option>
          <option>green</option>
          <option>orange</option>
          <option>blue</option>
          <option>yellow</option>
        </select>
      </div>
    </div>
  );
}

export default GraphInfo;
