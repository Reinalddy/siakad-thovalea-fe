"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Users, Database, CalendarDays,
    Wallet, Settings, Menu, X, ShieldCheck, Bell, UserCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Menu Navigasi Admin
const adminLinks = [
    { name: "Command Center", href: "/admin", icon: LayoutDashboard },
    { name: "Manajemen Periode", href: "/admin/periode", icon: CalendarDays },
    { name: "Master Data", href: "/admin/master", icon: Database },
    { name: "Manajemen Pengguna", href: "/admin/users", icon: Users },
    { name: "Keuangan & Tagihan", href: "/admin/keuangan", icon: Wallet },
    { name: "Pengaturan Sistem", href: "/admin/pengaturan", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Admin (Lebih gelap dan tegas) */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-slate-300 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex h-16 items-center justify-between px-6 border-b border-slate-800 bg-slate-950">
                    <Link href="/admin" className="flex items-center gap-2 text-white">
                        <ShieldCheck className="h-8 w-8 text-blue-500" />
                        <span className="text-xl font-bold tracking-tight">Thovalea <span className="text-sm font-normal text-blue-500">Admin</span></span>
                    </Link>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="px-4 py-6">
                    <p className="px-2 mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Menu Administrator</p>
                    <nav className="space-y-1">
                        {adminLinks.map((link) => {
                            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/admin');
                            const Icon = link.icon;
                            return (
                                <Link key={link.name} href={link.href} onClick={() => setIsSidebarOpen(false)}>
                                    <span className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${isActive
                                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
                                        }`}>
                                        <Icon className={`h-5 w-5 ${isActive ? "text-blue-400" : "text-slate-500"}`} />
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
                        <div className="hidden sm:flex items-center gap-2 text-sm font-medium bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200">
                            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Sistem Online
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="text-slate-500 relative rounded-full hover:bg-slate-100">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <div className="h-8 w-px bg-slate-200 mx-1"></div>
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-medium text-slate-700">Super Admin BAAK</p>
                                <p className="text-xs text-blue-600 font-medium">Root Access</p>
                            </div>
                            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 text-blue-700">
                                <UserCircle className="h-6 w-6" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto bg-slate-50/50">
                    {children}
                </div>
            </main>
        </div>
    );
}