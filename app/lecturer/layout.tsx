"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Users, BookOpen, CheckSquare,
    Settings, Menu, X, GraduationCap, Bell, UserCircle, Briefcase,
    LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";

// Menu khusus Dosen
const lecturerLinks = [
    { name: "Dashboard", href: "/lecturer", icon: LayoutDashboard },
    { name: "Ambil Kelas (Kesediaan)", href: "/lecturer/ambil-kelas", icon: Briefcase }, // Fitur yang kamu minta!
    { name: "Jadwal & Presensi", href: "/lecturer/jadwal", icon: BookOpen },
    { name: "Persetujuan KRS", href: "/lecturer/persetujuan-krs", icon: CheckSquare },
    { name: "Input Nilai (KHS)", href: "/lecturer/nilai", icon: Users },
    { name: "Pengaturan Akun", href: "/lecturer/pengaturan", icon: Settings },
];

export default function LecturerLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    const logoutAction = useAuthStore((state) => state.logout);

    const handleLogout = async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error("Gagal logout dari server", error);
        } finally {
            logoutAction();
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Dosen (Warna lebih gelap/profesional) */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex h-16 items-center justify-between px-6 border-b border-slate-800 bg-slate-950/50">
                    <Link href="/lecturer" className="flex items-center gap-2 text-white">
                        <GraduationCap className="h-8 w-8 text-emerald-500" />
                        <span className="text-xl font-bold tracking-tight">Thovalea <span className="text-sm font-normal text-emerald-500">Dosen</span></span>
                    </Link>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="px-4 py-6">
                    <p className="px-2 mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Menu Pengajar</p>
                    <nav className="space-y-1">
                        {lecturerLinks.map((link) => {
                            const isActive = pathname === link.href;
                            const Icon = link.icon;
                            return (
                                <Link key={link.name} href={link.href} onClick={() => setIsSidebarOpen(false)}>
                                    <span className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${isActive
                                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                                        }`}>
                                        <Icon className={`h-5 w-5 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />
                                        {link.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex flex-1 flex-col overflow-hidden">
                {/* Top Navbar */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 md:px-8 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                            <Menu className="h-6 w-6" />
                        </button>
                        <h1 className="text-lg font-semibold text-slate-800 hidden sm:block">Portal Dosen</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Indikator Notifikasi KRS Menunggu */}
                        <Button variant="ghost" size="icon" className="text-slate-500 relative rounded-full hover:bg-emerald-50 hover:text-emerald-600">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">3</span>
                        </Button>

                        <div className="h-8 w-px bg-slate-200 mx-1"></div>

                        {/* Profil Dosen */}
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-medium text-slate-700">Reinalddy, M.Kom.</p>
                                <p className="text-xs text-emerald-600 font-medium">NIDN: 0412345678</p>
                            </div>
                            <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-600">
                                <UserCircle className="h-6 w-6" />
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleLogout}
                            className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 ml-2 transition-colors"
                            title="Keluar dari Sistem"
                        >
                            <LogOut className="h-5 w-5" />
                        </Button>
                    </div>
                </header>

                {/* Page Content (Berisi page.tsx yang sebelumnya kita buat) */}
                <div className="flex-1 overflow-y-auto bg-slate-50/50">
                    {children}
                </div>
            </main>
        </div>
    );
}