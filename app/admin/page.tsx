"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // Pastikan sudah diinstall
import {
    Users, GraduationCap, Server, Wallet, Activity,
    Power, CalendarDays, AlertTriangle, ShieldAlert
} from "lucide-react";

export default function AdminDashboardPage() {
    // State untuk saklar (Toggles) Sistem
    const [systemToggles, setSystemToggles] = useState({
        krs: true,
        nilai: false,
        pembayaran: true,
        maintenance: false,
    });

    const handleToggle = (key: keyof typeof systemToggles) => {
        // Simulasi konfirmasi keamanan untuk Admin
        const action = systemToggles[key] ? "menutup" : "membuka";
        if (confirm(`Apakah Anda yakin ingin ${action} portal ini?`)) {
            setSystemToggles({ ...systemToggles, [key]: !systemToggles[key] });
        }
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">SIAKAD Command Center</h2>
                    <p className="text-slate-600 mt-1">Pantau performa sistem dan kendalikan periode akademik.</p>
                </div>
                <div className="bg-slate-900 text-white px-5 py-2.5 rounded-xl border border-slate-800 shadow-md flex items-center gap-3">
                    <CalendarDays className="h-5 w-5 text-blue-400" />
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Periode Aktif</p>
                        <p className="text-sm font-semibold">Semester Genap 2025/2026</p>
                    </div>
                </div>
            </div>

            {/* Statistik Utama (Helicopter View) */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="rounded-2xl border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Mahasiswa Aktif</CardTitle>
                        <Users className="h-5 w-5 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">4,250</div>
                        <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">
                            <Activity className="h-3 w-3" /> +120 mahasiswa baru
                        </p>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Total Dosen</CardTitle>
                        <GraduationCap className="h-5 w-5 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">185</div>
                        <p className="text-xs text-slate-500 mt-1 font-medium">Tetap & Luar Biasa (LB)</p>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Pembayaran UKT</CardTitle>
                        <Wallet className="h-5 w-5 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">85%</div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-1.5 font-medium">Rp 12.5M Terkumpul</p>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-slate-200 shadow-sm bg-slate-900 text-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Beban Server (CPU)</CardTitle>
                        <Server className="h-5 w-5 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">24%</div>
                        <p className="text-xs text-emerald-400 mt-1 font-medium flex items-center gap-1">
                            Sistem berjalan optimal
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* KOLOM KIRI: Saklar Kendali Periode (Makan 2 Kolom) */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Power className="h-5 w-5 text-slate-500" />
                        Kendali Portal Akademik
                    </h3>

                    <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
                        <div className="divide-y divide-slate-100">

                            {/* Toggle KRS */}
                            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Portal Pengisian KRS</h4>
                                    <p className="text-sm text-slate-500 mt-1">Mengizinkan mahasiswa untuk memilih mata kuliah dan dosen untuk melakukan persetujuan.</p>
                                    {systemToggles.krs && (
                                        <div className="inline-flex mt-3 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md text-xs font-bold border border-emerald-200">
                                            Berakhir otomatis: 10 Maret 2026
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm shrink-0">
                                    <span className={`text-sm font-bold ${systemToggles.krs ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        {systemToggles.krs ? 'TERBUKA' : 'DITUTUP'}
                                    </span>
                                    <Switch
                                        checked={systemToggles.krs}
                                        onCheckedChange={() => handleToggle('krs')}
                                    />
                                </div>
                            </div>

                            {/* Toggle Input Nilai */}
                            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Portal Input Nilai Dosen</h4>
                                    <p className="text-sm text-slate-500 mt-1">Mengizinkan dosen untuk memasukkan nilai UTS/UAS dan mengunci nilai yang sudah masuk.</p>
                                </div>
                                <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm shrink-0">
                                    <span className={`text-sm font-bold ${systemToggles.nilai ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        {systemToggles.nilai ? 'TERBUKA' : 'DITUTUP'}
                                    </span>
                                    <Switch
                                        checked={systemToggles.nilai}
                                        onCheckedChange={() => handleToggle('nilai')}
                                    />
                                </div>
                            </div>

                            {/* Toggle Pembayaran UKT */}
                            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Gateway Pembayaran UKT</h4>
                                    <p className="text-sm text-slate-500 mt-1">Membuka saluran pembayaran virtual account untuk pelunasan tagihan mahasiswa.</p>
                                </div>
                                <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm shrink-0">
                                    <span className={`text-sm font-bold ${systemToggles.pembayaran ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        {systemToggles.pembayaran ? 'TERBUKA' : 'DITUTUP'}
                                    </span>
                                    <Switch
                                        checked={systemToggles.pembayaran}
                                        onCheckedChange={() => handleToggle('pembayaran')}
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Danger Zone */}
                        <div className="bg-rose-50 p-6 border-t border-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                                <ShieldAlert className="h-6 w-6 text-rose-600 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-rose-900">Mode Pemeliharaan (Maintenance)</h4>
                                    <p className="text-sm text-rose-700 mt-1">Mengunci seluruh akses aplikasi (kecuali Super Admin) untuk keperluan update database.</p>
                                </div>
                            </div>
                            <Button variant="destructive" className="shrink-0 w-full sm:w-auto shadow-md">
                                Aktifkan Maintenance
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* KOLOM KANAN: Aktivitas Log (Audit Trail) */}
                <div className="lg:col-span-1 space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Aktivitas Terkini (Log)</h3>

                    <Card className="rounded-2xl border-slate-200 shadow-sm p-4">
                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">

                            {/* Log Item 1 */}
                            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                    <Users className="h-4 w-4" />
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl border border-slate-200 bg-white shadow-sm">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-slate-900 text-sm">Budi Santoso (Admin)</span>
                                    </div>
                                    <div className="text-xs text-slate-600">Menghapus data 2 Dosen LB.</div>
                                    <div className="text-[10px] text-slate-400 font-mono mt-1.5">Baru saja</div>
                                </div>
                            </div>

                            {/* Log Item 2 */}
                            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-emerald-100 text-emerald-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                    <Wallet className="h-4 w-4" />
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl border border-slate-200 bg-white shadow-sm">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-slate-900 text-sm">System Webhook</span>
                                    </div>
                                    <div className="text-xs text-slate-600">Menerima 45 pembayaran via VA Mandiri.</div>
                                    <div className="text-[10px] text-slate-400 font-mono mt-1.5">15 menit yang lalu</div>
                                </div>
                            </div>

                            {/* Log Item 3 */}
                            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                    <Power className="h-4 w-4" />
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl border border-slate-200 bg-white shadow-sm">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-slate-900 text-sm">Super Admin</span>
                                    </div>
                                    <div className="text-xs text-slate-600">Menutup portal KHS Semester Ganjil.</div>
                                    <div className="text-[10px] text-slate-400 font-mono mt-1.5">2 jam yang lalu</div>
                                </div>
                            </div>

                        </div>
                        <Button variant="ghost" className="w-full mt-4 text-xs text-slate-500 hover:text-blue-600 hover:bg-blue-50">
                            Lihat Log Sistem Lengkap
                        </Button>
                    </Card>
                </div>

            </div>
        </div>
    );
}