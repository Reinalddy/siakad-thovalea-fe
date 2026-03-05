"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Clock, MapPin, Users, Printer, CheckCircle2,
    XCircle, UserMinus, FileText, ChevronRight, Calendar
} from "lucide-react";

// Dummy Data Jadwal
const mySchedules = [
    { id: 1, code: "TI-401", name: "Rekayasa Perangkat Lunak", class: "TI-4A", time: "08:00 - 10:30", room: "Lab Komputer A", totalStudents: 35, isToday: true },
    { id: 2, code: "TI-406", name: "Kecerdasan Buatan (AI)", class: "TI-6B", time: "13:00 - 15:30", room: "Gedung A, R.202", totalStudents: 28, isToday: true },
    { id: 3, code: "TI-405", name: "Cloud Computing", class: "TI-6A", time: "08:00 - 10:30", room: "Lab Jaringan", totalStudents: 40, isToday: false }, // Jadwal besok
];

// Dummy Data Mahasiswa untuk Kelas yang dipilih
const enrolledStudents = [
    { id: "2023001", name: "Ahmad Riyadi", status: "Hadir" }, // Hadir, Izin, Sakit, Alpa
    { id: "2023002", name: "Budi Santoso", status: "Hadir" },
    { id: "2023003", name: "Citra Kirana", status: "Sakit" },
    { id: "2023004", name: "Dewi Lestari", status: "Hadir" },
    { id: "2023005", name: "Eko Prasetyo", status: "Alpa" },
];

export default function JadwalPresensiPage() {
    // Secara default, pilih kelas pertama yang ada jadwal hari ini
    const [selectedClass, setSelectedClass] = useState<number | null>(mySchedules[0].id);
    const [attendance, setAttendance] = useState(enrolledStudents);

    const activeClassData = mySchedules.find(c => c.id === selectedClass);

    // Fungsi untuk mengubah status absensi
    const updateStatus = (studentId: string, newStatus: string) => {
        setAttendance(attendance.map(student =>
            student.id === studentId ? { ...student, status: newStatus } : student
        ));
    };

    // Hitung ringkasan absensi
    const countStatus = (status: string) => attendance.filter(s => s.status === status).length;

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8">

            {/* Header Halaman */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <Calendar className="h-8 w-8 text-emerald-600" />
                        Jadwal & Presensi Kelas
                    </h2>
                    <p className="text-slate-600 mt-1">Kelola jadwal mengajar dan isi Berita Acara Perkuliahan (BAP).</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* KOLOM KIRI: Daftar Kelas (1 Kolom) */}
                <div className="lg:col-span-1 space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Jadwal Anda</h3>

                    <div className="space-y-3">
                        {mySchedules.map((cls) => {
                            const isActive = selectedClass === cls.id;

                            return (
                                <Card
                                    key={cls.id}
                                    className={`rounded-2xl border-2 transition-all cursor-pointer hover:shadow-md ${isActive ? "border-emerald-500 bg-emerald-50/20" : "border-slate-200 hover:border-emerald-200 bg-white"
                                        }`}
                                    onClick={() => setSelectedClass(cls.id)}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="px-2 py-1 rounded bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider">
                                                {cls.class}
                                            </span>
                                            {cls.isToday && (
                                                <span className="flex h-2.5 w-2.5">
                                                    <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="font-bold text-slate-900 leading-tight">{cls.name}</h4>

                                        <div className="flex flex-col gap-1.5 mt-3 text-xs text-slate-600 font-medium">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-3.5 w-3.5 text-emerald-600" />
                                                {cls.time}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                                {cls.room}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* KOLOM KANAN: Detail Kelas & Presensi (2 Kolom) */}
                <div className="lg:col-span-2 space-y-4">
                    {activeClassData ? (
                        <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
                            {/* Header Detail Kelas */}
                            <div className="bg-slate-900 text-white p-6 sm:p-8">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-white text-xs font-bold border border-white/10">{activeClassData.code}</span>
                                            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">{activeClassData.class}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold">{activeClassData.name}</h3>
                                        <div className="flex items-center gap-4 mt-3 text-sm text-slate-300">
                                            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {activeClassData.time}</span>
                                            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {activeClassData.room}</span>
                                            <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {activeClassData.totalStudents} Mhs</span>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="border-white/20 text-black hover:bg-white/10 shrink-0">
                                        <Printer className="h-4 w-4 mr-2" />
                                        Cetak BAP
                                    </Button>
                                </div>
                            </div>

                            {/* Form BAP (Materi) */}
                            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                                <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-emerald-600" />
                                    Materi Perkuliahan Hari Ini
                                </h4>
                                <textarea
                                    className="w-full min-h-[80px] p-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                                    placeholder="Ketik ringkasan materi yang diajarkan hari ini (contoh: Pengenalan React Framework & State Management)..."
                                ></textarea>
                            </div>

                            {/* Tabel Presensi */}
                            <div className="p-0">
                                <div className="px-6 py-4 bg-white flex items-center justify-between border-b border-slate-100">
                                    <h4 className="text-sm font-bold text-slate-800">Daftar Hadir Mahasiswa</h4>
                                    <div className="flex gap-3 text-xs font-semibold">
                                        <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Hadir: {countStatus("Hadir")}</span>
                                        <span className="text-rose-600 bg-rose-50 px-2 py-1 rounded">Alpa: {countStatus("Alpa")}</span>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                            <tr>
                                                <th className="px-6 py-3">NIM / Nama</th>
                                                <th className="px-6 py-3 text-center">Aksi Presensi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 bg-white">
                                            {attendance.map((student) => (
                                                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <p className="font-bold text-slate-900">{student.name}</p>
                                                        <p className="text-xs text-slate-500 font-mono mt-0.5">{student.id}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-center gap-2">
                                                            {/* Tombol Hadir */}
                                                            <button
                                                                onClick={() => updateStatus(student.id, "Hadir")}
                                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${student.status === "Hadir" ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                                                    }`}
                                                            >
                                                                <CheckCircle2 className="h-4 w-4" /> Hadir
                                                            </button>

                                                            {/* Tombol Izin/Sakit */}
                                                            <button
                                                                onClick={() => updateStatus(student.id, "Sakit")}
                                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${student.status === "Sakit" || student.status === "Izin" ? "bg-amber-100 text-amber-700 border border-amber-200" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                                                    }`}
                                                            >
                                                                <UserMinus className="h-4 w-4" /> Sakit/Izin
                                                            </button>

                                                            {/* Tombol Alpa */}
                                                            <button
                                                                onClick={() => updateStatus(student.id, "Alpa")}
                                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${student.status === "Alpa" ? "bg-rose-100 text-rose-700 border border-rose-200" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                                                    }`}
                                                            >
                                                                <XCircle className="h-4 w-4" /> Alpa
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <CardFooter className="bg-slate-50 border-t border-slate-100 p-6 flex justify-end">
                                <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-8 shadow-md">
                                    Simpan Presensi & BAP
                                </Button>
                            </CardFooter>
                        </Card>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center p-12 text-slate-400 bg-white rounded-2xl border border-slate-200 border-dashed">
                            <Calendar className="h-12 w-12 mb-4 text-slate-300" />
                            <p>Pilih jadwal kelas di sebelah kiri untuk memulai presensi.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}