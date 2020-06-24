import React, { useState } from "react";
import { requestTickers, requestAll } from "../../api/parseData";

function AllStocks() {
  const [localState, setlocalState] = useState(undefined);

  const requestData = async () => {
    const all = await requestTickers();
    const newData = {
      tickers: {},
    };
    Object.keys(all.tickers).forEach((ticker) => {
      const obj = {
        [ticker]: {
          selected: false,
          startDate: all.tickers[ticker].startDate,
          endDate: all.tickers[ticker].endDate,
          name: all.tickers[ticker].name,
        },
      };
      Object.assign(newData.tickers, obj);
    });
    setlocalState(newData);
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

  if (localState === undefined) {
    requestData();
    return "Loading...";
  } else {
    const tickers = [];

    Object.keys(localState.tickers).map((ticker) => {
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
    });

    return (
      <div className="popup-window-bg">
        <div className="popup-window popup-window-toShow">
          <div className="popup-window-table">
            <div className="popup-window-table-header">
              <span>Name</span>
              <span>Ticker</span>
              <span>From</span>
              <span>To</span>
              <span>Select</span>
            </div>
            {tickers}
          </div>
          <div className="popup-window-table-footer">
            <div>
              <button className="Dashboard-button">Add them</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AllStocks;
