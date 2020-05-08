import React, {useContext} from 'react';
import 'stylesheet/App.css';
import { StoreContext } from 'components/Store';
import { DataContext } from 'components/Data';

function Xaxis(props) {

  const [state, dispatch] = useContext(StoreContext);
  const data = useContext(DataContext);
  const grid = [];
  const ratio = (props.width - (props.unit.x / 10) - 0.5) / 10;
  const renderHeight = props.height - props.unit.y / 2
  const allDates = Object.keys(data.stocks[state.animation.chosen].datapoints);


  for(let i = 0; i <= 9; i++){
    let date 
    try {
      date = allDates[i].slice(5).replace("-", ". ") + "."
    } catch { date = "" }
    grid.push(<line key={"Y"+i} x1={ratio * i + props.unit.x} y1={props.unit.x} x2={ratio * i + props.unit.x} y2={props.height} style={{fill:"none",stroke:"#777777",strokeWidth:props.unit.x/40, strokeLinecap:"round"}} />)
    grid.push(<text key={"YT"+i} x={ratio * i + props.unit.x/1.5} y={props.unit.y*1.2} style={{transform: "rotateX(180deg) rotateZ(-45deg)", transformOrigin: "center center", transformBox: "fill-box", fontSize: props.unit.x/3.5 + "px",fill:"#ffffff"}}>{date}</text>)
  }

  return (
    grid
    )
}

export default Xaxis;
