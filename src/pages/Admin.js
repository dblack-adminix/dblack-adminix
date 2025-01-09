import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const Admin = () => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const navigate = useNavigate();

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
      setError("Не удалось загрузить список статей.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setConfirmDelete(id);
  };

  const confirmDeleteArticle = async () => {
    if (!confirmDelete) return;
    try {
      const response = await fetch(`http://192.168.1.18:8000/api/articles/${confirmDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: "ApiKey 8e226f654ee88b22411124d7465bda63cc55511743ae7982e5f242a410545789",
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }

      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== confirmDelete)
      );
      setConfirmDelete(null);
    } catch (error) {
      console.error("Error deleting article:", error);
      setError("Не удалось удалить статью.");
    }
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="text-center mt-10">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-800 dark:text-white transition-colors">
      {/* Меню */}
      <div className="mb-6">
        <nav className="bg-gray-100 dark:bg-gray-900 p-4 rounded shadow flex justify-between items-center">
          <ul className="flex space-x-4">
            <li>
              <button
                onClick={() => navigate("/admin")}
                className="text-green-700 dark:text-green-300 hover:underline"
              >
                Управление статьями
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/admin/add")}
                className="text-green-700 dark:text-green-300 hover:underline"
              >
                Добавить статью
              </button>
            </li>
          </ul>
          <ThemeToggle />
        </nav>
      </div>

      {/* Заголовок */}
      <h1 className="text-2xl font-bold mb-4">Админка: Управление статьями</h1>

      {/* Поле для поиска */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
          placeholder="Поиск по названию статьи..."
        />
      </div>

      {/* Таблица статей */}
      <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="border border-gray-300 dark:border-gray-600 p-2">ID</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2">Название</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2">Автор</th>
            <th className="border border-gray-300 dark:border-gray-600 p-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredArticles.map((article) => (
            <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                {article.id}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 p-2">
                {article.title}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 p-2">
                {article.author}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                <button
                  onClick={() => handleDeleteClick(article.id)}
                  className="bg-green-200 dark:bg-green-600 text-green-700 dark:text-white py-1 px-3 rounded hover:bg-green-300 dark:hover:bg-green-700 mr-2"
                >
                  Удалить
                </button>
                <button
                  onClick={() => handleEdit(article.id)}
                  className="bg-green-200 dark:bg-green-600 text-green-700 dark:text-white py-1 px-3 rounded hover:bg-green-300 dark:hover:bg-green-700"
                >
                  Редактировать
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Диалог подтверждения удаления */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md text-center">
            <p className="text-lg mb-4">Вы уверены, что хотите удалить статью?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDeleteArticle}
                className="bg-green-200 dark:bg-green-600 text-green-700 dark:text-white px-4 py-2 rounded hover:bg-green-300 dark:hover:bg-green-700"
              >
                Удалить
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
