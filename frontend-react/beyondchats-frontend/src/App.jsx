import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Articles from "./pages/Articles";
import ArticleView from "./pages/ArticleView";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleView />} />
      </Routes>
    </BrowserRouter>
  );
}
