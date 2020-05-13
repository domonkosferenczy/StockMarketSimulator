import React, { useContext } from 'react';
import Candle from './Candle'
import 'stylesheet/App.css';
import { StoreContext } from 'components/Store';

function Datapoints(props) {

  const [state] = useContext(StoreContext)

  const paddingY = props.padding.horizontal
  const paddingX = props.padding.vertical
  const offsetX = paddingX + props.renderSize.width / 100 + props.renderSize.width / 20
  
  const datapoints = props.shownDataPoints
  let pointsGon = `${offsetX}, ${paddingY} `
  let pointsLine = ""


  const candles = datapoints.map((datapoint, index) => {
    let color = "green"
    if (index-1 >= 0 && datapoints[index-1].close > datapoint.close){
      color = "red"
    }
    
    const x = index * props.renderSize.width / props.linesX / (state.animation.zoom / 10) + offsetX
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
        width={props.renderSize.width / (state.animation.zoom * 1.25)}
      />
    )
  })
  pointsGon += `${(datapoints.length-1) * props.renderSize.width / props.linesX / (state.animation.zoom / 10) + offsetX} ,${paddingY}`

  if (!state.animation.candle){
  return ([
    <polygon points={pointsGon}
      style={{fill:"rgb(255,255,255)",opacity: 0.2,stroke:"transparent",strokeWidth:0}} />,
    <polyline points={pointsLine}
      style={{fill: "transparent",stroke:"white",strokeWidth:2}}
    />
  ]
    )
} else {
  return candles
}
}

export default Datapoints;