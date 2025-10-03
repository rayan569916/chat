import axios from "axios";


export const BASE_URL = "http://localhost:5000";
export const TEST_API_BACKEND =  `${BASE_URL}/test-frontend-connectivity`;
export const TEST_API_DB = `${BASE_URL}/test-db-connectivity`;
export const LOGIN_API = `${BASE_URL}/login`;
export const SIGNUP_API = `${BASE_URL}/signup`;


export async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post('http://localhost:5000/refresh', {}, {
        headers: { Authorization: `Bearer ${refreshToken}` }
    });
    localStorage.setItem('accessToken', response.data.access_token);
};

axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newToken = await refreshAccessToken();
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return axios(originalRequest); // Retry the original request
            } catch (refreshError) {
                // Optionally, redirect to login or show error
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);