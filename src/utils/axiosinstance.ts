import axios, { AxiosError } from 'axios';

// Create a simple axios instance
const axiosInstance = axios.create();

// Request interceptor to add auth token to all requests
axiosInstance.interceptors.request.use(
    (config) => {
        // Get token from sessionStorage
        let token;
        try {
            const authStorage = sessionStorage.getItem('auth-storage');
            if (authStorage) {
                const parsedStorage = JSON.parse(authStorage);
                token = parsedStorage?.state?.token;
            }
        } catch (error) {
            console.error('Error retrieving token:', error);
        }

        // Add token to headers if available
        if (token && config.headers) {
            config.headers['token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
    (response) => {return response},
    async  (error: AxiosError) => {
        // Handle 401 unauthorized errors
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            // Dispatch a logout event that your auth store can listen for
            window.dispatchEvent(new CustomEvent('auth:unauthorized'));
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;