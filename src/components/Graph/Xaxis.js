import React from 'react';
import 'stylesheet/App.css';

function Xaxis(props) {

  let grid = [];
  let ratio = (props.height - props.unit.x - 0.5) / 6;

  for(let i = 0; i <= 6; i++){
    grid.push(<line key={"X"+i} x1={props.unit.x / 10} y1={ratio * i + props.unit.x} x2={props.width} y2={ratio * i + props.unit.x} style={{fill:"none",stroke:"#777777",strokeWidth: props.unit.x/60, strokeLinecap:"round"}} />)
  }

  return (
    [
    <line key={"X0"} x1={props.unit.x / 10} y1={props.unit.x} x2={props.width} y2={props.unit.x} style={{fill:"none",stroke:"#777777",strokeWidth:props.unit.x/20, strokeLinecap:"round"}} />,
    grid
    ]
    )
}

export default Xaxis;
