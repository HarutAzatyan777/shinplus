import axios from 'axios';

const API_BASE = 'https://shinplusserv-production.up.railway.app/auth';

export const registerUser = async (email, password) => {
  return axios.post(`${API_BASE}/register`, { email, password });
};

export const loginUser = async (email, password) => {
  return axios.post(`${API_BASE}/login`, { email, password });
};
