import React, {useContext} from 'react';
import 'stylesheet/App.css';
import { StoreContext } from 'components/Store';
import { DataContext } from 'components/Data';

function Xaxis(props) {

  const [state] = useContext(StoreContext);
  const [data] = useContext(DataContext);

  const grid = [];
  const paddingY = props.padding.horizontal
  const paddingX = props.padding.vertical + props.renderSize.width / 20
  const allDates = Object.keys(data.stocks[state.animation.chosen].datapoints);
  const shownDates = allDates.slice(allDates.indexOf(state.animation.shownFrom));
  const date = [];

  for(let i = 0; i <= shownDates.length -1; i += Math.round(Math.round(allDates.length / 12) / (state.animation.zoom))){
    try {
      date.push(shownDates[i].slice(5).replace("-", ". ") + ".")
    } catch {  }
  }

  for(let i = 0; i <= 13; i++){
    const x =  i * props.renderSize.width / props.linesX + paddingX 
    const fontCenter = props.renderSize.width / 50
    const offsetX = props.renderSize.width / 100

    grid.push(
      <line
        key={"Y"+i}
        x1={x + offsetX}
        y1={paddingY}
        x2={x + offsetX}
        y2={props.renderSize.height}
        style={{fill:"none",stroke:"#777777",strokeWidth: props.renderSize.height/600, strokeLinecap:"round"}}
      />
    )

    grid.push(
      <text
        key={"YT"+i}
        x={x - fontCenter}
        y={paddingY / 2}
        style={{transform: "rotateX(180deg) rotateZ(-45deg)", transformOrigin: "center center", transformBox: "fill-box", fontSize: props.renderSize.height/30 + "px",fill:"#ffffff"}}
      >
        {date[i]}
      </text>
    )
  }

  return (
    grid
    )
}

export default Xaxis;
