import { create } from 'zustand';
import Cookies from 'js-cookie';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: Cookies.get('token') || null,

    setAuth: (user, token) => {
        // Simpan ke Cookies agar terbaca oleh Middleware Next.js (Masa aktif 1 hari)
        Cookies.set('token', token, { expires: 1 });
        Cookies.set('role', user.role, { expires: 1 });

        // Simpan data lengkap user ke localStorage untuk render UI cepat
        localStorage.setItem('user_data', JSON.stringify(user));

        set({ user, token });
    },

    logout: () => {
        Cookies.remove('token');
        Cookies.remove('role');
        localStorage.removeItem('user_data');
        set({ user: null, token: null });
        // Redirect ke halaman login setelah logout
        window.location.href = '/login';
    },
}));