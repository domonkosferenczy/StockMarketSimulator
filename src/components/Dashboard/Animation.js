import React from 'react';
import 'stylesheet/App.css';
import Faster from 'images/faster.svg'
import Play from 'images/play.svg'
import PlayEnd from 'images/playEnd.svg'
import Minus from 'images/minus.svg'
import Plus from 'images/plus.svg'

function Animation() {
  return (
    <div className="Animation">
    ANIMATION
    <div className="DashboardButtons">
      <div className="AnimationButtons">
        <div className="AnimationButtons-plusMinus">
          <button><img src={Plus} alt="Plus" /></button>
          <button><img src={Minus} alt="Minus" /></button>
        </div>
        <button><img src={PlayEnd} alt="PlayEndBack" style={{transform: "rotateZ(180deg)"}} /></button>
        <button><img src={Faster} alt="Slower" style={{transform: "rotateZ(180deg)"}} /></button>
        <button><img src={Play} alt="Play" /></button>
        <button><img src={Faster} alt="Faster" /></button>
        <button><img src={PlayEnd} alt="PlayEnd" /></button>
      </div>
    </div>
    <div className="DashboardInformation">
      <div>SPEED: 1x</div>
      <div>DAYS FROM THE START: 432</div>
      <div>DAYS UNTIL THE END: 43</div>
      <div>SHOWN: 148 days</div>
    </div>
  </div>
  )
}

export default Animation;
