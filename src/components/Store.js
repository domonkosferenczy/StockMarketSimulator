import React, {createContext, useReducer} from "react";
import Reducer from './Reducer'

export const StoreContext = createContext();

const initialState = {
    user: {
        capitalAvailable: 3400.12,
        ownedStocks: {
            "AMAZ": {numberOfStocks: 2},
        },
        history: {
            valueOfStocks: {
                "2020-01-01": 300
            }
        },
        prevValueOfStocks: 0,
        valueOfStocks: 0
    },
    animation: {
        shownFrom: "2016-01-04",
        currentDate: "2016-01-04",
        speed: 1,
        paused: true,
        zoom: 1,
        chosen: "AMAZ",
        interval: undefined
    },
    filter: {
        search: "",
        type: ""
    }
}

export const Store = props => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
      <StoreContext.Provider value={[state, dispatch]}>
        {props.children}
      </StoreContext.Provider>
    );
  };

