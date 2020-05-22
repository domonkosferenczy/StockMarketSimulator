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
  }, [currentDate, capitalAvailable, ownedStocks]);

  const ChangeHandler = (event, nr) => {
    const newArray = state.animation.shown;
    newArray[nr] = event.target.value;
    dispatch({
      type: "CHANGE_SHOW",
      payload: newArray,
    });
  };

  const selects = [];
  for (let i = 0; i < 4; i++) {
    let stocks = Object.keys(data.stocks);
    stocks = stocks.map((stock, index) => {
      return (
        <option value={stock} key={"O" + i + "" + index}>
          {stock}
        </option>
      );
    });
    selects.push(
      <select
        onChange={(e) => ChangeHandler(e, i)}
        key={"S" + i}
        defaultValue={state.animation.shown[i]}
      >
        <option value="Chosen">Chosen</option>
        <option value="Capital Available">Capital Available</option>
        <option value="Value Of Stocks"> Value Of Stocks</option>
        {stocks}
      </select>
    );
  }

  return (
    <div className="Analytics">
      ANALYTICS
      <div>{selects}</div>
    </div>
  );
}

export default Analytics;
