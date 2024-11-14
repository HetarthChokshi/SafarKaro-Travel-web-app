import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const baseURL = 'http://localhost:8000/';

const AxiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 20000,
    headers: {
        'Authorization': sessionStorage.getItem('access_token')
            ? 'Bearer ' + sessionStorage.getItem('access_token')
            : null,
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
});

AxiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = sessionStorage.getItem('access_token');

        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            const now = Math.ceil(Date.now() / 1000);

            // Check if token is expired
            if (decodedToken.exp < now) {
                try {
                    const response = await AxiosInstance.post('api/token/refresh/', {
                        refresh: sessionStorage.getItem('refresh_token'),
                    });
                    sessionStorage.setItem('access_token', response.data.access);
                    config.headers['Authorization'] = 'Bearer ' + response.data.access;
                } catch (error) {
                    console.error('Failed to refresh token:', error);
                    window.location.href = '/login/';
                    return Promise.reject(error);
                }
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default AxiosInstance;
