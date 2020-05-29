import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

const initialData = {
  loaded: false,
};

export const DataContext = createContext(initialData);

export const Data = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialData);
  return (
    <DataContext.Provider value={[state, dispatch]}>
      {props.children}
    </DataContext.Provider>
  );
};
