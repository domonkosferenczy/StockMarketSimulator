import React, { useContext } from 'react';
import StocksListElement from 'components/Sidebar/StocksListElement'
import 'stylesheet/App.css';
import {StoreContext} from 'components/Store'
import {DataContext} from 'components/Data'

function StocksList() {

  const [state] = useContext(StoreContext);
  const data = useContext(DataContext);

  let items = 0;

  const StocksListElements = Object.keys(data.stocks).map((stock) => {
    //Filter
    const filterType = state.filter.type
    const currentDate = state.animation.currentDate

    if (state.filter.search === "" || state.filter.search === undefined || stock.includes(state.filter.search.toUpperCase())){
      items++;
      const stockData = data.stocks[stock].datapoints
      const price = stockData[currentDate].close;
      const ownedStocks = Object.keys(state.user.ownedStocks);

      if ((filterType === "owned" && ownedStocks.includes(stock)) || (filterType !== "owned")){
        let owned = 0;
        let value = 0;
        let dir;
        let prevDate = data.dates[(data.dates.indexOf(currentDate) -1)]
        if (prevDate === undefined){
          prevDate = currentDate
        }
        if (stockData[currentDate].close > stockData[prevDate].close){
          dir = "up"
        } else if(stockData[currentDate].close < stockData[prevDate].close){
          dir = "down"
        } else {
          dir = "line"
        }
        if (filterType === dir || filterType === "" || filterType === "owned"){
          if (ownedStocks.includes(stock)){
            owned = state.user.ownedStocks[stock].numberOfStocks
            value = owned * stockData[currentDate].close
          }
          const chosen = (state.animation.chosen === stock)
          return <StocksListElement key={stock} stock={stock} ticker={stock} price={`${price}`} owned={owned} value={`${value}`} chosen={chosen} dir={dir}/>
        }
      }
    }
    return ""
  })

  return (
    <div className="StocksList">
      {(items > 0)?StocksListElements:"No found"}
    </div>
  )
}

export default StocksList;
