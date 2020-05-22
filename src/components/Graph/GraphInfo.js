import React from "react";

function GraphInfo(props) {
  const title = props.title;

  return (
    <div className="GraphInfo">
      {title}
      <div className="GraphInfo-alt">
        <select
          onChange={(event) => props.colorHandler(event.target.value)}
          defaultValue={props.color}
        >
          {props.title !== "Capital Available" &&
          props.title !== "Value Of Stocks" ? (
            <option>candle</option>
          ) : (
            ""
          )}

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
