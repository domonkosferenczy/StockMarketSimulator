import React, { useContext } from 'react';
import Arrow from '../Arrow';
import {StoreContext} from 'components/Store'
import {formatMoney} from 'components/calculations'


function StocksListElement(props){

    const [, dispatch] = useContext(StoreContext);

    const chosen = (props.chosen)?" chosen":"";
    const className = "StocksList-element" + chosen;

    function handleClick(stock)  {
        dispatch({type: "SET_CHOSEN", payload: stock})
    }

    return (
    <div className={className} onClick={() => handleClick(props.stock)}>
        <div className="StocksList-element-column">
            <div className="StocksList-element-columnTicker">{props.ticker}</div>
            <div className="StocksList-element-columnPrice">${formatMoney(props.price)}</div>
        </div>
        <div className="StocksList-element-column">
            <div>SHARES OWNED: {props.owned}</div>
          <div>VALUE: ${formatMoney(props.value)}</div>
        </div>
        <div className="StocksList-element-column">
        <Arrow dir={props.dir} />
        </div>
    </div>
    )
}

export default StocksListElement;