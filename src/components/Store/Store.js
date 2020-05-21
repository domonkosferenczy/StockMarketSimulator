import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

export const StoreContext = createContext();

const initialState = {
  user: {
    capitalAvailable: 3400.12,
    ownedStocks: {},
    prevValueOfStocks: 0,
    valueOfStocks: 0,
    history: {
      capitalAvailable: { "2016-01-04": 0 },
      valueOfStocks: { "2016-01-04": 0 },
    },
  },
  animation: {
    shownFrom: "2016-01-04",
    currentDate: "2016-01-04",
    speed: 500,
    paused: true,
    zoom: 10,
    chosen: "AAPL",
    candle: true,
  },
  filter: {
    search: "",
    type: "",
  },
  message: {
    lastId: 0,
    messages: [],
  },
};

export const Store = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {props.children}
    </StoreContext.Provider>
  );
};
