import React from "react";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: "🏠",
  },
  {
    label: "Cycle Log",
    icon: "📅",
  },
  {
    label: "Insights",
    icon: "💡",
  },
];

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <span style={{ fontSize: 22 }}>🌸</span>
        <span className="sidebar-logo-text">
          Period Care AI
        </span>
      </div>

      {/* Navigation */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 24,
          gap: 8,
        }}
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`nav-item ${
              activePage === item.label ? "active" : ""
            }`}
            onClick={() => setActivePage(item.label)}
          >
            <span
              style={{
                marginRight: 10,
                fontSize: 16,
              }}
            >
              {item.icon}
            </span>

            {item.label}
          </button>
        ))}
      </div>

      {/* Bottom Widget */}

      <div className="phase-widget">

        <div className="phase-label">
          Current Cycle
        </div>

        <div className="phase-name">
          <div className="phase-dot" />
          Menstrual Phase
        </div>

        <div className="phase-progress-row">
          <span>Day 3</span>
          <span>28 Days</span>
        </div>

        <div className="phase-track">
          <div
            className="phase-fill"
            style={{
              width: "11%",
            }}
          />
        </div>

        <div
          style={{
            marginTop: 18,
            fontSize: 12,
            color: "#777",
            lineHeight: 1.8,
          }}
        >
          💧 Stay hydrated
          <br />
          🌸 Self-care matters
          <br />
          😴 Get enough rest
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;