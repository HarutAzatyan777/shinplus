import axios from 'axios';

// Base URL-ը ընտրում ենք ըստ NODE_ENV-ի կամ կարող ես ձեռքով փոխել
const API_BASE =
  process.env.NODE_ENV === 'production'
    ? 'https://shinplusserv-production.up.railway.app/api/auth'
    : 'http://localhost:5000/api/auth';

// Admin մասի համար նույնպես
const ADMIN_BASE =
  process.env.NODE_ENV === 'production'
    ? 'https://shinplusserv-production.up.railway.app/api/auth/admin'
    : 'http://localhost:5000/auth/api/admin';

// Գրանցում (✅ ընդունում է օբյեկտ՝ email, password, name, username, image)
export const registerUser = async (userData) => {
  return axios.post(`${API_BASE}/register`, userData);
};

export const resendVerificationEmail = async (email) => {
  return axios.post(`${API_BASE}/resend-verification`, { email });
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
    withCredentials: true,
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
