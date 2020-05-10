import React, { useContext } from 'react';
import Candle from './Candle'
import 'stylesheet/App.css';
import { StoreContext } from 'components/Store';

function Datapoints(props) {

  const [state] = useContext(StoreContext)
  const paddingY = props.padding.horizontal
  const paddingX = props.padding.vertical
  
  const datapoints = props.shownDates.map((date) => {
    return props.data.stocks[state.animation.chosen].datapoints[date]
  })

  const candles = datapoints.map((datapoint, index) => {
    let color = "green"
    if (index-1 >= 0 && datapoints[index-1].close > datapoint.close){
      color = "red"
    }
    const offsetX = props.renderSize.width / 100
    const close = (datapoint.close - props.constants.min) / props.intervalY * props.distY + paddingY
    const open = (datapoint.open - props.constants.min) / props.intervalY * props.distY + paddingY
    const high = (datapoint.high - props.constants.min) / props.intervalY * props.distY + paddingY
    const low = (datapoint.low - props.constants.min) / props.intervalY * props.distY + paddingY
    return (
      <Candle
        key={"C"+index}
        x={index * (props.distX / 5) + props.distX + offsetX}
        close={close}
        high={high}
        low={low}
        open={open}
        color={color}
        width={props.renderSize.width / 150}
      />
    )
  })

  return (
    candles
  )
}

export default Datapoints;