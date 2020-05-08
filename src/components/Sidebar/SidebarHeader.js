import React, {useContext} from 'react';
import Arrow from '../Arrow'
import 'stylesheet/App.css';
import {StoreContext} from 'components/Store';
import {formatDate, formatMoney} from 'components/calculations'
import { DataContext } from 'components/Data';

function SidebarHeader() {
  
  const [state] = useContext(StoreContext);
  const data = useContext(DataContext);

  const valueOfStocks = Object.keys(state.user.ownedStocks).reduce((accumulator, stock) => 
      accumulator + (state.user.ownedStocks[stock].numberOfStocks * data.stocks[stock].datapoints[state.animation.currentDate].close), 0
  )

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
          <div className="SidebarHeader-value">${formatMoney(valueOfStocks)}</div>
        </div>
        <Arrow dir={"up"} />
      </div>
    </div>
  )
  }

export default SidebarHeader;
