import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import ArticleDetails from "./pages/ArticleDetails";
import Admin from "./pages/Admin";
import EditArticle from "./pages/EditArticle"; // Импорт компонента редактирования
import AddArticle from "./pages/AddArticle"; // Импортируем новый компонент


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:id" element={<ArticleDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/edit/:id" element={<EditArticle />} /> {/* Новый маршрут */}
        <Route path="/admin/add" element={<AddArticle />} /> {/* Новый маршрут */}
      </Routes>
    </Router>
  );
};

export default App;
