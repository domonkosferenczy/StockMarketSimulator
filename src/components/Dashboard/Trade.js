import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "Store/Store";
import { DataContext } from "Store/Data";
import TradeInput from "./TradeInput";
import { formatMoney } from "components/Global_Components/calculations";
import {
  INCR_CAPITAL,
  INCR_OWNED_STOCKS,
  ADD_OWNED_STOCKS,
  ADD_HISTORY_ACTION,
  ADD_MESSAGE,
} from "Store/Actions";

function Trade() {
  const [state, dispatch] = useContext(StoreContext);
  const [data] = useContext(DataContext);

  // Constants for data
  const chosen = state.animation.chosen;
  const currentDate = state.animation.currentDate;
  let currentDataPoint = data.stocks[chosen].datapoints[currentDate];
  if (currentDataPoint === undefined) {
    currentDataPoint = 0;
  }
  const ownedStocks = state.user.ownedStocks;
  const includesChosen = Object.keys(ownedStocks).includes(chosen);

  // State for input handling
  let close = 0;
  if (currentDataPoint !== undefined) {
    close = currentDataPoint.close;
  }
  let initalState = {
    buy: {
      count: 1,
      value: 1 * close,
    },
    sell: {
      count: includesChosen && ownedStocks[chosen].numberOfStocks > 0 ? 1 : 0,
      value:
        (includesChosen && ownedStocks[chosen].numberOfStocks > 0 ? 1 : 0) *
        close,
    },
  };

  const [localState, setlocalState] = useState(initalState);

  // Buy handling
  const buy = () => {
    // If there is enough money
    if (state.user.capitalAvailable - localState.buy.value > 0) {
      // Increasing capitalAvailaibe
      dispatch({ type: INCR_CAPITAL, payload: -1 * localState.buy.value });
      if (includesChosen) {
        // There is an owned stock like the chosenn
        dispatch({
          type: INCR_OWNED_STOCKS,
          payload: { ticker: chosen, number: localState.buy.count },
        });
        dispatch({
          type: ADD_HISTORY_ACTION,
          payload: {
            date: state.animation.currentDate,
            ticker: chosen,
            number: localState.buy.count,
          },
        });
      } else {
        // Adding the new owned stock element
        dispatch({
          type: ADD_OWNED_STOCKS,
          payload: { ticker: chosen, number: localState.buy.count },
        });
        dispatch({
          type: ADD_HISTORY_ACTION,
          payload: {
            date: state.animation.currentDate,
            ticker: chosen,
            number: localState.buy.count,
          },
        });
      }
    } else {
      dispatch({
        type: ADD_MESSAGE,
        payload: { content: "No enough money!", id: state.message.lastId },
      });
    }
  };

  // Sell handling
  const sell = () => {
    if (includesChosen) {
      if (ownedStocks[chosen].numberOfStocks >= localState.sell.count) {
        dispatch({
          type: INCR_OWNED_STOCKS,
          payload: { ticker: chosen, number: -1 * localState.sell.count },
        });
        dispatch({ type: INCR_CAPITAL, payload: localState.sell.value });
        dispatch({
          type: ADD_HISTORY_ACTION,
          payload: {
            date: state.animation.currentDate,
            ticker: chosen,
            number: -1 * localState.buy.count,
          },
        });
      } else {
        dispatch({
          type: ADD_MESSAGE,
          payload: {
            content: "No enough shares owned!",
            id: state.message.lastId,
          },
        });
      }
    } else {
      dispatch({
        type: ADD_MESSAGE,
        payload: { content: "No shares owned!", id: state.message.lastId },
      });
    }
  };

  // Input handling
  const inputHandler = (id, count) => {
    let inputVal = parseInt(count);

    setlocalState((prevState) => {
      return {
        ...prevState,
        [id]: {
          ...prevState[id],
          count: inputVal,
        },
      };
    });
  };

  // Recalulating values
  useEffect(() => {
    const calVal = (id) => localState[id].count * currentDataPoint.close;
    const valBuy = calVal("buy");
    const valSell = calVal("sell");

    let countSell = localState.sell.count;

    if (!includesChosen) {
      countSell = 0;
    } else {
      if (ownedStocks[chosen].numberOfStocks < countSell) {
        countSell = ownedStocks[chosen].numberOfStocks;
      }
    }

    setlocalState((prevState) => {
      return {
        ...prevState,
        buy: {
          ...prevState.buy,
          value: valBuy,
        },
        sell: {
          ...prevState.sell,
          value: valSell,
          count: countSell,
        },
      };
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    localState.buy.count,
    localState.sell.count,
    state.user.ownedStocks,
    state.animation.chosen,
  ]);

  useEffect(() => {
    const countSell =
      includesChosen && ownedStocks[chosen].numberOfStocks > 0 ? 1 : 0;
    const countBuy = 1;
    setlocalState((prevState) => {
      return {
        ...prevState,
        buy: {
          ...prevState.buy,
          count: countBuy,
        },
        sell: {
          ...prevState.sell,
          count: countSell,
        },
      };
    });
  }, [
    state.user.ownedStocks,
    state.animation.chosen,
    includesChosen,
    ownedStocks,
    chosen,
  ]);

  let stock = { numberOfStocks: 0 };
  if (includesChosen) {
    stock = ownedStocks[chosen];
  }

  return (
    <div className="Trade">
      TRADE
      <div className="DashboardButtons">
        <div className="TradeButtons">
          <span>${formatMoney(localState.buy.value)}</span>
          <TradeInput
            type={"buy"}
            inputHandler={(type, count) => inputHandler(type, count)}
            count={localState.buy.count}
          />
          <button onClick={buy} id="buy" className="BuyAndSell">
            BUY
          </button>
        </div>
        <div>
          <span>${formatMoney(localState.sell.value)}</span>
          <TradeInput
            type={"sell"}
            inputHandler={(type, count) => inputHandler(type, count)}
            count={localState.sell.count}
          />
          <button onClick={sell} id="sell" className="BuyAndSell">
            SELL
          </button>
        </div>
      </div>
      <div className="DashboardInformation">
        <div>SHARES OWNED: {stock.numberOfStocks}</div>
        <div>
          VALUE: ${formatMoney(stock.numberOfStocks * currentDataPoint.close)}
        </div>
      </div>
    </div>
  );
}

export default Trade;
