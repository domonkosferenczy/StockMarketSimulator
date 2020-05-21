import React, { useContext, useEffect } from "react";
import { StoreContext } from "components/Store/Store";
import { DataContext } from "components/Store/Data";

function Analytics() {
  const [state, dispatch] = useContext(StoreContext);
  const [data] = useContext(DataContext);

  const capitalAvailable = state.user.capitalAvailable;
  const currentDate = state.animation.currentDate;
  const ownedStocks = state.user.ownedStocks;

  // Calculating the present value of the Stocks
  const valueOfStocks = Object.keys(ownedStocks).reduce(
    (accumulator, stock) => {
      const number = ownedStocks[stock].numberOfStocks;
      const stockValue = data.stocks[stock].datapoints[currentDate].close;
      return accumulator + number * stockValue;
    },
    0
  );

  useEffect(() => {
    dispatch({
      type: "ADD_HISTORY_CAPITAL",
      payload: {
        date: currentDate,
        value: capitalAvailable,
      },
    });
    dispatch({
      type: "ADD_HISTORY_VALUE_OF_STOCKS",
      payload: {
        date: currentDate,
        value: valueOfStocks,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  return <div className="Analytics">ANALYTICS</div>;
}

export default Analytics;
