import React, { useContext } from "react";
import Arrow from "../Global_Components/Arrow";
import { SET_FILTER_INPUT, SET_FILTER_TYPE } from "Store/Actions";
import { StoreContext } from "Store/Store";

function StocksFilter() {
  const [state, dispatch] = useContext(StoreContext);

  const filterType = state.filter.type;

  // Setting the chosen filter input in global state
  const handleChangeInput = (event) => {
    const val = event.target.value;
    dispatch({ type: SET_FILTER_INPUT, payload: val });
  };

  // Setting the filter type in global state
  const filterClick = (mode) => {
    mode = filterType === mode ? "" : mode;
    dispatch({ type: SET_FILTER_TYPE, payload: mode });
  };

  // Returns with a className if chosen or not
  const filterChosen = (buttonType) => {
    if (filterType === buttonType) {
      return "filterChosen";
    } else {
      return "";
    }
  };

  return (
    <div className="StocksFilter">
      <div>
        <button
          onClick={() => {
            filterClick("up");
          }}
          className={filterChosen("up")}
        >
          <Arrow dir={"up"} size="small" />
        </button>
        <button
          onClick={() => filterClick("down")}
          className={filterChosen("down")}
        >
          <Arrow dir={"down"} size="small" />
        </button>
        <button
          onClick={() => filterClick("owned")}
          className={filterChosen("owned")}
        >
          O
        </button>
      </div>
      <input placeholder="Ticker Name" onChange={handleChangeInput} />
    </div>
  );
}

export default StocksFilter;
