import React from 'react';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function CycleCalendar() {
  // Current IST date
  const today = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const year = today.getFullYear();
  const month = today.getMonth();

  const monthName = today.toLocaleString("en-US", {
    month: "long",
    timeZone: "Asia/Kolkata",
  });

  const currentDate = today.getDate();

  // First day of month
  const firstDay = new Date(year, month, 1).getDay();

  // Number of days in month
  const totalDays = new Date(year, month + 1, 0).getDate();

  return (
    <div className="calendar-card">

      <div className="calendar-header">
        <span className="section-title">
          {monthName} {year}
        </span>

        <div className="legend">
          <span className="pill pill-pink">Menstrual</span>
          <span className="pill pill-teal">Fertile</span>
          <span className="pill pill-green">Today</span>
        </div>
      </div>

      <div className="cal-grid">

        {WEEKDAYS.map((d) => (
          <div key={d} className="cal-weekday">
            {d}
          </div>
        ))}

        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="cal-day empty" />
        ))}

        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1;

          const isToday = day === currentDate;

          return (
            <div
              key={day}
              className={`cal-day ${isToday ? "today" : ""}`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CycleCalendar;