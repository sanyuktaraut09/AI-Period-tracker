import React from 'react';

function RecommendationCard({ title, items = [] }) {
  return (
    <div className="recommendation-card card">
      <div className="card-header">{title}</div>
      <div className="card-body">
        {items.length === 0 ? (
          <div className="muted">No recommendations</div>
        ) : (
          <ul className="recommendation-list">
            {items.map((it, i) => (
              <li key={i} className="recommendation-item">{it}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default React.memo(RecommendationCard);
