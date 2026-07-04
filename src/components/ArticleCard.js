import React from 'react';

function ArticleCard({ articles = [] }) {
  return (
    <div className="article-card card">
      <div className="card-header">Related Articles</div>

      <div className="card-body">
        {articles.length === 0 ? (
          <div className="muted">No related articles</div>
        ) : (
          <ul className="article-list">
            {articles.map((a, i) => (
              <li key={i} className="article-item">
  <a
    href={a.url}
    target="_blank"
    rel="noopener noreferrer"
    className="article-link"
  >
    <div className="article-title">{a.title}</div>
    <div className="article-excerpt">{a.content}</div>
    <div style={{ fontSize: "12px", color: "gray" }}>
      Tap to read →
    </div>
  </a>
</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default React.memo(ArticleCard);