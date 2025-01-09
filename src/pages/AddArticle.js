import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const AddArticle = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState(""); // TinyMCE Content State

  const handleEditorChange = (content) => {
    setContent(content); // Update content state when editor changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !author) {
      alert("Заполните все поля!");
      return;
    }

    const articleData = {
      title,
      content,
      author,
    };

    try {
      const response = await fetch("http://192.168.1.18:8000/api/articles/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "ApiKey 8e226f654ee88b22411124d7465bda63cc55511743ae7982e5f242a410545789",
        },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }

      alert("Статья добавлена!");
      navigate("/admin");
    } catch (error) {
      console.error("Ошибка добавления статьи:", error);
      alert("Ошибка добавления статьи.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Добавить новую статью</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-2">Название</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Введите название статьи"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Содержимое</label>
<Editor
  apiKey="s26el3n02oxvd8oy28lb19aiuoel130ctc4fixptjwudvvkm"
  value={content}
  init={{
    height: 500,
    menubar: true,
    plugins: [
      "advlist autolink link image lists charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "table advlist autolink lists link image charmap print preview anchor",
      "insertdatetime media table paste emoticons",
    ],
    toolbar:
      "table |undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | " +
      "bullist numlist outdent indent | link image | print preview media fullpage | " + 
      "forecolor backcolor emoticons",
  }}
  onEditorChange={handleEditorChange}
/>
        </div>

        <div>
          <label className="block font-semibold mb-2">Автор</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Введите имя автора"
          />
        </div>

        <button
          type="submit"
          className="bg-green-200 text-green-700 py-2 px-4 rounded hover:bg-green-300"
        >
          Добавить статью
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
