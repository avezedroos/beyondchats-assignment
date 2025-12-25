import React from "react";
import { useNavigate } from "react-router-dom";

export default function ArticleCard({ article }) {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/article/${article.id}`);
  };

  return (
    <div className="mb-4">
      <div className="card article-card h-100" onClick={handleReadMore}>
        {/* Image Section */}
        <div className="article-image-wrapper">
          <img
            src={article.image || "/placeholder-blog.jpg"}
            alt={article.title}
            className="article-image"
          />
          {article.is_updated && (
            <span className="badge bg-warning text-dark article-badge">
              Updated
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="card-body d-flex flex-column">
  <h5 className="card-title article-title">{article.title}</h5>
  <p className="card-text article-card-text text-muted small mb-3">
    {article.is_updated ? "Updated Article" : "Original Article"}
  </p>

  <div className="mt-auto">
    <button
      className="btn btn-outline-primary btn-sm w-100 read-more-btn"
      onClick={(e) => {
        e.stopPropagation();
        handleReadMore();
      }}
    >
      Read More →
    </button>
  </div>
</div>

      </div>
    </div>
  );
}
