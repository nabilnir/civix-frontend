import axios from 'axios';

/**
 * API Configuration
 * Centralized configuration for API endpoints and axios instances
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Public axios instance (no authentication)
export const axiosPublic = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor for public requests
axiosPublic.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for public requests
axiosPublic.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    JWT: '/api/auth/jwt',
    USERS: '/api/auth/users',
    USER_BY_EMAIL: (email) => `/api/auth/users/${email}`,
  },
  ISSUES: {
    BASE: '/api/issues',
    BY_ID: (id) => `/api/issues/${id}`,
    BY_USER: (email) => `/api/issues/user/${email}`,
    UPVOTE: (id) => `/api/issues/upvote/${id}`,
    STATUS: (id) => `/api/issues/${id}/status`,
    ASSIGN: (id) => `/api/issues/${id}/assign`,
    BOOST: (id) => `/api/issues/${id}/boost`,
  },
  STAFF: {
    BASE: '/api/staff',
    BY_EMAIL: (email) => `/api/staff/${email}`,
    STATS: (email) => `/api/staff/${email}/stats`,
    ASSIGNED_ISSUES: (email) => `/api/staff/${email}/assigned-issues`,
    TODAY_TASKS: (email) => `/api/staff/today-tasks/${email}`,
  },
  PAYMENTS: {
    BASE: '/api/payments',
    BY_ID: (id) => `/api/payments/${id}`,
  },
  USERS: {
    BASE: '/api/users',
    BLOCK: (email) => `/api/users/${email}/block`,
    PREMIUM: (email) => `/api/users/${email}/premium`,
    STATS: (email) => `/api/users/${email}/stats`,
  },
  ADMIN: {
    STATS: '/api/admin/stats',
  },
};

// Helper function to build full URL
export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Check if API is available
export const checkApiHealth = async () => {
  try {
    const response = await axiosPublic.get('/api/health');
    return response.status === 200;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

export default {
  API_BASE_URL,
  axiosPublic,
  API_ENDPOINTS,
  getApiUrl,
  checkApiHealth,
};

