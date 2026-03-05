"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Trash2, Clock, CheckCircle2, AlertCircle, BookOpen, GraduationCap, Briefcase } from "lucide-react";

// Dummy Data Kelas yang ditawarkan oleh Prodi
const offeredClasses = [
    { id: 1, code: "TI-401", name: "Pemrograman Web Lanjut", sks: 3, targetClass: "TI-4A", schedule: "Senin, 08:00 - 10:30", type: "Wajib", isTaken: false },
    { id: 2, code: "TI-401", name: "Pemrograman Web Lanjut", sks: 3, targetClass: "TI-4B", schedule: "Senin, 13:00 - 15:30", type: "Wajib", isTaken: true }, // Sudah diambil dosen lain
    { id: 3, code: "TI-402", name: "Rekayasa Perangkat Lunak", sks: 3, targetClass: "TI-4A", schedule: "Selasa, 10:00 - 12:30", type: "Wajib", isTaken: false },
    { id: 4, code: "TI-405", name: "Cloud Computing", sks: 3, targetClass: "TI-6A", schedule: "Rabu, 08:00 - 10:30", type: "Pilihan", isTaken: false },
    { id: 5, code: "TI-406", name: "Kecerdasan Buatan (AI)", sks: 3, targetClass: "TI-6B", schedule: "Kamis, 13:00 - 15:30", type: "Wajib", isTaken: false },
    { id: 6, code: "TI-408", name: "Etika Profesi IT", sks: 2, targetClass: "TI-8A", schedule: "Jumat, 09:00 - 10:40", type: "Wajib", isTaken: false },
];

