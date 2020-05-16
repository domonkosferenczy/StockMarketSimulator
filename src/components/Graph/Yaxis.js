import React from 'react';
import { formatMoney } from 'components/Global_Components/calculations';
import 'stylesheet/graph.css'

function Yaxis(p) {
  const props = p.propsInObject;

  // Constants for graphical
  const paddingY = props.padding.horizontal
  const paddingX = props.padding.vertical
  const transform = props.renderSize.height / 10
  const fontCenter = props.renderSize.height / 100
  const offsetX = props.offsetX

  // Constants for style
  const gridStyle = {
    strokeWidth: props.renderSize.height / 600,
  }
  const GridTextYStyle = {
    transformOrigin: transform,
    fontSize: (props.renderSize.height / 25) + "px",
  }

  const grid = [];

  // Rendering Y axis elements
  for(let i = 0; i <= props.lines.Y; i++){
    const yPos = props.distY * i + paddingY
    const value = props.intervalY * i + props.min

    // Y axis line
    grid.push(
      <line 
        key={"Y" + i}
        className="GridLine"
        x1={offsetX}
        y1={yPos}
        x2={props.renderSize.width + paddingX}
        y2={yPos}
        style={gridStyle}
      />
    )
    
    // Y axis text
    grid.push(
      <text
        key={"YT" + i}
        className="GridTextY"
        x={paddingX}
        y={yPos + fontCenter}
        style={GridTextYStyle}
      >
        ${formatMoney(value)}
      </text>
    )
  }
  
  return grid
}

export default Yaxis;
