import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "components/Store/Store";
import { DataContext } from "components/Store/Data";
import {
  formatMoney,
  formatDoubleNumbers,
} from "components/Global_Components/calculations";
import {
  INCR_CAPITAL,
  INCR_OWNED_STOCKS,
  ADD_OWNED_STOCKS,
} from "components/Store/Actions";

function Trade() {
  const [state, dispatch] = useContext(StoreContext);
  const [data] = useContext(DataContext);

  // Constants for data
  const chosen = state.animation.chosen;
  const currentDate = state.animation.currentDate;
  const currentDataPoint = data.stocks[chosen].datapoints[currentDate];
  const ownedStocks = state.user.ownedStocks;
  const includesChosen = Object.keys(ownedStocks).includes(chosen);

  // State for input handling
  const initalState = {
    buy: {
      count: 1,
      focus: false,
      value: 1 * currentDataPoint.close,
    },
    sell: {
      count: includesChosen && ownedStocks[chosen].numberOfStocks > 0 ? 1 : 0,
      focus: false,
      value:
        (includesChosen && ownedStocks[chosen].numberOfStocks > 0 ? 1 : 0) *
        currentDataPoint.close,
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
      } else {
        // Adding the new owned stock element
        dispatch({
          type: ADD_OWNED_STOCKS,
          payload: { ticker: chosen, number: localState.buy.count },
        });
      }
    } else {
      dispatch({
        type: "ADD_MESSAGE",
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
      } else {
        dispatch({
          type: "ADD_MESSAGE",
          payload: {
            content: "No enough shares owned!",
            id: state.message.lastId,
          },
        });
      }
    } else {
      dispatch({
        type: "ADD_MESSAGE",
        payload: { content: "No shares owned!", id: state.message.lastId },
      });
    }
  };

  // Input handling
  const changeInput = (event) => {
    const id = event.target.id;
    let inputVal = parseInt(event.target.value);

    // Invalid value
    if (!typeof inputVal === "number" || isNaN(inputVal) || inputVal === "") {
      if (localState[id].focus) {
        inputVal = "";
      }
    }

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

  // Focus handling
  const setFocus = (event, focusVal) => {
    const id = event.target.id;
    let count;

    if (
      focusVal === false &&
      (!typeof inputVal === "number" ||
        isNaN(localState[id].count) ||
        localState[id].count === "")
    ) {
      count = 0;
    } else {
      count = localState[id].count;
    }
    setlocalState((prevState) => {
      return {
        ...prevState,
        [id]: {
          ...prevState[id],
          focus: focusVal,
          count: count,
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

  let stock = { numberOfStocks: 0 };
  if (includesChosen) {
    stock = ownedStocks[chosen];
  }

  const calCount = (which) =>
    localState[which].focus
      ? localState[which].count
      : formatDoubleNumbers(localState[which].count);
  const buyCount = calCount("buy");
  const sellCount = calCount("sell");

  return (
    <div className="Trade">
      TRADE
      <div className="DashboardButtons">
        <div className="TradeButtons">
          <span>${formatMoney(localState.buy.value)}</span>
          <input
            type="text"
            id="buy"
            onChange={changeInput}
            onBlur={(e) => {
              setFocus(e, false);
            }}
            onFocus={(e) => {
              setFocus(e, true);
            }}
            value={buyCount}
          />
          <button onClick={buy} id="buy" className="BuyAndSell">
            BUY
          </button>
        </div>
        <div>
          <span>${formatMoney(localState.sell.value)}</span>
          <input
            type="text"
            id="sell"
            onChange={changeInput}
            onBlur={(e) => {
              setFocus(e, false);
            }}
            onFocus={(e) => {
              setFocus(e, true);
            }}
            value={sellCount}
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
