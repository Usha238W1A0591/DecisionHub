import axios from 'axios';

// Normalize the base URL so it always ends with "/api".
// All backend controllers are mounted under /api/*, and the env var
// (from Vercel or .env.production) may or may not include the suffix.
const rawApiUrl = (process.env.REACT_APP_API_URL || 'https://faithful-prosperity-production.up.railway.app/api').replace(/\/+$/, '');
const baseURL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;

const API = axios.create({ baseURL });

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
};

export const pollAPI = {
  getAll: () => API.get('/polls'),
  getMy: () => API.get('/polls/my'),
  getOne: (id) => API.get(`/polls/${id}`),
  create: (data) => API.post('/polls', data),
  vote: (id, data) => API.post(`/polls/${id}/vote`, data),
  delete: (id) => API.delete(`/polls/${id}`),
};

export const userAPI = {
  getProfile: () => API.get('/users/profile'),
  updateProfile: (data) => API.put('/users/profile', data),
  getAll: () => API.get('/users/all'),
};

export const teamAPI = {
  getAll: () => API.get('/teams'),
  getMy: () => API.get('/teams/my'),
  create: (data) => API.post('/teams', data),
  join: (id) => API.post(`/teams/${id}/join`),
  delete: (id) => API.delete(`/teams/${id}`),
};

export const communityAPI = {
  getAll: () => API.get('/communities'),
  create: (data) => API.post('/communities', data),
  join: (id) => API.post(`/communities/${id}/join`),
};

export const notificationAPI = {
  getAll: () => API.get('/notifications'),
  markRead: (id) => API.put(`/notifications/${id}/read`),
};

export const feedbackAPI = {
  submit: (data) => API.post('/feedback', data),
  getAll: () => API.get('/feedback'),
};

export const comparisonAPI = {
  getAll: () => API.get('/comparisons'),
  create: (data) => API.post('/comparisons', data),
  delete: (id) => API.delete(`/comparisons/${id}`),
};

export const analyticsAPI = {
  getDashboard: () => API.get('/analytics/dashboard'),
};
