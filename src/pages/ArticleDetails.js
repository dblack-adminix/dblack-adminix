import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`http://192.168.1.18:8000/api/articles/${id}`, {
        headers: {
          Authorization: "ApiKey 8e226f654ee88b22411124d7465bda63cc55511743ae7982e5f242a410545789",
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setArticle(data);
    } catch (error) {
      console.error("Ошибка при загрузке статьи:", error);
      setError("Не удалось загрузить статью. Попробуйте позже.");
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
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h1>
      <p className="text-sm text-gray-600 mb-4">Автор: {article.author}</p>
      <div
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: article.content }}
      ></div>
    </div>
  );
};

export default ArticleDetails;
