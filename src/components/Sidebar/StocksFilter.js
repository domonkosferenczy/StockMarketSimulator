import React, { useContext } from 'react';
import Arrow from '../Arrow'
import 'stylesheet/App.css';
import { StoreContext } from 'components/Store';

function StocksFilter() {

  const [state, dispatch] = useContext(StoreContext);

  const handleChangeInput = (event) => {
    let val = event.target.value;
    dispatch({type: "SET_FILTER_INPUT", payload: val})
  }

  const filterClick = mode => {
    mode = (state.filter.type === mode)?"":mode
    dispatch({type: "SET_FILTER_TYPE", payload: mode})
  }

  return (
    <div className="StocksFilter">
      <div>
        <button onClick={() => filterClick("up")} className={(state.filter.type === "up")?"filterChosen":""}><Arrow dir={"up"} size="small"  /></button>
        <button onClick={() => filterClick("down")} className={(state.filter.type === "down")?"filterChosen":""}><Arrow dir={"down"} size="small" /></button>
        <button onClick={() => filterClick("owned")} className={(state.filter.type === "owned")?"filterChosen":""}>O</button>
      </div>
      <input placeholder="Type the name of the Stock" onChange={handleChangeInput} />
    </div>
  )
}

export default StocksFilter;
