import React, { useContext } from "react";
import Arrow from "../Global_Components/Arrow";
import { StoreContext } from "components/Store/Store";
import { formatMoney } from "components/Global_Components/calculations";
import { SET_CHOSEN } from "components/Store/Actions";

function StocksListElement(props) {
  const [, dispatch] = useContext(StoreContext);

  // Constants for classNames
  const chosen = props.chosen ? " chosen" : "";
  const className = "StocksList-element" + chosen;

  // Function for click handling
  const chosing = (stock) => {
    dispatch({ type: SET_CHOSEN, payload: stock });
  };

  return (
    <div className={className} onClick={() => chosing(props.stock)}>
      <div className="StocksList-element-column">
        <div className="StocksList-element-columnTicker">{props.ticker}</div>
        <div className="StocksList-element-columnPrice">
          ${formatMoney(props.price)}
        </div>
      </div>
      <div className="StocksList-element-column">
        <div>SHARES OWNED: {props.owned}</div>
        <div>VALUE: ${formatMoney(props.value)}</div>
      </div>
      <div className="StocksList-element-column">
        <Arrow dir={props.dir} />
      </div>
    </div>
  );
}

export default StocksListElement;
