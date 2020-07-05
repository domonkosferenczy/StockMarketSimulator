import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../Store/Data";
import { StoreContext } from "../../Store/Store";
import { requestTickers, requestStock } from "../../api/parseData";

function AllStocks(props) {
  const [data, DataDispatch] = useContext(DataContext);
  const [state, StateDispatch] = useContext(StoreContext);

  const inititalState = {
    tickers: {},
    shown: false,
    loaded: false,
  };

  const [localState, setlocalState] = useState(inititalState);

  useEffect(() => {
    setlocalState((prevState) => {
      return {
        ...prevState,
        shown: props.show,
      };
    });
  }, [props.show]);

  const requestData = async () => {
    const all = await requestTickers();
    const newData = {
      tickers: {},
    };
    Object.keys(all.tickers).forEach((ticker) => {
      if (!Object.keys(data.stocks).includes(ticker)) {
        const obj = {
          [ticker]: {
            selected: false,
            startDate: all.tickers[ticker].startDate,
            endDate: all.tickers[ticker].endDate,
            name: all.tickers[ticker].name,
          },
        };
        Object.assign(newData.tickers, obj);
      }
    });
    setlocalState((prevState) => {
      return {
        ...prevState,
        tickers: newData.tickers,
        loaded: true,
      };
    });
  };

  const selectHandler = (ticker) => {
    setlocalState((prevState) => {
      return {
        ...prevState,
        tickers: {
          ...prevState.tickers,
          [ticker]: {
            ...prevState.tickers[ticker],
            selected: !localState.tickers[ticker].selected,
          },
        },
      };
    });
  };

  const closeWindow = () => {
    setlocalState((prevState) => {
      return {
        ...prevState,
        shown: false,
      };
    });
    props.hide();
  };

  const add = async () => {
    const toAdd = Object.keys(localState.tickers).filter(
      (ticker) => localState.tickers[ticker].selected
    );
    const prevData = data;
    for (let i = 0; i < toAdd.length; i++) {
      const data = await requestStock(toAdd[i]);
      Object.assign(prevData.stocks, data.stocks);
    }
    DataDispatch({ type: "SET_DATA", payload: prevData });
    StateDispatch({ type: "" });
    closeWindow();
  };

  let visibleClass = "popup-window-toHide";
  if (!localState.shown) {
    if (!localState.loaded) {
      requestData();
    }
    return "";
  } else {
    const tickers = [];
    if (localState.loaded) {
      props.loaded();
      visibleClass = "popup-window-toShow";
    }

    Object.keys(localState.tickers).map((ticker) => {
      if (!Object.keys(data.stocks).includes(ticker)) {
        tickers.push(
          <div
            className="popup-window-table-body"
            key={`${ticker}-allStocks`}
            onClick={() => selectHandler(ticker)}
          >
            <span>{localState.tickers[ticker].name}</span>
            <span>{ticker.toUpperCase()}</span>
            <span>{localState.tickers[ticker].startDate}</span>
            <span>{localState.tickers[ticker].endDate}</span>
            <span>
              <input
                type="checkbox"
                name="allStocks"
                value={ticker.toUpperCase()}
                checked={localState.tickers[ticker].selected}
                onChange={() => selectHandler(ticker)}
              />
            </span>
          </div>
        );
      }
    });

    return (
      <div className={`popup-window-bg ${visibleClass}`}>
        <div className="popup-close" onClick={closeWindow}></div>
        <div className="popup-window">
          <div className="popup-window-table">
            <div className="popup-window-table-header">
              <span>Name</span>
              <span>Ticker</span>
              <span>From</span>
              <span>To</span>
              <span>Select</span>
            </div>
            {tickers.length === 0 ? "No More Stocks Available" : tickers}
          </div>
          <div className="popup-window-table-footer">
            <div>
              <button className="Dashboard-button" onClick={add}>
                Add them
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AllStocks;
