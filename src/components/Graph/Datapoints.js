import React, { useContext } from 'react';
import Candle from './Candle'
import 'stylesheet/App.css';
import { StoreContext } from 'components/Store';
import { DataContext } from 'components/Data';

function Datapoints(props) {

  const [state] = useContext(StoreContext)
  const [data] = useContext(DataContext)

  const chosenDatapoints = data.stocks[state.animation.chosen].datapoints
  const allDates = Object.keys(chosenDatapoints);

  const paddingY = props.padding.horizontal
  const paddingX = props.padding.vertical
  const offsetX = paddingX + props.renderSize.width / 100 + props.renderSize.width / 20
  
  const datapoints = props.shownDataPoints
  let pointsGon = `${offsetX}, ${paddingY} `
  let pointsLine = ""

  const zoomRatio = Math.round(Math.round(allDates.length / 12) / (state.animation.zoom))
  const candles = datapoints.map((datapoint, index) => {
    let color = "green"
    if (index-1 >= 0 && datapoints[index-1].close > datapoint.close){
      color = "red"
    }
    
    
    const x = index * props.renderSize.width / props.linesX / zoomRatio + offsetX
    const close = (datapoint.close - props.constants.min) / props.intervalY * props.distY + paddingY
    const open = (datapoint.open - props.constants.min) / props.intervalY * props.distY + paddingY
    const high = (datapoint.high - props.constants.min) / props.intervalY * props.distY + paddingY
    const low = (datapoint.low - props.constants.min) / props.intervalY * props.distY + paddingY
    pointsGon += "" + x + "," + close + " "
    pointsLine += "" + x + "," + close + " "
    return (
      <Candle
        key={"C"+index}
        x={x}
        close={close}
        high={high}
        low={low}
        open={open}
        color={color}
        width={props.renderSize.width / zoomRatio / 20}
      />
    )
  })
  pointsGon += `${(datapoints.length-1) * props.renderSize.width / props.linesX / zoomRatio + offsetX} ,${paddingY}`

  if (!state.animation.candle){
  return ([
    <polygon points={pointsGon} key="TESZT"
      style={{fill:"rgba(57, 207, 68, 0.54)",opacity: 1,stroke:"transparent",strokeWidth:0}} />,
    <polyline points={pointsLine} key="TESZT2"
      style={{fill: "transparent",stroke:"white",strokeWidth:props.renderSize.width / 500}}
    />
  ]
    )
} else {
  return candles
}
}

export default Datapoints;