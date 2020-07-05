import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "Store/Store";
import { DataContext } from "Store/Data";
import playForward from "../../images/faster.svg";
import play from "../../images/play.svg";
import {
  YearFromDate,
  MonthFromDate,
  DayFromDate,
  formatDoubleNumbers,
} from "../Global_Components/calculations";

function Calendar() {
  const [state, dispatch] = useContext(StoreContext);
  const [data] = useContext(DataContext);

  const currentDate = state.animation.currentDate;
  const daysOfMonths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const [CalendarDate, setCalendarDate] = useState(currentDate);

  const days = [];
  let day = 1;
  let week = [];

  const setDate = (actDate) => {
    if (data.dates.includes(actDate)) {
      dispatch({ type: "SET_CURRENT_DATE", payload: actDate });
    }
  };

  for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 7; j++) {
      if (day <= daysOfMonths[parseInt(MonthFromDate(CalendarDate)) - 1]) {
        const actDate =
          YearFromDate(CalendarDate) +
          "-" +
          MonthFromDate(CalendarDate) +
          "-" +
          formatDoubleNumbers(day);
        const isActive = data.dates.includes(actDate);
        const className = `Calendar-body-day ${
          isActive ? "Calendar-body-day-active" : ""
        }`;
        week.push(
          <button
            className={className}
            key={"CBD" + j}
            onClick={() => setDate(actDate)}
          >
            {day}
          </button>
        );
        day++;
      }
    }
    days.push(
      <div className="Calendar-body-week" key={"CBW" + i}>
        {week}
      </div>
    );
    week = [];
  }

  useEffect(() => {
    setCalendarDate(state.animation.currentDate);
  }, [state.animation.currentDate]);

  const changeYear = (dir) => {
    dispatch({ type: "SET_PAUSED", payload: true });
    const newDate =
      (parseInt(YearFromDate(CalendarDate)) + dir).toString() +
      "-" +
      MonthFromDate(CalendarDate) +
      "-" +
      DayFromDate(CalendarDate);
    setCalendarDate(newDate);
  };

  const changeMonth = (dir) => {
    dispatch({ type: "SET_PAUSED", payload: true });

    let newYear = YearFromDate(CalendarDate);
    let newMonth = formatDoubleNumbers(
      parseInt(MonthFromDate(CalendarDate)) + dir
    );
    if (parseInt(MonthFromDate(CalendarDate)) === 12 && dir === 1) {
      newYear = parseInt(YearFromDate(CalendarDate)) + 1;
      newMonth = formatDoubleNumbers(1);
    }
    if (parseInt(MonthFromDate(CalendarDate)) === 1 && dir === -1) {
      newYear = parseInt(YearFromDate(CalendarDate)) - 1;
      newMonth = 12;
    }
    const newDate = newYear + "-" + newMonth + "-" + DayFromDate(CalendarDate);
    setCalendarDate(newDate);
  };

  return (
    <div className="Calendar">
      <div className="Calendar-container">
        <div className="Calendar-header">
          <div className="Calendar-header-buttons">
            <button>
              <img
                src={playForward}
                alt="last year"
                onClick={() => changeYear(-1)}
              />
            </button>
            <button>
              <img
                src={play}
                alt="last month"
                onClick={() => changeMonth(-1)}
              />
            </button>
          </div>
          <span>
            {YearFromDate(CalendarDate) + " " + MonthFromDate(CalendarDate)}
          </span>
          <div className="Calendar-header-buttons">
            <button>
              <img src={play} alt="next month" onClick={() => changeMonth(1)} />
            </button>
            <button>
              <img
                src={playForward}
                alt="next year"
                onClick={() => changeYear(1)}
              />
            </button>
          </div>
        </div>
        <div className="Calendar-body">{days}</div>
      </div>
    </div>
  );
}

export default Calendar;
