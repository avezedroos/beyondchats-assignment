import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleArticle } from "../services/articleApi";
// import { fetchSingleArticle } from "../s";

export default function ArticleView() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchSingleArticle(id)
      .then((res) => setArticle(res.data))
      .catch(console.error);
  }, [id]);

  if (!article) return <p className="text-center">Loading...</p>;

  return (
    <div className="container">
      <h2 className="mb-3">{article.title}</h2>

      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {article.references && (
        <div className="mt-4">
          <h5>References</h5>
          <ul>
            {article.references.map((ref, i) => (
              <li key={i}>
                <a href={ref} target="_blank" rel="noreferrer">
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
