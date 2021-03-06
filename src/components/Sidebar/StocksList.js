import React, { useContext } from "react";
import StocksListElement from "components/Sidebar/StocksListElement";
import { StoreContext } from "Store/Store";
import { DataContext } from "Store/Data";

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
    let currentPrice;
    try {
      currentPrice = stockData[currentDate].close;
    } catch {
      currentPrice = NaN;
    }
    let owned = 0;
    let value = 0;
    let dir = "line";

    // Setting Arrow direction
    let prevDate = data.dates[data.dates.indexOf(currentDate) - 1];
    if (prevDate === undefined) {
      prevDate = currentDate;
    }
    let prevDateValue;
    try {
      prevDateValue = stockData[prevDate].close;
    } catch {
      prevDateValue = NaN;
    }
    if (currentPrice > prevDateValue) {
      dir = "up";
    } else if (currentPrice < prevDateValue) {
      dir = "down";
    }

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

  if (countOfItems > 0) {
    return <div className="StocksList">{StocksListElements}</div>;
  } else {
    return (
      <div className="StocksList">
        <div className="StocksList-NoFound">Not Found</div>
      </div>
    );
  }
}

export default StocksList;
