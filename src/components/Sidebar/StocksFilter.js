import React from 'react';
import Arrow from '../Arrow'
import 'stylesheet/App.css';

function StocksFilter() {

  return (
    <div className="StocksFilter">
      <div>
        <Arrow dir={"up"} size="small" />
        <Arrow dir={"down"} size="small" />
        <span>T</span>
      </div>
      <input placeholder="Type the name of the Stock" value="" />
    </div>
  )
}

export default StocksFilter;
