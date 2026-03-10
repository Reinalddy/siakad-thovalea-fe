"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search, Plus, Filter, Shield, KeyRound,
    MoreHorizontal, Edit, Trash2, Lock, Unlock,
    Users, UserCheck, ShieldAlert, Mail
} from "lucide-react";

// Dummy Data Pengguna Sistem
const systemUsers = [
    { id: "U001", name: "Reinalddy", email: "admin@thovalea.com", role: "Super Admin", status: "Aktif", lastLogin: "Hari ini, 10:30 WIB" },
    { id: "U002", name: "Siti Aminah, M.Kom", email: "siti.aminah@univ.ac.id", role: "Dosen", status: "Aktif", lastLogin: "Kemarin, 14:15 WIB" },
    { id: "U003", name: "Dr. Budi Santoso", email: "budi.s@univ.ac.id", role: "Dosen", status: "Aktif", lastLogin: "3 hari yang lalu" },
    { id: "U004", name: "Ahmad Riyadi", email: "ahmad.2023@student.ac.id", role: "Mahasiswa", status: "Aktif", lastLogin: "Hari ini, 08:00 WIB" },
    { id: "U005", name: "Eko Prasetyo", email: "eko.2024@student.ac.id", role: "Mahasiswa", status: "Terkunci", lastLogin: "1 Bulan yang lalu" }, // Akun bermasalah
    { id: "U006", name: "Staff Keuangan 1", email: "finance1@univ.ac.id", role: "Admin Keuangan", status: "Nonaktif", lastLogin: "Belum pernah login" },
];

export default function ManajemenPenggunaPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("Semua");

    // Filter Data berdasarkan pencarian dan role
    const filteredUsers = systemUsers.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "Semua" || u.role.includes(roleFilter);
        return matchesSearch && matchesRole;
    });

    // Helper untuk warna Role Badge
    const getRoleBadge = (role: string) => {
        if (role.includes("Admin")) return "bg-purple-100 text-purple-700 border-purple-200";
        if (role === "Dosen") return "bg-blue-100 text-blue-700 border-blue-200";
        if (role === "Mahasiswa") return "bg-emerald-100 text-emerald-700 border-emerald-200";
        return "bg-slate-100 text-slate-700 border-slate-200";
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8">

            {/* Header Halaman */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <Users className="h-8 w-8 text-blue-600" />
                        Manajemen Pengguna
                    </h2>
                    <p className="text-slate-600 mt-1">Atur hak akses, kredensial login, dan keamanan akun pengguna.</p>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/20">
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Pengguna
                </Button>
            </div>

            {/* Statistik Keamanan Ringkas */}
            <div className="grid gap-4 sm:grid-cols-3">
                <Card className="rounded-xl border-slate-200 shadow-sm bg-white">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                            <UserCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Akun Aktif</p>
                            <h4 className="text-2xl font-bold text-slate-900">4,432</h4>
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-xl border-slate-200 shadow-sm bg-white">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
                            <Shield className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Akun Administrator</p>
                            <h4 className="text-2xl font-bold text-slate-900">12</h4>
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-xl border-rose-200 shadow-sm bg-rose-50">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="bg-rose-100 p-3 rounded-lg text-rose-600">
                            <ShieldAlert className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-rose-700">Akun Terkunci / Suspend</p>
                            <h4 className="text-2xl font-bold text-rose-900">8</h4>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Data Table */}
            <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden bg-white">

                {/* Toolbar: Search & Filter */}
                <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">

                    <div className="relative flex-1 sm:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Cari nama atau email pengguna..."
                            className="pl-9 py-2 rounded-lg border-slate-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
                        {["Semua", "Admin", "Dosen", "Mahasiswa"].map((role) => (
                            <button
                                key={role}
                                onClick={() => setRoleFilter(role)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${roleFilter === role
                                        ? "bg-slate-800 text-white shadow-sm"
                                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                                    }`}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tabel Pengguna */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-5 py-4 font-bold text-slate-700">Pengguna</th>
                                <th className="px-5 py-4 font-bold text-slate-700 text-center">Hak Akses (Role)</th>
                                <th className="px-5 py-4 font-bold text-slate-700 text-center">Status</th>
                                <th className="px-5 py-4 font-bold text-slate-700">Aktivitas Terakhir</th>
                                <th className="px-5 py-4 font-bold text-slate-700 text-center">Keamanan & Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {filteredUsers.map((user) => {
                                const isLocked = user.status === "Terkunci" || user.status === "Nonaktif";

                                return (
                                    <tr key={user.id} className={`transition-colors hover:bg-slate-50 ${isLocked ? 'bg-slate-50/50' : ''}`}>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${isLocked ? 'bg-slate-200 text-slate-500' : 'bg-blue-100 text-blue-700'}`}>
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className={`font-bold ${isLocked ? 'text-slate-500' : 'text-slate-900'}`}>{user.name}</p>
                                                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                                        <Mail className="h-3 w-3" /> {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${getRoleBadge(user.role)}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${user.status === "Aktif" ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
                                                }`}>
                                                {user.status === "Aktif" ? <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> : <Lock className="h-3 w-3" />}
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <p className="text-slate-600 font-medium">{user.lastLogin}</p>
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                {/* Tombol Reset Password (Aksi paling sering dipakai admin) */}
                                                <Button variant="outline" size="sm" className="h-8 border-slate-200 text-amber-600 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200" title="Kirim Link Reset Password">
                                                    <KeyRound className="h-4 w-4 mr-1.5" /> Reset
                                                </Button>

                                                <div className="h-4 w-px bg-slate-200 mx-1"></div>

                                                {/* Aksi Lainnya */}
                                                <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit Pengguna">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                {isLocked ? (
                                                    <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors" title="Buka Kunci Akun">
                                                        <Unlock className="h-4 w-4" />
                                                    </button>
                                                ) : (
                                                    <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors" title="Kunci Akun (Suspend)">
                                                        <Lock className="h-4 w-4" />
                                                    </button>
                                                )}
                                                <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors" title="Opsi Lainnya">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {filteredUsers.length === 0 && (
                        <div className="p-12 text-center flex flex-col items-center justify-center">
                            <Search className="h-10 w-10 text-slate-300 mb-3" />
                            <p className="text-slate-500 font-medium">Pengguna tidak ditemukan.</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}