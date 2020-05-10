import React, {useContext} from 'react';
import 'stylesheet/App.css';
import { StoreContext } from 'components/Store';
import { DataContext } from 'components/Data';

function Xaxis(props) {

  const [state, dispatch] = useContext(StoreContext);
  const data = useContext(DataContext);

  const grid = [];
  const paddingY = props.padding.horizontal
  const paddingX = props.padding.vertical
  const allDates = Object.keys(data.stocks[state.animation.chosen].datapoints);
  const date = [];

  for(let i = 0; i <= allDates.length; i+=5){
    try {
      date.push(allDates[i].slice(5).replace("-", ". ") + ".")
    } catch {  }
  }

  for(let i = 1; i <= props.linesX; i++){
    const x =  i * props.distX
    const fontCenter = props.renderSize.width / 50
    const offsetX = + props.renderSize.width / 100

    grid.push(
      <line
        key={"Y"+i}
        x1={x + offsetX}
        y1={paddingY}
        x2={x + offsetX}
        y2={props.renderSize.height}
        style={{fill:"none",stroke:"#777777",strokeWidth: props.renderSize.height/300, strokeLinecap:"round"}}
      />
    )

    grid.push(
      <text
        key={"YT"+i}
        x={x - fontCenter}
        y={paddingY / 2}
        style={{transform: "rotateX(180deg) rotateZ(-45deg)", transformOrigin: "center center", transformBox: "fill-box", fontSize: props.renderSize.height/30 + "px",fill:"#ffffff"}}
      >
        {date[i-1]}
      </text>
    )
  }

  return (
    grid
    )
}

export default Xaxis;
