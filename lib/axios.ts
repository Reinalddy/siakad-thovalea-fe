import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    // Sesuaikan dengan URL backend Laravel kamu
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor: Otomatis pasang token sebelum request dikirim
api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;