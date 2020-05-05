import React from 'react';
import 'stylesheet/App.css';

function Yaxis(props) {

  let grid = [];
  let ratio = (props.width - (props.unit.x / 10) - 0.5) / 10;



  for(let i = 0; i <= 10; i++){
    grid.push(<line key={"Y"+i} x1={ratio * i + props.unit.x / 10} y1={props.unit.x} x2={ratio * i + props.unit.x / 10} y2={props.height} style={{fill:"none",stroke:"#777777",strokeWidth:props.unit.x/40, strokeLinecap:"round"}} />)
  }

  return (
    [
    <line  x1={props.unit.x / 10} y1={props.unit.x} x2={props.unit.x / 10} y2={props.height} style={{fill:"none",stroke:"#777777",strokeWidth:props.unit.x/40 * 3, strokeLinecap:"round"}} />,
    grid
    ]
    )
}

export default Yaxis;
