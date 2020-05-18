import React, { useContext } from "react";
import StocksListElement from "components/Sidebar/StocksListElement";
import { StoreContext } from "components/Store/Store";
import { DataContext } from "components/Store/Data";

function StocksList() {
  const [state] = useContext(StoreContext);
  const [data] = useContext(DataContext);

  // Constans for data
  const filterType = state.filter.type;
  const filterSearch = state.filter.search;
  const currentDate = state.animation.currentDate;
  const ownedStocks = state.user.ownedStocks;
  const ownedStocksKeys = Object.keys(state.user.ownedStocks);
  let countOfItems = 0;

  // Rendering the items
  const StocksListElements = Object.keys(data.stocks).map((stock) => {
    // Constants of a stock
    const stockData = data.stocks[stock].datapoints;
    const currentPrice = stockData[currentDate].close;
    let owned = 0;
    let value = 0;
    let dir = "line";

    // Filter conditions
    const TextCondition =
      filterSearch === "" || stock.includes(filterSearch.toUpperCase());
    const OwnedCondition =
      (filterType === "owned" &&
        ownedStocksKeys.includes(stock) &&
        ownedStocks[stock].numberOfStocks > 0) ||
      filterType !== "owned";
    const ArrowCondition =
      filterType === dir || filterType === "" || filterType === "owned";

    // Setting Arrow direction
    let prevDate = data.dates[data.dates.indexOf(currentDate) - 1];
    if (prevDate === undefined) {
      prevDate = currentDate;
    }
    if (currentPrice > stockData[prevDate].close) {
      dir = "up";
    } else if (currentPrice < stockData[prevDate].close) {
      dir = "down";
    }

    // Filtering
    if (TextCondition && OwnedCondition && ArrowCondition) {
      // Calculating owned and value
      if (ownedStocksKeys.includes(stock)) {
        owned = ownedStocks[stock].numberOfStocks;
        value = owned * currentPrice;
      }

      const chosen = state.animation.chosen === stock;
      countOfItems++;

      return (
        <StocksListElement
          key={"ListElement-" + stock}
          stock={stock}
          ticker={stock}
          price={currentPrice}
          owned={owned}
          value={value}
          chosen={chosen}
          dir={dir}
        />
      );
    }
    return null;
  });

  return (
    <div className="StocksList">
      {countOfItems > 0 ? StocksListElements : "No found"}
    </div>
  );
}

export default StocksList;
