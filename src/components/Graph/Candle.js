import React, { useState } from 'react';
import 'stylesheet/App.css';

function Candle(props) {

  const [onMouse, setOnMouse] = useState(false) 
  const lines = []

  let color = "#5AEE64" // green
  if (props.color === "red"){
    color = "#EE5A5A" // red
  }

  lines.push(
    <line
      key={"CB"+props.x}
      x1={props.x}
      y1={props.close}
      x2={props.x}
      y2={props.open}
      style={{stroke:color,strokeWidth: props.width, strokeLinecap:"butt", opacity: (onMouse)?0.4:1}}
      onMouseOver={() => {setOnMouse(true)}}
      onMouseLeave={() => {setOnMouse(false)}}
    />,
    <line
      key={"CS"+props.x}
      x1={props.x}
      y1={props.high}
      x2={props.x}
      y2={props.low}
      style={{stroke:color,strokeWidth: props.width/5, strokeLinecap:"butt", opacity: (onMouse)?0.2:1}}
      onMouseOver={() => {setOnMouse(true)}}
      onMouseLeave={() => {setOnMouse(false)}}
    />,
    /*<rect
      x={props.x}
      y={props.high}
      width={props.width * 30}
      height={props.width * 15}
      rx="15" 
      style={{
        visibility: (onMouse)?"visible":"hidden",
        fill:"black",
        stroke:"grey",
        strokeWidth:1,
        fillOpacity:0.4,
        strokeOpacity:0.9
      }}
      onMouseOver={() => {setOnMouse(true)}}
      onMouseLeave={() => {setOnMouse(false)}}
      />*/
  )

  return (
    lines    
  )
}

export default Candle;
