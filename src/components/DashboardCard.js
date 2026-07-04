import React from 'react';
import AnalysisCard from './AnalysisCard';
import RecommendationCard from './RecommendationCard';
import ArticleCard from './ArticleCard';

function DashboardCard({ detectedSymptoms = [], foods = [], remedies = [], articles = [], loading = false, error = null }) {
  const detected = detectedSymptoms || [];

  return (
    <div className="dashboard-card">
      <div className="dashboard-grid">
        <AnalysisCard detectedSymptoms={detected} loading={loading} error={error} />
        <div className="col">
          <RecommendationCard title="Recommended Foods" items={foods} />
          <RecommendationCard title="Recommended Remedies" items={remedies} />
        </div>
        <ArticleCard articles={articles} />
      </div>
    </div>
  );
}

export default React.memo(DashboardCard);
