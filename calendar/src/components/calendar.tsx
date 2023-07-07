import React, { useState } from "react";
import "./calendar.css";

const Calendar: React.FC = () => {
  const [date, setDate] = useState(new Date());

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const calendarRows: JSX.Element[] = [];

  const today = new Date();
  let day = 1;

  for (let i = 0; i < Math.ceil((daysInMonth + firstDay) / 7); i++) {
    const row: JSX.Element[] = [];
    for (let j = 0; j < 7; j++) {
      if (i == 0 && j < firstDay) {
        row.push(
          <div key={`empty-${j}`} className="empty-day">
            {""}
          </div>
        );
      } else if (day > daysInMonth) {
        row.push(
          <div key={`empty-${day}`} className="empty-day">
            {""}
          </div>
        );
      } else {
        const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
        row.push(
          <div
            key={day}
            className={`day ${
              currentDate.toDateString() === today.toDateString() ? "today" : ""
            }`}
          >
            {day}
          </div>
        );
        day++;
      }
    }
    calendarRows.push(
      <div key={i} className="week">
        {row}
      </div>
    );
  }

  const prevMonth = date.getMonth() - 1 >= 0 ? date.getMonth() - 1 : 11;
  const nextMonth = date.getMonth() + 1 <= 11 ? date.getMonth() + 1 : 0;

  const prevMonthName = monthNames[prevMonth];
  const nextMonthName = monthNames[nextMonth];

  const handleNextMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() + 1)));
  };

  const handlePrevMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() - 1)));
  };

  return (
    <div className="calendar">
      <h2>{`${monthNames[date.getMonth()]} ${date.getFullYear()}`}</h2>
      <div className="month-selector">
        <button onClick={handlePrevMonth}>{prevMonthName}</button>
        <span>{`${monthNames[date.getMonth()]} ${date.getFullYear()}`}</span>
        <button onClick={handleNextMonth}>{nextMonthName}</button>
      </div>

      <div className="weekdays">
        {days.map((day, index) => (
          <div key={index} className="weekday">
            {day}
          </div>
        ))}
      </div>
      {calendarRows}
    </div>
  );
};

export default Calendar;
