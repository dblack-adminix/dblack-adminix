import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "../index.css"; // Убедитесь, что файл подключён

const TestEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Это тестовый редактор TipTap</p>", // Начальное содержимое
  });

  // Проверяем редактор
  useEffect(() => {
    if (editor) {
      console.log("Редактор инициализирован:", editor);
      console.log("Элемент редактора в DOM:", document.querySelector(".tiptap-editor"));
    }
  }, [editor]);

  if (!editor) {
    return <p>Загрузка редактора...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Проверка редактора TipTap</h1>
      <div
        className="tiptap-editor"
        style={{
          minHeight: "200px",
          padding: "12px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          backgroundColor: "#ffffff",
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.6",
        }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TestEditor;
