import React, { useContext, useState, useEffect, useRef } from "react";
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
  const [dragged, setDragged] = useState(false);
  const [pos, setPos] = useState(["10%", "10%"]);

  const CalRef = useRef(null);

  const zoomRatio = Math.round(
    Math.round(data.dates.length / 12) / state.animation.zoom
  );
  const shownDates = data.dates.slice(
    data.dates.indexOf(state.animation.shownFrom),
    data.dates.indexOf(currentDate) + 1
  );
  const days = [];
  let day = 1;
  let week = [];

  const setDate = (actDate) => {
    if (data.dates.includes(actDate)) {
      if (shownDates.length > 12 * zoomRatio) {
        const nextIndex = data.dates.indexOf(actDate);
        let shownFromDate = data.dates[nextIndex - 12 * zoomRatio];
        if (shownFromDate === undefined) {
          shownFromDate = data.dates[0];
        }
        dispatch({
          type: "GRAPH_MOVE",
          payload: {
            currentDate: actDate,
            shownFromData: shownFromDate,
          },
        });
      } else {
        dispatch({ type: "SET_CURRENT_DATE", payload: actDate });
      }
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
  }, [state.animation.currentDate, data.dates]);

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

  const Drag = () => {
    setDragged(!dragged);
  };

  const Drop = () => {
    setDragged(false);
  };

  const Move = (e) => {
    e.preventDefault();
    if (dragged) {
      const offsetX = CalRef.current.offsetWidth / 2;
      setPos([e.clientX - offsetX, e.clientY]);
    }
  };

  return (
    <div>
      <div
        className="Calendar-layout"
        onMouseMove={(e) => Move(e)}
        onMouseUp={() => Drop()}
        style={{
          display: dragged ? "block" : "none",
          cursor: dragged ? "grabbing" : "grab",
        }}
      ></div>
      <div
        className="Calendar"
        style={{ position: "fixed", left: pos[0], top: pos[1] }}
        onMouseMove={(e) => Move(e)}
        ref={CalRef}
      >
        <div className="Calendar-container">
          <span
            className="DragAndDrop"
            onMouseDown={() => Drag()}
            onMouseUp={() => Drop()}
            style={{ cursor: dragged ? "grabbing" : "grab" }}
          >
            ...
          </span>
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
                <img
                  src={play}
                  alt="next month"
                  onClick={() => changeMonth(1)}
                />
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
    </div>
  );
}

export default Calendar;
