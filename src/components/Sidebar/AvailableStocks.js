import React from 'react';
import StocksFilter from './StocksFilter'
import StocksList from './StocksList'


function AvailableStocks() {
  return (
    <div className="AvailableStocks">
      <div>AVAILABLE STOCKS</div>
      <StocksFilter />
      <StocksList />
    </div>
  )
}

export default AvailableStocks;
