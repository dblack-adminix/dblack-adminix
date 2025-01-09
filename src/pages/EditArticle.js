import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "", author: "" });
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
      setFormData(data);
    } catch (error) {
      console.error("Error fetching article:", error);
      setError("Не удалось загрузить статью.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://192.168.1.18:8000/api/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "ApiKey 8e226f654ee88b22411124d7465bda63cc55511743ae7982e5f242a410545789",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }

      navigate("/admin"); // Возвращаемся к списку статей
    } catch (error) {
      console.error("Error updating article:", error);
      setError("Не удалось обновить статью.");
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
      <h1 className="text-2xl font-bold mb-4">Редактирование статьи</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-2">Название статьи</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Содержимое</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="5"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Автор</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
