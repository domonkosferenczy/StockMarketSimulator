import React, { useState, useEffect } from "react";
import { formatDoubleNumbers } from "../Global_Components/calculations";

function TradeInput(props) {
  const initialState = {
    focus: false,
    count: props.count,
  };

  const [localState, setlocalState] = useState(initialState);

  useEffect(() => {
    props.inputHandler(props.type, localState.count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localState]);

  useEffect(() => {
    setlocalState((prevState) => {
      return { ...prevState, count: props.count };
    });
  }, [props.count]);

  // Focus handling
  const setFocus = (focusVal) => {
    let count;
    if (
      focusVal === false &&
      (!typeof inputVal === "number" ||
        isNaN(localState.count) ||
        localState.count === "")
    ) {
      count = 0;
    } else {
      count = localState.count;
    }
    setlocalState((prevState) => {
      return {
        ...prevState,
        focus: focusVal,
        count: count,
      };
    });
  };

  // Input handling
  const changeInput = (event) => {
    let inputVal = parseInt(event.target.value);

    // Invalid value
    if (!typeof inputVal === "number" || isNaN(inputVal) || inputVal === "") {
      if (localState.focus) {
        inputVal = "";
      }
    }

    setlocalState((prevState) => {
      return {
        ...prevState,
        count: inputVal,
      };
    });
  };

  const buyCount = localState.focus
    ? localState.count
    : formatDoubleNumbers(localState.count);

  return (
    <input
      type="text"
      id="buy"
      onChange={changeInput}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
      value={buyCount}
    />
  );
}

export default TradeInput;
