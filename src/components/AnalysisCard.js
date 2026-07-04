import React from 'react';

function AnalysisCard({ detectedSymptoms = [], loading = false, error = null }) {
  return (
    <div className="analysis-card card">
      <div className="card-header">AI Analysis</div>
      <div className="card-body">
        {loading && <div className="loader">Analyzing…</div>}
        {error && <div className="error">{error}</div>}
        {!loading && !error && (
          <div>
            {detectedSymptoms.length === 0 ? (
              <div className="muted">Enter a note and click Analyze with AI to see symptom detection.</div>
            ) : (
              <ul className="symptom-list">
                {detectedSymptoms.map((s) => (
                  <li key={s.id} className="symptom-item">
                    <strong>{s.name}</strong>
                    <span className="score">{s.score.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(AnalysisCard);
