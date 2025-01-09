import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch("http://192.168.1.18:8000/api/articles/", {
        headers: {
          Authorization: "ApiKey 8e226f654ee88b22411124d7465bda63cc55511743ae7982e5f242a410545789",
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError("Не удалось загрузить статьи. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Список статей</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">{article.title}</h2>
            <p className="text-sm text-gray-600 mb-4">Автор: {article.author}</p>
            <div
              className="text-gray-700 mb-4"
              dangerouslySetInnerHTML={{ __html: article.content.substring(0, 100) + "..." }}
            ></div>
            <Link
              to={`/articles/${article.id}`}
              className="inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
            >
              Подробнее
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
