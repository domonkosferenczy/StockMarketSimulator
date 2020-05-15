import React, {useContext, useState, useEffect} from 'react';
import 'stylesheet/App.css';
import { StoreContext } from 'components/Store';
import { DataContext } from 'components/Data';
import { formatMoney, formatDoubleNumbers } from 'components/calculations'

function Trade() {

  const [state, dispatch] = useContext(StoreContext);
  const [data] = useContext(DataContext);

  const chosen = state.animation.chosen
  const currentDate = state.animation.currentDate
  const currentDataPoint = data.stocks[chosen].datapoints[currentDate]
  const ownedStocks = state.user.ownedStocks
  const includesChosen = Object.keys(ownedStocks).includes(chosen)

  const initalState = {
    buy: {
      count: 1,
      focus: false,
      value: 1 * currentDataPoint.close
    },
    sell: {
      count: (includesChosen && ownedStocks[chosen].numberOfStocks > 0)?1:0,
      focus: false,
      value: ((includesChosen && ownedStocks[chosen].numberOfStocks > 0)?1:0) * currentDataPoint.close
    }
  }

  const [localState, setlocalState] = useState(initalState);

  const buy = () => {
    // If there is enough money
    if (state.user.capitalAvailable - localState.buy.value > 0){
      // Increasing capitalAvailaibe
      dispatch({type: 'INCR_CAPITAL', payload: -1 * localState.buy.value});
      if (includesChosen){
        // There is an owned stock like the chosenn
        dispatch({type: 'INCR_OWNED_STOCKS', payload: {ticker: chosen, number: localState.buy.count}});
      } else {
          // Adding the new owned stock element
          dispatch({type: 'ADD_OWNED_STOCKS', payload: {ticker: chosen, number: localState.buy.count}});
        }
    } else {
      // No enough money
    }
  }

  const sell = () => {
    if (includesChosen){
      if (ownedStocks[chosen].numberOfStocks >= localState.sell.count){
        dispatch({type: 'INCR_OWNED_STOCKS', payload: {ticker: chosen, number: -1 * localState.sell.count}});
        dispatch({type: 'INCR_CAPITAL', payload: localState.sell.value});
      } else {
        // Wrong amount
      }
    } else {
        // No shares owned
      }
    }

  const changeInput = (event) => {
    const id = event.target.id;
    let inputVal = parseInt(event.target.value);

    // Invalid value
    if (!typeof inputVal === "number" || isNaN(inputVal) || inputVal === ""){
      if (localState[id].focus){
        inputVal = ""
      }
    }
  
    setlocalState((prevState) => {
      return {
        ...prevState,
        [id]: {
          ...prevState[id],
          count: inputVal
        }
      }
    })
  }

  const setFocus = (event, focusVal) => {
    const id = event.target.id;
    let count

    if (focusVal === false && (!typeof inputVal === "number" || isNaN(localState[id].count) || localState[id].count === "")){
      count = 0
    } else {
      count = localState[id].count
    }
    setlocalState((prevState) => {
      return {
        ...prevState,
        [id]: {
          ...prevState[id],
          focus: focusVal,
          count: count
        }
      }
    })
  }

  useEffect(() => {
    const calVal = (id) => localState[id].count * currentDataPoint.close
    const valBuy = calVal("buy")
    const valSell = calVal("sell")
    
    let countSell = localState.sell.count

    if (!includesChosen){
      countSell = 0
    } else {
      if (ownedStocks[chosen].numberOfStocks < countSell || countSell === 0) {
        countSell = ownedStocks[chosen].numberOfStocks
      }
    }

    setlocalState((prevState) => {
      return {
        ...prevState,
        buy: {
          ...prevState.buy,
          value: valBuy
        },
        sell: {
          ...prevState.sell,
          value: valSell,
          count: countSell
        }
      }
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localState.buy.count, localState.sell.count, state.user.ownedStocks])


  let stock = {numberOfStocks: 0}
  if (includesChosen) {
    stock = ownedStocks[chosen]
  }

  return (
    <div className="Trade">
      TRADE
      <div className="DashboardButtons">
        <div className="TradeButtons">
          <span>${formatMoney(localState.buy.value)}</span>
          <input type="text" id="buy" onChange={changeInput} onBlur={(e) => {setFocus(e, false)}} onFocus={(e) => {setFocus(e, true)}} value={(localState.buy.focus)?localState.buy.count:formatDoubleNumbers(localState.buy.count)} />
          <button onClick={buy} id="buy" className="BuyAndSell">BUY</button>
        </div>
        <div>
          <span>${formatMoney(localState.sell.value)}</span>
          <input type="text" id="sell" onChange={changeInput} onBlur={(e) => {setFocus(e, false)}} onFocus={(e) => {setFocus(e, true)}} value={(localState.sell.focus)?localState.sell.count:formatDoubleNumbers(localState.sell.count)} />
          <button onClick={sell} id="sell" className="BuyAndSell">SELL</button>
        </div>
      </div>
      <div className="DashboardInformation">
        <div>SHARES OWNED: {stock.numberOfStocks}</div>
        <div>VALUE: ${formatMoney(stock.numberOfStocks * currentDataPoint.close)}</div>
      </div>
    </div>
  )
}



export default Trade;
