import React, { useState } from "react";
import "./App.css";

import Sidebar from "./components/SideBar";
import StatsBar from "./components/StatsBar";
import CycleCalendar from "./components/CycleCalendar";
import SymptomLogger from "./components/SymptomLogger";
import InsightPanel from "./components/InsightPanel";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [entries, setEntries] = useState([
    { date: "2026-04-22", symptoms: ["Bloating"] },
    { date: "2026-04-23", symptoms: ["Heavy flow"] },
    { date: "2026-04-24", symptoms: ["Cramps", "Fatigue"] },
  ]);

  const handleSaveEntry = (newEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
  };

  // IST Date & Greeting
  const today = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    })
  );

  const hour = today.getHours();

  let greeting = "Good Evening";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-content">
        <div className="top-bar">
          <div>
            <h1 className="greeting">{greeting} 🌸</h1>
            <p className="subtext">{formattedDate}</p>
          </div>
        </div>

        {activePage === "Dashboard" && (
          <>
            <StatsBar />
            <SymptomLogger onSave={handleSaveEntry} />
          </>
        )}

        {activePage === "Cycle Log" && (
          <>
            <CycleCalendar />
            <SymptomLogger onSave={handleSaveEntry} />
          </>
        )}

        {activePage === "Insights" && (
          <InsightPanel entries={entries} />
        )}
      </main>

      
    </div>
  );
}

export default App;