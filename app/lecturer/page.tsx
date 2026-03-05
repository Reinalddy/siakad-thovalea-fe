"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Users, BookOpen, CalendarClock, AlertTriangle,
    CheckCircle2, Clock, ChevronRight, UserCheck
} from "lucide-react";

// Dummy Data untuk UX Dosen
const krsApprovals = [
    { id: "101", nim: "20230001", name: "Ahmad Riyadi", status: "Menunggu", sks: 21 },
    { id: "102", nim: "20230045", name: "Siti Nurhaliza", status: "Menunggu", sks: 24 },
    { id: "103", nim: "20230088", name: "Budi Santoso", status: "Menunggu", sks: 18 },
];

const todayClasses = [
    { id: 1, name: "Rekayasa Perangkat Lunak", time: "08:00 - 10:30", room: "Lab A2", class: "TI-4A" },
    { id: 2, name: "Arsitektur Database", time: "13:00 - 15:30", room: "Ruang 401", class: "TI-4B" },
];

export default function LecturerDashboard() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-8">

            {/* Header & Konteks Waktu */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Selamat pagi, Bapak Reinalddy!</h2>
                    <p className="text-slate-600 mt-1">Kamis, 5 Maret 2026 • Semester Genap 2025/2026</p>
                </div>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 shadow-md">
                    <CalendarClock className="h-4 w-4 mr-2" />
                    Lihat Kalender Akademik
                </Button>
            </div>

            {/* Alert Banner - Peringatan Penting */}
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start sm:items-center gap-4 shadow-sm">
                <div className="bg-rose-100 p-2 rounded-full text-rose-600 shrink-0">
                    <AlertTriangle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-semibold text-rose-800">Batas Waktu Persetujuan KRS</h4>
                    <p className="text-sm text-rose-700 mt-0.5">Portal persetujuan KRS untuk mahasiswa bimbingan akademik akan ditutup pada 10 Maret 2026. Terdapat 3 mahasiswa yang menunggu persetujuan Anda.</p>
                </div>
            </div>

            {/* Statistik Cepat (Cards) */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="rounded-2xl border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Mahasiswa Bimbingan</CardTitle>
                        <Users className="h-5 w-5 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">24 <span className="text-sm font-normal text-slate-500">Mahasiswa</span></div>
                        <p className="text-xs text-rose-600 mt-1 font-medium">3 belum disetujui KRS-nya</p>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Kelas Diampu</CardTitle>
                        <BookOpen className="h-5 w-5 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">4 <span className="text-sm font-normal text-slate-500">Kelas</span></div>
                        <p className="text-xs text-slate-500 mt-1 font-medium">Total 12 SKS Semester ini</p>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-emerald-200 bg-emerald-50 shadow-sm sm:col-span-2 lg:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-800">Status Input Nilai</CardTitle>
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold text-emerald-900">Belum Dibuka</div>
                        <p className="text-xs text-emerald-700 mt-1">Portal nilai UTS dibuka pertengahan April</p>
                    </CardContent>
                </Card>
            </div>

            {/* Grid Bawah: Persetujuan KRS (Kiri) & Jadwal (Kanan) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Widget Persetujuan KRS (Makan 2 Kolom) */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900">Menunggu Persetujuan KRS</h3>
                        <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 text-sm">
                            Lihat Semua
                        </Button>
                    </div>

                    <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
                        <div className="divide-y divide-slate-100">
                            {krsApprovals.map((student) => (
                                <div key={student.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-amber-100 text-amber-600 p-2.5 rounded-full shrink-0">
                                            <UserCheck className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900">{student.name}</h4>
                                            <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                                                <span className="font-mono">{student.nim}</span>
                                                <span>•</span>
                                                <span className="font-medium text-emerald-600">{student.sks} SKS Diajukan</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <Button variant="outline" className="w-full sm:w-auto border-slate-200 text-slate-600 hover:bg-slate-100">
                                            Detail
                                        </Button>
                                        <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white">
                                            Setujui
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {krsApprovals.length === 0 && (
                                <div className="p-8 text-center text-slate-500">
                                    <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                                    <p>Semua KRS mahasiswa bimbingan telah disetujui.</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Widget Jadwal Mengajar (1 Kolom di Kanan) */}
                <div className="lg:col-span-1 space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Jadwal Mengajar Hari Ini</h3>

                    <Card className="rounded-2xl border-slate-200 shadow-sm p-1">
                        <div className="divide-y divide-slate-100">
                            {todayClasses.map((cls) => (
                                <div key={cls.id} className="p-4 hover:bg-slate-50 transition-colors rounded-xl">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-semibold text-slate-900 leading-tight pr-4">{cls.name}</h4>
                                        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-md border border-slate-200 shrink-0">
                                            {cls.class}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-500 mt-3">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-4 w-4 text-emerald-500" />
                                            {cls.time}
                                        </div>
                                        <div className="h-4 w-px bg-slate-200"></div>
                                        <div className="font-medium text-slate-700">
                                            {cls.room}
                                        </div>
                                    </div>
                                    <Button variant="ghost" className="w-full mt-4 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 justify-between group">
                                        Cetak Presensi
                                        <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
}