import React, { useContext, useState, useEffect } from 'react';
import Arrow from '../Arrow'
import 'stylesheet/App.css';
import {StoreContext} from 'components/Store';
import {formatDate, formatMoney} from 'components/calculations'
import { DataContext } from 'components/Data';

function SidebarHeader() {
  
  const [state] = useContext(StoreContext);
  const data = useContext(DataContext);
  const [stateValueOfStocks, setStateValueOfStocks] = useState(0)
  const [change, setChange] = useState("line")

  const valueOfStocks = Object.keys(state.user.ownedStocks).reduce((accumulator, stock) => 
    accumulator + (state.user.ownedStocks[stock].numberOfStocks * data.stocks[stock].datapoints[state.animation.currentDate].close), 0
  )


  useEffect(() => {
    if (valueOfStocks !== stateValueOfStocks){
      setStateValueOfStocks(valueOfStocks)
    }

    if (valueOfStocks > stateValueOfStocks){
      setChange("up")
    } else {
      if (valueOfStocks !== stateValueOfStocks){
        setChange("down")
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.animation.currentDate, state.user.ownedStocks])


  return (
    <div className="SidebarHeader">
      <div className="SidebarHeader-row">
        <div>
          <div className="SidebarHeader-title">DATE</div>
          <div className="SidebarHeader-value">{formatDate(state.animation.currentDate)}</div>
        </div>
      </div>
      <div className="SidebarHeader-row">
        <div>
          <div className="SidebarHeader-title">CAPITAL AVAILABLE</div>
          <div className="SidebarHeader-value">${formatMoney(state.user.capitalAvailable)}</div>
        </div>
      </div>
      <div className="SidebarHeader-row">
        <div>
          <div className="SidebarHeader-title">VALUE OF STOCKS</div>
          <div className="SidebarHeader-value">${formatMoney(stateValueOfStocks)}</div>
        </div>
        <Arrow dir={change} />
      </div>
    </div>
  )
  }

export default SidebarHeader;
