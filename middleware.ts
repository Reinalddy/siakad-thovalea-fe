import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const role = request.cookies.get('role')?.value;
    const { pathname } = request.nextUrl;

    // 1. Jika BELUM login, cegah akses ke halaman terproteksi
    if (!token && pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 2. Jika SUDAH login tapi mencoba buka halaman /login, arahkan ke dashboard masing-masing
    if (token && pathname === '/login') {
        if (role === 'Super Admin' || role === 'Admin BAAK') return NextResponse.redirect(new URL('/admin', request.url));
        if (role === 'Dosen') return NextResponse.redirect(new URL('/lecturer', request.url));
        if (role === 'Mahasiswa') return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // 3. RBAC (Role-Based Access Control) - Cegah user nyasar ke dashboard yang salah
    if (token) {
        if (pathname.startsWith('/admin') && role !== 'Super Admin' && role !== 'Admin BAAK') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        if (pathname.startsWith('/lecturer') && role !== 'Dosen') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        if (pathname.startsWith('/dashboard') && role !== 'Mahasiswa') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

// Tentukan rute mana saja yang mau dijaga satpam ini
export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*', '/lecturer/:path*', '/login'],
};