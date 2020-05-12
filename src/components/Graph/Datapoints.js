import React, { useContext } from 'react';
import Candle from './Candle'
import 'stylesheet/App.css';
import { StoreContext } from 'components/Store';

function Datapoints(props) {

  const paddingY = props.padding.horizontal
  const paddingX = props.padding.vertical
  
  const datapoints = props.shownDataPoints

  const candles = datapoints.map((datapoint, index) => {
    let color = "green"
    if (index-1 >= 0 && datapoints[index-1].close > datapoint.close){
      color = "red"
    }
    const offsetX = paddingX + props.renderSize.width / 100 + props.renderSize.width / 20
    const close = (datapoint.close - props.constants.min) / props.intervalY * props.distY + paddingY
    const open = (datapoint.open - props.constants.min) / props.intervalY * props.distY + paddingY
    const high = (datapoint.high - props.constants.min) / props.intervalY * props.distY + paddingY
    const low = (datapoint.low - props.constants.min) / props.intervalY * props.distY + paddingY
    return (
      <Candle
        key={"C"+index}
        x={index * (props.distX / 5) + offsetX}
        close={close}
        high={high}
        low={low}
        open={open}
        color={color}
        width={props.renderSize.width / (5 * props.linesX)}
      />
    )
  })

  return (
    candles
  )
}

export default Datapoints;