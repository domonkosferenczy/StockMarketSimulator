import React from 'react';
import 'stylesheet/App.css';
import { formatMoney } from 'components/calculations';

function Yaxis(props) {

  const grid = [];
  const paddingY = props.padding.horizontal
  const paddingX = props.padding.vertical
  const TitlelayoutUnit = 10

  for(let i = 0; i <= props.linesY; i++){
    const y = props.distY * i + paddingY
    const transform = props.renderSize.height / 10
    const fontCenter = props.renderSize.height / 100
    const offsetX = + props.renderSize.width / 100

    grid.push(
      <line 
        key={"Y"+i}
        x1={props.distX + offsetX}
        y1={y}
        x2={props.renderSize.width + paddingX}
        y2={y}
        style={{fill:"none",stroke:"#777777",strokeWidth: props.renderSize.height/300, strokeLinecap:"round"}}
      />
    )
    grid.push(
      <text
        key={"YT"+i}
        x={paddingX}
        y={y + fontCenter}
        style={{transform: "rotateX(180deg)", transformOrigin: transform, transformBox: "fill-box", fontSize: (props.renderSize.height/25) + "px",fill:"#ffffff"}}
      >
        ${formatMoney((props.intervalY * i) + props.constants.min)}
      </text>
    )
  }
  
  return (
    grid
    )
}

export default Yaxis;
