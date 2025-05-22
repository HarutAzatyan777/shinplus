import axios from 'axios';

// Base URL-ը ընտրում ենք ըստ NODE_ENV-ի կամ կարող ես ձեռքով փոխել
const API_BASE =
  process.env.NODE_ENV === 'production'
    ? 'https://shinplusserv-production.up.railway.app/auth'
    : 'http://localhost:5000/auth';

// Admin մասի համար նույնպես
const ADMIN_BASE =
  process.env.NODE_ENV === 'production'
    ? 'https://shinplusserv-production.up.railway.app/auth/admin'
    : 'http://localhost:5000/auth/admin';

// Գրանցում
export const registerUser = async (email, password) => {
  return axios.post(`${API_BASE}/register`, { email, password });
};

// Լոգին
export const loginUser = async (email, password) => {
  return axios.post(`${API_BASE}/login`, { email, password });
};

// Օգտագործողներին ստանալը
export const fetchUsersAPI = async () => {
  const token = localStorage.getItem('token');
  return axios.get(`${ADMIN_BASE}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Օգտագործողի ջնջում
export const deleteUserAPI = async (uid) => {
  const token = localStorage.getItem('token');
  return axios.delete(`${ADMIN_BASE}/user/${uid}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Օգտագործողի դերի թարմացում
export const updateUserRoleAPI = async (uid, role) => {
  const token = localStorage.getItem('token');
  return axios.put(
    `${ADMIN_BASE}/user/${uid}`,
    { role },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
