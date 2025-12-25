import axios from "axios";

const API = process.env.LARAVEL_API;

export async function fetchLatestArticle() {
  const res = await axios.get(`${API}/articles`);
  return res.data[res.data.length - 1]; // oldest → newest
}

export async function publishUpdatedArticle(data) {
  return axios.post(`${API}/articles`, data);
}
