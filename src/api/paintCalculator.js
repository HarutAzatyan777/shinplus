import axios from 'axios';

const token = localStorage.getItem('token'); // կամ որտեղ պահում ես token-ը

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://shinplusserv-production.up.railway.app/api/paintCalculator'
    : 'http://localhost:5000/api/paintCalculator';

const paintCalculatorApi = axios.create({
  baseURL,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

export default paintCalculatorApi;
