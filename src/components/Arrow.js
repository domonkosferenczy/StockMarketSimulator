import React from 'react';
import '../stylesheet/App.css';
import greenArrow from '../images/green_arrow.svg'
import redArrow from '../images/red_arrow.svg'
import line from '../images/line.svg'

function Arrow(props) {

  let size = "23px";

  if (props.size === "small"){
    size = "10px"
  }

  if (props.dir === "up"){
    return (
      <img src={greenArrow} alt="UP ARROW" width={size} />
    )
  } else if (props.dir === "down") {
    return (
      <img src={redArrow} alt="DOWN ARROW" width={size} />
    )
  } else {
    return (
      <img src={line} alt="LINE" width={size} />
    )
  }
}

export default Arrow;
