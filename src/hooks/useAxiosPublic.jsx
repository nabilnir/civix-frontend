import axios from 'axios';

/**
 * Public axios instance for unauthenticated requests
 * Does not include authentication token
 */
const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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

