import React, { useContext } from 'react';
import Xaxis from './Graph/Xaxis'
import Yaxis from './Graph/Yaxis'
import Datapoints from './Graph/Datapoints'
import { StoreContext } from './Store/Store';
import { DataContext } from './Store/Data';
import { useContainerSize } from 'components/Graph/GraphFunctions';
import 'stylesheet/graph.css'

function Graph() {
  const [state] = useContext(StoreContext);
  const [data] = useContext(DataContext);
  const container = useContainerSize();

  // Constants for data
  const chosenDatapoints = data.stocks[state.animation.chosen].datapoints
  const allDates = Object.keys(chosenDatapoints);
  const shownFrom = allDates.indexOf(state.animation.shownFrom)
  const shownTo = allDates.indexOf(state.animation.currentDate) +1
  const shownDates = allDates.slice(shownFrom, shownTo)
  const shownDataPoints = shownDates.map(date => {
    return chosenDatapoints[date]
  })

  // Constants for graphical
  const viewBoxValue = "0 0 " + container.width + " " + container.height
  const padding = { horizontal: container.width / 20, vertical: container.height / 20 }
  const renderSize = { width: container.width - padding.horizontal, height: container.height - padding.vertical }
  const offsetX = padding.vertical + renderSize.width * 0.06
  const lines = { X: 13, Y: 6 }
  const distY = renderSize.height / lines.Y
  const zoomRatio = Math.round(Math.round(allDates.length / (lines.X -1)) / state.animation.zoom)
  const edge = { min: Number.MAX_VALUE, max: Number.MIN_VALUE }
  let distance = 0

  // Searching for the lowest and highest value
  const listOfNumbers = []
  shownDataPoints.map(date => {
    const numbers = Object.keys(date).map((key) => {
      return date[key]
    })
    listOfNumbers.push(...numbers)
    return ""
  })

  // Expand limit
  edge.min = Math.min(...listOfNumbers) * 0.8
  edge.max = Math.max(...listOfNumbers) * 1.2

  // Calculating distance from min to max
  if (edge.min < 0 || edge.max < 0){
    distance = edge.max + Math.abs(edge.min)
  } else {
    distance = edge.max - edge.min
  }

  const intervalY = distance / lines.Y

  // Taking constants to an object
  const propsInObject = {
    padding: padding,
    renderSize: renderSize,
    lines: lines,
    intervalY: intervalY,
    distY: distY,
    min: edge.min,
    zoomRatio: zoomRatio,
    shownDataPoints: shownDataPoints,
    offsetX: offsetX
  }
  
  return (
    <div className="Graph">
      <svg className="GraphSVG" viewBox={viewBoxValue} >
        <Xaxis propsInObject={propsInObject} />
        <Yaxis propsInObject={propsInObject} />
        <Datapoints propsInObject={propsInObject} />
      </svg>
    </div>
  )
}

export default Graph;
