import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export const fetchArticles = () =>
  axios.get(`${API_BASE}/articles`);

export const fetchSingleArticle = (id) =>
  axios.get(`${API_BASE}/articles/${id}`);
