import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Если есть глобальные стили
import Chart from 'chart.js/auto';

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Target container is not a DOM element");
}
