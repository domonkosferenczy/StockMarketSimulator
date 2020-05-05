import React from 'react';
import Arrow from '../Arrow'

function StocksListElement(props){

    const chosen = (props.chosen)?" chosen":"";
    const className = "StocksList-element" + chosen;

    return (
    <div className={className}>
        <div className="StocksList-element-column">
            <div className="StocksList-element-columnTicker">{props.ticker}</div>
            <div className="StocksList-element-columnPrice">{props.price}</div>
        </div>
        <div className="StocksList-element-column">
            <div>SHARES OWNED: {props.owned}</div>
          <div>VALUE: {props.value}</div>
        </div>
        <div className="StocksList-element-column">
        <Arrow dir={"up"} />
        </div>
    </div>
    )
}

export default StocksListElement;