export default function AmbilKelasPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedClasses, setSelectedClasses] = useState<number[]>([]);

    // Batas Beban Mengajar (Misal: Maksimal 12 SKS untuk pengajaran, sisanya untuk penelitian/pengabdian)
    const MAX_TEACHING_SKS = 12;

    const filteredClasses = offeredClasses.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const draftedClasses = offeredClasses.filter(c => selectedClasses.includes(c.id));
    const currentSKS = draftedClasses.reduce((total, c) => total + c.sks, 0);

    const toggleTakeClass = (classId: number, classSks: number) => {
        if (selectedClasses.includes(classId)) {
            setSelectedClasses(selectedClasses.filter(id => id !== classId));
        } else {
            if (currentSKS + classSks > MAX_TEACHING_SKS) {
                alert("Peringatan: Melebihi batas maksimal Beban Kerja Dosen (BKD) Pengajaran!");
                return;
            }
            setSelectedClasses([...selectedClasses, classId]);
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8">

            {/* Header Halaman */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                    <Briefcase className="h-8 w-8 text-emerald-600" />
                    Kesediaan Mengajar
                </h2>
                <p className="text-slate-600 mt-1">Pilih kelas yang bersedia Anda ampu untuk Semester Genap 2025/2026.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* KOLOM KIRI: Daftar Kelas yang Ditawarkan (Makan 2 Kolom) */}
                <div className="lg:col-span-2 space-y-4">

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input
                            placeholder="Cari mata kuliah, kode, atau kelas (misal: TI-4A)..."
                            className="pl-10 py-6 text-md rounded-xl border-slate-200 bg-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="space-y-4">
                        {filteredClasses.map((cls) => {
                            const isSelected = selectedClasses.includes(cls.id);

                            return (
                                <Card key={cls.id} className={`rounded-2xl border transition-all ${isSelected ? "border-emerald-500 bg-emerald-50/30 shadow-md" : "border-slate-200 hover:border-emerald-300"}`}>
                                    <CardContent className="p-5">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-white text-xs font-bold">{cls.targetClass}</span>
                                                    <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">{cls.code}</span>
                                                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">{cls.sks} SKS</span>
                                                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${cls.type === 'Wajib' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                                        {cls.type}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold text-slate-900 leading-tight">{cls.name}</h3>

                                                <div className="flex items-center gap-2 mt-3 text-sm text-slate-600 font-medium">
                                                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                        <Clock className="h-4 w-4 text-emerald-600" />
                                                        {cls.schedule}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Tombol Aksi */}
                                            <div className="shrink-0 flex flex-col items-end justify-center">
                                                {cls.isTaken ? (
                                                    <div className="flex items-center gap-2 text-rose-600 bg-rose-50 px-4 py-2 rounded-xl border border-rose-100 text-sm font-semibold">
                                                        <AlertCircle className="h-4 w-4" />
                                                        Telah Diambil Dosen Lain
                                                    </div>
                                                ) : isSelected ? (
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => toggleTakeClass(cls.id, cls.sks)}
                                                        className="w-full sm:w-auto text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 rounded-xl"
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Batalkan Pilihan
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={() => toggleTakeClass(cls.id, cls.sks)}
                                                        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md shadow-emerald-500/20"
                                                    >
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Ambil Kelas Ini
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}

                        {filteredClasses.length === 0 && (
                            <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-200 border-dashed">
                                Mata kuliah tidak ditemukan.
                            </div>
                        )}
                    </div>
                </div>

                {/* KOLOM KANAN: Beban Kerja Dosen (Sticky Sidebar) */}
                <div className="lg:col-span-1 space-y-6">

                    {/* Info BKD */}
                    <Card className="rounded-2xl border-blue-200 bg-blue-50 shadow-sm">
                        <CardContent className="p-4 flex items-start gap-3">
                            <GraduationCap className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-semibold text-blue-900">Aturan Beban Kerja Dosen (BKD)</h4>
                                <p className="text-xs text-blue-800 mt-1 leading-relaxed">
                                    Dosen tetap diwajibkan memenuhi beban mengajar minimal 6 SKS dan maksimal 12 SKS per semester (di luar penelitian & pengabdian).
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border-slate-200 shadow-xl shadow-slate-200/50 sticky top-24">
                        <CardHeader className="bg-slate-50 border-b border-slate-100 rounded-t-2xl pb-4">
                            <CardTitle className="text-lg font-bold text-slate-900">Beban Mengajar Anda</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">

                            <div className="p-5 border-b border-slate-100 bg-white">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-semibold text-slate-700">Total SKS Pengajaran</span>
                                    <span className={`text-3xl font-black ${currentSKS > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        {currentSKS} <span className="text-sm font-medium text-slate-500">/ {MAX_TEACHING_SKS} SKS</span>
                                    </span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                                    <div
                                        className={`h-3 rounded-full transition-all duration-500 ${currentSKS >= MAX_TEACHING_SKS ? 'bg-rose-500' : currentSKS >= 6 ? 'bg-emerald-500' : 'bg-amber-400'}`}
                                        style={{ width: `${(currentSKS / MAX_TEACHING_SKS) * 100}%` }}
                                    ></div>
                                </div>
                                {currentSKS > 0 && currentSKS < 6 && (
                                    <p className="text-xs text-amber-600 mt-2 font-medium flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" /> Belum memenuhi standar minimal (6 SKS)
                                    </p>
                                )}
                            </div>

                            <div className="p-2 max-h-[350px] overflow-y-auto">
                                {draftedClasses.length === 0 ? (
                                    <div className="text-center py-8 px-4 text-sm text-slate-500 flex flex-col items-center">
                                        <BookOpen className="h-8 w-8 text-slate-300 mb-2" />
                                        <p>Anda belum memilih kelas untuk diajar.</p>
                                    </div>
                                ) : (
                                    <ul className="space-y-1">
                                        {draftedClasses.map(cls => (
                                            <li key={cls.id} className="flex items-start justify-between p-3 hover:bg-slate-50 rounded-lg group transition-colors">
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">{cls.name}</p>
                                                    <p className="text-xs text-slate-500 mt-1 font-medium">{cls.targetClass} • {cls.sks} SKS</p>
                                                </div>
                                                <button
                                                    onClick={() => toggleTakeClass(cls.id, cls.sks)}
                                                    className="text-slate-400 hover:text-rose-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </CardContent>

                        <CardFooter className="p-5 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
                            <Button
                                className={`w-full rounded-xl py-6 text-md font-semibold ${currentSKS < 6 ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg'}`}
                                disabled={currentSKS < 6}
                                onClick={() => alert("Kesediaan mengajar berhasil diajukan ke Kaprodi!")}
                            >
                                {currentSKS < 6 ? "Pilih Minimal 6 SKS" : "Ajukan Kesediaan Mengajar"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

            </div>
        </div>
    );
}