import React from "react";

function StatsBar() {
  // Current date in IST
  const today = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    })
  );

  // Demo values (Later: MongoDB)
  const cycleLength = 28;
  const periodLength = 5;
  const currentDay = 3;

  const nextPeriod = new Date(today);
  nextPeriod.setDate(today.getDate() + (cycleLength - currentDay));

  const fertileStart = new Date(today);
  fertileStart.setDate(today.getDate() + 8);

  const fertileEnd = new Date(today);
  fertileEnd.setDate(today.getDate() + 14);

  const formatDate = (date) =>
    date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

  const stats = [
    {
      title: "🩸 Current Day",
      value: `Day ${currentDay}`,
      sub: "Current Cycle",
    },
    {
      title: "📅 Cycle Length",
      value: `${cycleLength} Days`,
      sub: "Average Cycle",
    },
    {
      title: "🌸 Period Length",
      value: `${periodLength} Days`,
      sub: "Average Period",
    },
    {
      title: "🌿 Fertile Window",
      value: `${formatDate(fertileStart)} - ${formatDate(fertileEnd)}`,
      sub: "Predicted",
    },
    {
      title: "🗓 Next Period",
      value: formatDate(nextPeriod),
      sub: "Estimated",
    },
  ];

  return (
    <div className="stats-bar">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.title}>
          <div className="stat-card-label">
            {stat.title}
          </div>

          <div className="stat-card-value">
            {stat.value}
          </div>

          <div className="stat-card-sub">
            {stat.sub}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsBar;