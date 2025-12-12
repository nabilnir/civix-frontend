import axios from 'axios';

/**
 * Public axios instance for unauthenticated requests
 * Does not include authentication token
 */
// Get API URL from environment variable or fallback to Vercel backend
const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Fallback to Vercel backend if env var is not set
  return 'https://civix-backend-livid.vercel.app';
};

const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: getApiUrl(),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  axiosPublic.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosPublic.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized - redirect to login if needed
        console.error('Unauthorized access');
      }
      return Promise.reject(error);
    }
  );

  return axiosPublic;
};

export default useAxiosPublic;

