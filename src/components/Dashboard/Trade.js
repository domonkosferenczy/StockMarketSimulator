import React, {useContext, useState, useEffect} from 'react';
import 'stylesheet/App.css';
import {StoreContext} from 'components/Store';
import {DataContext} from 'components/Data';
import {formatMoney, formatDoubleNumbers} from 'components/calculations'


function Trade() {

  const [state, dispatch] = useContext(StoreContext);
  const [data] = useContext(DataContext);
  const chosen = state.animation.chosen

  const initalState = {
    buy: {
      count: 1,
      focus: false,
      value: 1 * data.stocks[chosen].datapoints[state.animation.currentDate].close
    },
    sell: {
      count: (Object.keys(state.user.ownedStocks).includes(chosen) && state.user.ownedStocks[chosen].numberOfStocks > 0)?1:0,
      focus: false,
      value: ((Object.keys(state.user.ownedStocks).includes(chosen) && state.user.ownedStocks[chosen].numberOfStocks > 0)?1:0) * data.stocks[chosen].datapoints[state.animation.currentDate].close
    }
  }

  useEffect(() => {
    setlocalState(initalState)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosen, state.animation.currentDate])

  const [localState, setlocalState] = useState(initalState);

  const buy = () => {
    // If there is enough money
    if (state.user.capitalAvailable - localState.buy.value > 0){
      // Increasing capitalAvailaibe
      dispatch({type: 'INCR_CAPITAL', payload: -1 * localState.buy.value});
      if (Object.keys(state.user.ownedStocks).includes(chosen)){
        // There is an owned stock like the chosenn
        dispatch({type: 'INCR_OWNED_STOCKS', payload: {ticker: chosen, number: localState.buy.count}});
      } else {
          // Adding the new owned stock element
          dispatch({type: 'ADD_OWNED_STOCKS', payload: {ticker: chosen, number: localState.buy.count}});
        }
    } else {
      // No enough money
    }
    dispatch({type: "SET_PAUSED", payload: false})
  }

  const sell = () => {
      if (Object.keys(state.user.ownedStocks).includes(chosen)){
        if (state.user.ownedStocks[chosen].numberOfStocks >= localState.sell.count){
          dispatch({type: 'INCR_OWNED_STOCKS', payload: {ticker: chosen, number: -1 * localState.sell.count}});
          dispatch({type: 'INCR_CAPITAL', payload: localState.sell.value});
        } else {
          console.log("Wrong amount!")
        }
      } else {
          console.log("No shares owned!")
        }
    }
  


  const changeInput = (event) => {
    let inputVal = parseInt(event.target.value);
    let id = event.target.id;

    // Invalid value
    if (!typeof inputVal === "number" || isNaN(inputVal)){
      inputVal = 0
    }

    // Chechking if there are available enough stocks
    if(id === "sell"){
      if (!Object.keys(state.user.ownedStocks).includes(chosen)){
          inputVal = 0
      } else {
        if (state.user.ownedStocks[chosen].numberOfStocks < inputVal){
          inputVal = state.user.ownedStocks[chosen].numberOfStocks
        }
      }
    }
  
    let val = inputVal * data.stocks[chosen].datapoints[state.animation.currentDate].close
    setlocalState((prevState) => {
      return {
        ...prevState,
        [id]: {
          ...prevState[id],
          value: val,
          count: inputVal
        }
      }
    })
  }

  const setFocus = (event, focusVal) => {
    let id = event.target.id;
    setlocalState((prevState) => {
      return {
        ...prevState,
        [id]: {
          ...prevState[id],
          focus: focusVal
        }
      }
    })
  }

  let stock = {numberOfStocks: 0, profit: 0}
  if (Object.keys(state.user.ownedStocks).includes(chosen)) {
    stock = state.user.ownedStocks[chosen]
  }


  return (
    <div className="Trade">
      TRADE
      <div className="DashboardButtons">
        <div className="TradeButtons">
          <span>${formatMoney(localState.buy.value)}</span>
          <input type="text" id="buy" onChange={changeInput} onBlur={(e) => setFocus(e, false)} onFocus={(e) => setFocus(e, true)} value={(localState.buy.focus)?localState.buy.count:formatDoubleNumbers(localState.buy.count)} />
          <button onClick={buy} id="buy" className="BuyAndSell">BUY</button>
        </div>
        <div>
          <span>${formatMoney(localState.sell.value)}</span>
          <input type="text" id="sell" onChange={changeInput} onBlur={(e) => setFocus(e, false)} onFocus={(e) => setFocus(e, true)} value={(localState.sell.focus)?localState.sell.count:formatDoubleNumbers(localState.sell.count)} />
          <button onClick={sell} id="sell" className="BuyAndSell">SELL</button>
        </div>
      </div>
      <div className="DashboardInformation">
        <div>SHARES OWNED: {stock.numberOfStocks}</div>
        <div>VALUE: ${formatMoney(stock.numberOfStocks * data.stocks[chosen].datapoints[state.animation.currentDate].close)}</div>
      </div>
    </div>
  )
}



export default Trade;
