import React from 'react';
import 'stylesheet/App.css';

function Trade() {
  return (
    <div className="Trade">
      TRADE
      <div className="DashboardButtons">
        <div className="TradeButtons">
          <span>$482.42</span><input type="text" value="02" /><button className="BuyAndSell">BUY</button>
        </div>
        <div>
          <span>$0</span><input type="text" value="00"/><button className="BuyAndSell">SELL</button>
        </div>
      </div>
      <div className="DashboardInformation">
        <div>SHARES OWNED: 42</div>
        <div>VALUE: $30 520.65</div>
        <div>PROFIT: $12 012.12</div>
      </div>
    </div>
  )
}

export default Trade;
