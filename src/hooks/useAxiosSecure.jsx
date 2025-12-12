import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import useAuth from './useAuth'

// Get API URL from environment variable or fallback to Vercel backend
const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Fallback to Vercel backend if env var is not set
  return 'https://civix-backend-livid.vercel.app';
};

const axiosInstance = axios.create({
  baseURL: getApiUrl(),
  withCredentials: true,
})

const useAxiosSecure = () => {
  const { user, logOut, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading) {
      const requestInterceptor = axiosInstance.interceptors.request.use(
        config => {
          // Get token dynamically from user object or localStorage on each request
          const token = user?.accessToken || localStorage.getItem('civix-token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config
        }
      )

      // Add response interceptor
      const responseInterceptor = axiosInstance.interceptors.response.use(
        res => res,
        err => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            logOut()
              .then(() => {
                console.log('Logged out successfully.')
              })
              .catch(console.error)
            navigate('/login')
          }
          return Promise.reject(err)
        }
      )

      // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor)
        axiosInstance.interceptors.response.eject(responseInterceptor)
      }
    }
  }, [user, loading, logOut, navigate])

  return axiosInstance
}
export default useAxiosSecure
