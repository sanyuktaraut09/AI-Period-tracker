import React, { useState, useEffect } from 'react';
/* eslint-disable react-hooks/exhaustive-deps */
const PHASES = [
  { name: 'Menstrual',  days: '1–5',   color: '#d4537e', width: '18%' },
  { name: 'Follicular', days: '6–13',  color: '#fac775', width: '29%' },
  { name: 'Ovulation',  days: '14',    color: '#1d9e75', width: '4%'  },
  { name: 'Luteal',     days: '15–28', color: '#afa9ec', width: '50%' },
];

function InsightPanel({ entries }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
  if (!entries || entries.length === 0) return;

  const latest = entries.find(e => e?.symptoms?.length > 0);

  if (!latest) return;

  const query = latest.symptoms.join(" ");

  fetchRecommendations(query);
}, [entries, fetchRecommendations]);

  // ✅ ADD THIS HERE 👇👇👇
  function generateTopics(query) {
    const q = query.toLowerCase();

    const base = [];

    if (q.includes("cramp")) {
      base.push("Period cramps relief", "How to reduce menstrual pain");
    }

    if (q.includes("bloat")) {
      base.push("Period bloating causes", "Hormonal bloating relief");
    }

    if (q.includes("fatigue")) {
      base.push("Period fatigue causes", "Energy during menstruation");
    }

    if (q.includes("heavy")) {
      base.push("Heavy flow reasons", "When heavy period is normal");
    }

    if (base.length === 0) {
      base.push("Menstrual health tips", "Period cycle guide");
    }

    return base;
  }

  async function fetchRecommendations(query) {
    setLoading(true);
    setError(null);

    try {
      // turn symptoms into smart topics
      const topics = generateTopics(query);

      const results = topics.map((topic) => ({
        title: topic,
        content: `Learn more about ${topic}`,
        url: `https://www.google.com/search?q=${encodeURIComponent(topic + " menstrual health")}`
      }));

      setArticles(results);

    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  
  return (
    <aside className="insight-panel">

      <div className="section-title">AI Insights</div>

      {/* ARTICLES SECTION */}
      <div>
        <div className="panel-section-label">Recommended for you</div>

        {loading && <div style={{ fontSize: 12 }}>Finding articles...</div>}

        {error && (
          <div style={{ fontSize: 12, color: 'red' }}>{error}</div>
        )}

        {!loading && !error && articles.length === 0 && (
          <div style={{ fontSize: 12 }}>
            Log symptoms to get personalised recommendations.
          </div>
        )}

        {articles.map((article, i) => (
  <a
    key={i}
    href={article.url || "https://www.google.com"}
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: "none", color: "inherit" }}
  >
    <div className="insight-card" style={{ marginBottom: 8 }}>
      <div style={{ fontWeight: 600, fontSize: 12 }}>
        {article.title}
      </div>

      <p style={{ fontSize: 11, color: "#666" }}>
        {article.content}
      </p>

      <div style={{ fontSize: 10, color: "#999" }}>
        Click to read →
      </div>
    </div>
  </a>
))}
      </div>

      {/* UPCOMING */}
      <div className="insight-card">
        <div className="insight-meta">
          <span>📅</span>
          <span className="insight-meta-label">Upcoming</span>
        </div>

        <div style={{ fontSize: 12 }}>Fertile window in</div>
        <div style={{ fontSize: 20, color: '#1d9e75' }}>10 days</div>
        <div style={{ fontSize: 11 }}>May 5 – May 10</div>
      </div>

      {/* PHASES */}
      <div>
        <div className="panel-section-label">Cycle phases</div>

        {PHASES.map((p) => (
          <div key={p.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{p.name}</span>
              <span>{p.days}</span>
            </div>
            <div style={{ background: '#eee', height: 6 }}>
              <div style={{ width: p.width, background: p.color, height: 6 }} />
            </div>
          </div>
        ))}
      </div>

      {/* RECENT ENTRIES */}
      <div>
        <div className="panel-section-label">Recent entries</div>

        {entries.length === 0 && (
          <div style={{ fontSize: 12 }}>No entries yet.</div>
        )}

        {entries.slice(0, 5).map((entry, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{formatDate(entry.date)}</span>
            <span>{entry.symptoms.join(', ')}</span>
          </div>
        ))}
      </div>

      <button className="btn-summary">AI health summary →</button>
    </aside>
  );
}

export default InsightPanel;