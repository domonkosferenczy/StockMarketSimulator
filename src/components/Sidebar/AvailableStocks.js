import React from "react";
import StocksFilter from "./StocksFilter";
import StocksList from "./StocksList";

function AvailableStocks() {
  return (
    <div className="AvailableStocks">
      <div className="AvailableStocks-header">
        <span>AVAILABLE STOCKS</span>
        <button className="Dashboard-button">NEW STOCK</button>
      </div>
      <StocksFilter />
      <StocksList />
    </div>
  );
}

export default AvailableStocks;
