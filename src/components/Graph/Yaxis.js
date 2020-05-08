import React, { useEffect, useState } from 'react';
import 'stylesheet/App.css';

function Yaxis(props) {

  const [localState, setLocalState] = useState(0)

  useEffect(() => {
    window.addEventListener("resize", () => setLocalState(1));
    return () => {
      window.removeEventListener('resize', () => setLocalState(1));
    }
  })

  const grid = [];
  const ratio = (props.height - props.unit.x - 0.5) / 6.3;
  const TitleUnit = (props.constants.max - props.constants.min) / 4
  const renderHeight = props.height - props.unit.y / 6

  for(let i = 0; i <= 6; i++){
    grid.push(<line key={"Y"+i} x1={props.unit.x} y1={ratio * i + props.unit.x} x2={props.width} y2={ratio * i + props.unit.x} style={{fill:"none",stroke:"#777777",strokeWidth: props.unit.x/60, strokeLinecap:"round"}} />)
    grid.push(<text key={"YT"+i} x={0} y={ratio * i + props.unit.x + props.unit.x/7} style={{transform: "rotateX(180deg)", transformOrigin: "center center", transformBox: "fill-box", fontSize: props.unit.x/2.5 + "px",fill:"#ffffff"}}>${(props.constants.min + i * TitleUnit)-TitleUnit}</text>)
  }
  
  return (
    grid
    )
}

export default Yaxis;
