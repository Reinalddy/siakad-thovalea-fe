"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    CalendarDays, Plus, PlayCircle, Edit, Trash2,
    CheckCircle2, AlertTriangle, Clock, Lock, CalendarCheck
} from "lucide-react";

// Dummy Data Periode Akademik
const initialPeriods = [
    {
        id: "20252",
        tahun: "2025/2026",
        semester: "Genap",
        status: "Aktif", // Status: Aktif, Selesai, Draft
        krsStart: "01 Mar 2026", krsEnd: "10 Mar 2026",
        nilaiStart: "15 Jun 2026", nilaiEnd: "30 Jun 2026",
        uktStart: "15 Feb 2026", uktEnd: "28 Feb 2026"
    },
    {
        id: "20261",
        tahun: "2026/2027",
        semester: "Ganjil",
        status: "Draft",
        krsStart: "01 Sep 2026", krsEnd: "10 Sep 2026",
        nilaiStart: "15 Jan 2027", nilaiEnd: "30 Jan 2027",
        uktStart: "15 Agu 2026", uktEnd: "31 Agu 2026"
    },
    {
        id: "20251",
        tahun: "2025/2026",
        semester: "Ganjil",
        status: "Selesai",
        krsStart: "01 Sep 2025", krsEnd: "10 Sep 2025",
        nilaiStart: "15 Jan 2026", nilaiEnd: "30 Jan 2026",
        uktStart: "15 Agu 2025", uktEnd: "31 Agu 2025"
    },
];

export default function ManajemenPeriodePage() {
    const [periods, setPeriods] = useState(initialPeriods);

    const activePeriod = periods.find(p => p.status === "Aktif");

    // Fungsi untuk mengaktifkan periode baru
    const handleActivate = (id: string) => {
        if (confirm("PERINGATAN KRUSIAL!\n\nMengaktifkan periode ini akan menutup periode sebelumnya. Semua transaksi KRS dan Nilai akan dialihkan ke periode baru ini.\n\nApakah Anda yakin?")) {
            setPeriods(periods.map(p => {
                if (p.id === id) return { ...p, status: "Aktif" };
                if (p.status === "Aktif") return { ...p, status: "Selesai" }; // Ubah yg aktif jadi selesai
                return p;
            }));
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8">

            {/* Header Halaman */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <CalendarDays className="h-8 w-8 text-blue-600" />
                        Manajemen Periode Akademik
                    </h2>
                    <p className="text-slate-600 mt-1">Atur tahun ajaran, semester aktif, dan batas waktu KRS/KHS.</p>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/20">
                    <Plus className="h-4 w-4 mr-2" />
                    Buat Periode Baru
                </Button>
            </div>

            {/* HIGHLIGHT: Periode Aktif Saat Ini */}
            {activePeriod && (
                <Card className="rounded-2xl border-2 border-emerald-500 shadow-lg shadow-emerald-500/10 relative overflow-hidden bg-white">
                    <div className="absolute top-0 right-0 bg-emerald-500 text-white px-4 py-1.5 rounded-bl-2xl font-bold text-sm flex items-center gap-1.5 shadow-sm">
                        <span className="flex h-2 w-2 rounded-full bg-white animate-pulse"></span>
                        SEDANG BERJALAN
                    </div>
                    <CardContent className="p-6 sm:p-8">
                        <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">

                            {/* Info Utama */}
                            <div className="flex-1">
                                <p className="text-sm font-bold text-emerald-600 tracking-wider uppercase mb-1">Tahun Akademik Aktif</p>
                                <h3 className="text-4xl font-black text-slate-900 mb-2">
                                    Semester {activePeriod.semester} <span className="text-slate-500 font-medium">{activePeriod.tahun}</span>
                                </h3>
                                <p className="text-slate-600 flex items-center gap-2 text-sm bg-slate-50 w-fit px-3 py-1.5 rounded-lg border border-slate-200">
                                    <Lock className="h-4 w-4 text-amber-500" />
                                    Seluruh sistem saat ini mengacu pada data periode ini.
                                </p>
                            </div>

                            {/* Timeline Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <div className="flex items-center gap-2 text-slate-800 font-bold mb-2">
                                        <CalendarCheck className="h-4 w-4 text-blue-500" /> KRS & Batal Tambah
                                    </div>
                                    <div className="text-xs text-slate-600 font-medium space-y-1">
                                        <p>Mulai: <span className="text-slate-900">{activePeriod.krsStart}</span></p>
                                        <p>Akhir: <span className="text-slate-900">{activePeriod.krsEnd}</span></p>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <div className="flex items-center gap-2 text-slate-800 font-bold mb-2">
                                        <Clock className="h-4 w-4 text-emerald-500" /> Input Nilai Dosen
                                    </div>
                                    <div className="text-xs text-slate-600 font-medium space-y-1">
                                        <p>Mulai: <span className="text-slate-900">{activePeriod.nilaiStart}</span></p>
                                        <p>Akhir: <span className="text-slate-900">{activePeriod.nilaiEnd}</span></p>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <div className="flex items-center gap-2 text-slate-800 font-bold mb-2">
                                        <AlertTriangle className="h-4 w-4 text-amber-500" /> Pembayaran UKT
                                    </div>
                                    <div className="text-xs text-slate-600 font-medium space-y-1">
                                        <p>Mulai: <span className="text-slate-900">{activePeriod.uktStart}</span></p>
                                        <p>Akhir: <span className="text-slate-900">{activePeriod.uktEnd}</span></p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Tabel Daftar Semua Periode */}
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Daftar Periode Akademik</h3>
            <Card className="rounded-2xl border-slate-200 shadow-sm bg-white overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-bold text-slate-700">Tahun Akademik</th>
                                <th className="px-6 py-4 font-bold text-slate-700">Masa KRS</th>
                                <th className="px-6 py-4 font-bold text-slate-700">Masa Input Nilai</th>
                                <th className="px-6 py-4 font-bold text-slate-700 text-center">Status</th>
                                <th className="px-6 py-4 font-bold text-slate-700 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {periods.map((periode) => {
                                const isAktif = periode.status === "Aktif";
                                const isSelesai = periode.status === "Selesai";
                                const isDraft = periode.status === "Draft";

                                return (
                                    <tr key={periode.id} className={`transition-colors hover:bg-slate-50/50 ${isAktif ? 'bg-emerald-50/30' : ''}`}>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-900 text-base">Semester {periode.semester}</p>
                                            <p className="text-slate-500 font-medium mt-0.5">{periode.tahun}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-slate-800 font-medium">{periode.krsStart}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">s/d {periode.krsEnd}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-slate-800 font-medium">{periode.nilaiStart}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">s/d {periode.nilaiEnd}</p>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${isAktif ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                                                    isSelesai ? "bg-slate-100 text-slate-600 border-slate-200" :
                                                        "bg-amber-100 text-amber-700 border-amber-200"
                                                }`}>
                                                {isAktif && <CheckCircle2 className="h-3 w-3" />}
                                                {periode.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Tombol Aktifkan (Hanya muncul jika bukan yang aktif) */}
                                                {!isAktif && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleActivate(periode.id)}
                                                        className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 font-semibold"
                                                    >
                                                        <PlayCircle className="h-4 w-4 mr-1.5" /> Set Aktif
                                                    </Button>
                                                )}

                                                <button className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors" title="Edit Periode">
                                                    <Edit className="h-4 w-4" />
                                                </button>

                                                {/* Tombol Hapus (Hanya untuk Draft) */}
                                                {isDraft && (
                                                    <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors" title="Hapus Periode">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>

        </div>
    );
}