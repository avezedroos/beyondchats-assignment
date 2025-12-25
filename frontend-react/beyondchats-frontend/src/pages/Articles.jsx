import React, { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { fetchArticles } from "../services/articleApi";
// import "./Articles.css";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  console.log("articles", articles);

  useEffect(() => {
    fetchArticles()
      .then((res) => setArticles(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-5 text-center section-title">Latest Articles</h2>

      {articles.length === 0 ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {articles.map((article) => (
            <div key={article.id} className="col-sm-6 col-md-4 col-lg-3">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
