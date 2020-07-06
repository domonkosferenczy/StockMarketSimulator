import React, { useState, useContext } from "react";
import StocksFilter from "./StocksFilter";
import StocksList from "./StocksList";
import { StoreContext } from "../../Store/Store";
import AllStocks from "components/Global_Components/AllStocks";

function AvailableStocks() {
  const [, stateDispatch] = useContext(StoreContext);

  const [showAllStocks, setShowAllStocks] = useState(false);
  const [loadedAllStocks, setLoadedAllStocks] = useState(true);

  const showAllStocksHandler = () => {
    setShowAllStocks(true);
    setLoadedAllStocks(false);
    stateDispatch({ type: "SET_PAUSED", payload: true });
  };

  const hideAllStocks = () => {
    setShowAllStocks(false);
  };

  const loadedAllStocksHandler = () => {
    setLoadedAllStocks(true);
  };

  return (
    <div className="AvailableStocks">
      <div className="AvailableStocks-header">
        <span>AVAILABLE STOCKS</span>
        <button className="Dashboard-button" onClick={showAllStocksHandler}>
          {loadedAllStocks ? "NEW STOCK" : "LOADING..."}
        </button>
      </div>
      <AllStocks
        show={showAllStocks}
        hide={hideAllStocks}
        loaded={loadedAllStocksHandler}
      />
      <StocksFilter />
      <StocksList />
    </div>
  );
}

export default AvailableStocks;
