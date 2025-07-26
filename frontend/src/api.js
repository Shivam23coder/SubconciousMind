import axios from 'axios';

const API_BASE = 'https://subconciousmind.onrender.com/apex/items';

// export const getAll = (data) => axios.post(`${API_BASE}/`, data);
export const addItem = (data) => axios.post(`${API_BASE}/add`, data);
export const getAllItems = () => axios.get(`${API_BASE}/`);
export const searchItem = (query) => axios.post(`${API_BASE}/search`, { query });
// export const searchByKeyword = (keyword) => axios.get(`${API_BASE}/searchByKeyword`, { params: { keyword } });
// export const updateItem = (id, data) => axios.put(`${API_BASE}/update/${id}`, data);
// export const deleteItem = (id) => axios.delete(`${API_BASE}/${id}`);