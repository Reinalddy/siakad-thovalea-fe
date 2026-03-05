"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Trash2, MapPin, Clock, Info, CheckCircle2, AlertCircle } from "lucide-react";

// Dummy Data Mata Kuliah (Disesuaikan dengan background IT)
const availableCourses = [
    { id: 1, code: "TI-301", name: "Pemrograman Web Lanjut", sks: 3, lecturer: "Dr. Budi Santoso", day: "Senin", time: "08:00 - 10:30", room: "Lab Komputer A", quota: 40, filled: 38 },
    { id: 2, code: "TI-302", name: "Rekayasa Perangkat Lunak", sks: 3, lecturer: "Siti Aminah, M.Kom", day: "Selasa", time: "10:00 - 12:30", room: "Gedung B, R.401", quota: 40, filled: 40 }, // Penuh
    { id: 3, code: "TI-303", name: "Kecerdasan Buatan (AI)", sks: 3, lecturer: "Prof. Dr. Hendra", day: "Rabu", time: "13:00 - 15:30", room: "Gedung A, R.202", quota: 35, filled: 15 },
    { id: 4, code: "TI-304", name: "Manajemen Server & Linux", sks: 2, lecturer: "Ahmad Riyadi, M.T.", day: "Kamis", time: "08:00 - 09:40", room: "Lab Jaringan", quota: 30, filled: 12 },
    { id: 5, code: "TI-305", name: "Arsitektur Database", sks: 3, lecturer: "Dr. Budi Santoso", day: "Jumat", time: "09:00 - 11:30", room: "Lab Komputer B", quota: 40, filled: 25 },
];

export default function KrsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

    const MAX_SKS = 24;

    // Fitur Filter Pencarian
    const filteredCourses = availableCourses.filter(course =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Ambil data mata kuliah yang dipilih untuk di keranjang
    const draftedCourses = availableCourses.filter(c => selectedCourses.includes(c.id));
    const currentSKS = draftedCourses.reduce((total, course) => total + course.sks, 0);

    // Handle Tambah/Hapus dari Keranjang
    const toggleCourse = (courseId: number, courseSks: number) => {
        if (selectedCourses.includes(courseId)) {
            setSelectedCourses(selectedCourses.filter(id => id !== courseId));
        } else {
            if (currentSKS + courseSks > MAX_SKS) {
                alert("Maaf, SKS melebihi batas maksimal!");
                return;
            }
            setSelectedCourses([...selectedCourses, courseId]);
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">

            {/* Header Halaman */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Pengisian Kartu Rencana Studi (KRS)</h2>
                <p className="text-slate-600 mt-1">Pilih mata kuliah untuk Semester Genap 2025/2026.</p>
            </div>

            {/* Grid Layout: Kiri (Daftar Matkul), Kanan (Keranjang) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* KOLOM KIRI: Daftar Mata Kuliah (Makan 2 Kolom) */}
                <div className="lg:col-span-2 space-y-4">

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input
                            placeholder="Cari nama mata kuliah atau kode..."
                            className="pl-10 py-6 text-md rounded-xl border-slate-200 bg-white shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* List Card Mata Kuliah */}
                    <div className="space-y-4">
                        {filteredCourses.map((course) => {
                            const isSelected = selectedCourses.includes(course.id);
                            const isFull = course.filled >= course.quota;

                            return (
                                <Card key={course.id} className={`rounded-2xl border transition-all ${isSelected ? "border-emerald-500 bg-emerald-50/30 shadow-md" : "border-slate-200 hover:border-emerald-300"}`}>
                                    <CardContent className="p-5">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">{course.code}</span>
                                                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">{course.sks} SKS</span>
                                                    {isFull && !isSelected && (
                                                        <span className="px-2.5 py-0.5 rounded-md bg-red-100 text-red-800 text-xs font-bold border border-red-200">Kelas Penuh</span>
                                                    )}
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-900 leading-tight">{course.name}</h3>
                                                <p className="text-sm text-slate-500 mt-1">{course.lecturer}</p>

                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-slate-600">
                                                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                                        <Clock className="h-4 w-4 text-emerald-600" />
                                                        <span>{course.day}, {course.time}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                                        <MapPin className="h-4 w-4 text-emerald-600" />
                                                        <span>{course.room}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <div className="shrink-0">
                                                {isSelected ? (
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => toggleCourse(course.id, course.sks)}
                                                        className="w-full sm:w-auto text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Batal Ambil
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={() => toggleCourse(course.id, course.sks)}
                                                        disabled={isFull}
                                                        className={`w-full sm:w-auto ${isFull ? "bg-slate-300 text-slate-500" : "bg-emerald-600 hover:bg-emerald-700 text-white"}`}
                                                    >
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        {isFull ? "Penuh" : "Ambil Kelas"}
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}

                        {filteredCourses.length === 0 && (
                            <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-200 border-dashed">
                                Mata kuliah tidak ditemukan.
                            </div>
                        )}
                    </div>
                </div>

                {/* KOLOM KANAN: Keranjang Draft KRS (Sticky Sidebar) */}
                <div className="lg:col-span-1">
                    <Card className="rounded-2xl border-slate-200 shadow-xl shadow-slate-200/50 sticky top-24">
                        <CardHeader className="bg-slate-50 border-b border-slate-100 rounded-t-2xl pb-4">
                            <CardTitle className="text-lg font-bold text-slate-900">Draft KRS Anda</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">

                            {/* Progress Bar SKS */}
                            <div className="p-5 border-b border-slate-100 bg-white">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-semibold text-slate-700">Total SKS Terpilih</span>
                                    <span className="text-2xl font-black text-emerald-600">{currentSKS} <span className="text-sm font-medium text-slate-500">/ {MAX_SKS} SKS</span></span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className={`h-2.5 rounded-full transition-all duration-500 ${currentSKS === MAX_SKS ? 'bg-red-500' : 'bg-emerald-500'}`}
                                        style={{ width: `${(currentSKS / MAX_SKS) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* List Keranjang */}
                            <div className="p-2 max-h-[350px] overflow-y-auto">
                                {draftedCourses.length === 0 ? (
                                    <div className="text-center py-8 px-4 text-sm text-slate-500 flex flex-col items-center">
                                        <Info className="h-8 w-8 text-slate-300 mb-2" />
                                        <p>Belum ada mata kuliah yang dipilih.</p>
                                    </div>
                                ) : (
                                    <ul className="space-y-1">
                                        {draftedCourses.map(course => (
                                            <li key={course.id} className="flex items-start justify-between p-3 hover:bg-slate-50 rounded-lg group transition-colors">
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800 line-clamp-1">{course.name}</p>
                                                    <p className="text-xs text-slate-500 mt-0.5">{course.day}, {course.time} • {course.sks} SKS</p>
                                                </div>
                                                <button
                                                    onClick={() => toggleCourse(course.id, course.sks)}
                                                    className="text-slate-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </CardContent>

                        {/* Tombol Aksi */}
                        <CardFooter className="p-5 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
                            <Button
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-6 text-md font-semibold"
                                disabled={draftedCourses.length === 0}
                                onClick={() => alert("Simulasi: KRS Berhasil Diajukan ke Dosen PA!")}
                            >
                                {draftedCourses.length === 0 ? "Pilih Matkul Dulu" : "Ajukan KRS Sekarang"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

            </div>
        </div>
    );
}