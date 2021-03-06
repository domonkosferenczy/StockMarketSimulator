import React, { useContext, useState, useEffect } from "react";
import Arrow from "../Global_Components/Arrow";
import calendarImg from "../../images/calendar.svg";
import { StoreContext } from "Store/Store";
import {
  formatDate,
  formatMoney,
} from "components/Global_Components/calculations";
import { DataContext } from "Store/Data";
import Calendar from "../Global_Components/Calendar";

function SidebarHeader() {
  const [state] = useContext(StoreContext);
  const [data] = useContext(DataContext);

  // Local State for calculating the Arrow in the component
  const [stateValueOfStocks, setStateValueOfStocks] = useState(0);
  const [change, setChange] = useState("line");

  // Local State for calendar
  const [calendar, setCalendar] = useState(false);

  // Constants for data
  const ownedStocks = state.user.ownedStocks;
  const currentDate = state.animation.currentDate;

  // Calculating the present value of the Stocks
  const valueOfStocks = Object.keys(ownedStocks).reduce(
    (accumulator, stock) => {
      const number = ownedStocks[stock].numberOfStocks;
      const stockValue = data.stocks[stock].datapoints[currentDate].close;
      return accumulator + number * stockValue;
    },
    0
  );

  // Chaning the direction of the Arrow
  useEffect(() => {
    // Setting the value of the previous
    if (valueOfStocks !== stateValueOfStocks) {
      setStateValueOfStocks(valueOfStocks);
    }
    // UP or DOWN (inital: line)
    if (valueOfStocks > stateValueOfStocks) {
      setChange("up");
    } else {
      if (valueOfStocks !== stateValueOfStocks) {
        setChange("down");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate, ownedStocks]);

  const switchCalendar = () => {
    setCalendar(!calendar);
  };

  return (
    <div className="SidebarHeader">
      <div className="SidebarHeader-row">
        <div className="SidebarHeader-row-date">
          <div>
            <div className="SidebarHeader-title">DATE</div>
            <div className="SidebarHeader-value">{formatDate(currentDate)}</div>
          </div>
          <div className="SidebarHeader-calendar">
            <button className="Dashboard-button" onClick={switchCalendar}>
              <img src={calendarImg} alt="calendar" />
            </button>
            {calendar ? <Calendar /> : ""}
          </div>
        </div>
      </div>
      <div className="SidebarHeader-row">
        <div>
          <div className="SidebarHeader-title">CAPITAL AVAILABLE</div>
          <div className="SidebarHeader-value">
            ${formatMoney(state.user.capitalAvailable)}
          </div>
        </div>
      </div>
      <div className="SidebarHeader-row">
        <div>
          <div className="SidebarHeader-title">VALUE OF STOCKS</div>
          <div className="SidebarHeader-value">
            ${formatMoney(stateValueOfStocks)}
          </div>
        </div>
        <Arrow dir={change} />
      </div>
    </div>
  );
}

export default SidebarHeader;
