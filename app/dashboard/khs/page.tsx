"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Download, Calculator, Award, TrendingUp, ChevronDown } from "lucide-react";

// Dummy Data Nilai Mahasiswa
const khsData = [
    { id: 1, code: "TI-201", name: "Struktur Data & Algoritma", sks: 3, grade: "A", weight: 4.0 },
    { id: 2, code: "TI-202", name: "Sistem Operasi", sks: 3, grade: "B+", weight: 3.5 },
    { id: 3, code: "TI-203", name: "Pemrograman Berorientasi Objek", sks: 3, grade: "A-", weight: 3.75 },
    { id: 4, code: "MKU-105", name: "Pendidikan Kewarganegaraan", sks: 2, grade: "A", weight: 4.0 },
    { id: 5, code: "TI-204", name: "Aljabar Linear", sks: 3, grade: "B", weight: 3.0 },
    { id: 6, code: "TI-205", name: "Desain Jaringan Komputer", sks: 3, grade: "C+", weight: 2.5 }, // Perlu perhatian
];

export default function KhsPage() {
    const [selectedSemester, setSelectedSemester] = useState("20251");

    // Kalkulasi Otomatis (UX: Mahasiswa tidak perlu menghitung manual)
    const totalSKS = khsData.reduce((acc, curr) => acc + curr.sks, 0);
    const totalMutu = khsData.reduce((acc, curr) => acc + (curr.sks * curr.weight), 0);
    const ips = (totalMutu / totalSKS).toFixed(2);

    // Helper untuk warna badge nilai
    const getGradeColor = (grade: string) => {
        if (grade.startsWith("A")) return "bg-emerald-100 text-emerald-800 border-emerald-200";
        if (grade.startsWith("B")) return "bg-blue-100 text-blue-800 border-blue-200";
        if (grade.startsWith("C")) return "bg-amber-100 text-amber-800 border-amber-200";
        return "bg-red-100 text-red-800 border-red-200"; // D & E
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">

            {/* Header & Aksi */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Kartu Hasil Studi (KHS)</h2>
                    <p className="text-slate-600 mt-1">Rekapitulasi nilai dan indeks prestasi mahasiswa.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50 rounded-xl">
                        <Download className="h-4 w-4 mr-2" />
                        Unduh Transkrip
                    </Button>
                    <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-md">
                        <Printer className="h-4 w-4 mr-2" />
                        Cetak KHS
                    </Button>
                </div>
            </div>

            {/* Filter Semester (Native select styled with Tailwind) */}
            <Card className="rounded-2xl border-slate-200 shadow-sm bg-white overflow-hidden">
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/50 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                            <Calculator className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">Pilih Periode Akademik</p>
                            <p className="text-xs text-slate-500">Menampilkan nilai untuk semester yang dipilih</p>
                        </div>
                    </div>
                    <div className="relative w-full sm:w-64">
                        <select
                            value={selectedSemester}
                            onChange={(e) => setSelectedSemester(e.target.value)}
                            className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                        >
                            <option value="20251">Semester Ganjil 2024/2025</option>
                            <option value="20242">Semester Genap 2023/2024</option>
                            <option value="20241">Semester Ganjil 2023/2024</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                    </div>
                </div>

                {/* Ringkasan IPK & IPS */}
                <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 bg-white">
                    <div className="p-6 text-center">
                        <p className="text-sm font-medium text-slate-500 mb-1">Total SKS Semester</p>
                        <p className="text-3xl font-bold text-slate-900">{totalSKS}</p>
                    </div>
                    <div className="p-6 text-center">
                        <p className="text-sm font-medium text-slate-500 mb-1 flex items-center justify-center gap-1.5">
                            IPS Semester Ini
                            <TrendingUp className="h-4 w-4 text-emerald-500" />
                        </p>
                        <p className="text-3xl font-black text-emerald-600">{ips}</p>
                    </div>
                    <div className="p-6 text-center">
                        <p className="text-sm font-medium text-slate-500 mb-1">Total SKS Kumulatif</p>
                        <p className="text-3xl font-bold text-slate-900">114</p>
                    </div>
                    <div className="p-6 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-2 -mr-2 opacity-10">
                            <Award className="h-24 w-24 text-emerald-500" />
                        </div>
                        <p className="text-sm font-medium text-slate-500 mb-1">IPK Saat Ini</p>
                        <p className="text-3xl font-black text-slate-900">3.85</p>
                        <p className="text-xs text-slate-500 mt-1 font-medium">Predikat: Pujian (Cum Laude)</p>
                    </div>
                </div>
            </Card>

            {/* Tabel Detail Nilai */}
            <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-100 px-6 py-5">
                    <CardTitle className="text-lg font-bold text-slate-900">Rincian Mata Kuliah</CardTitle>
                </CardHeader>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-semibold w-16 text-center">No</th>
                                <th scope="col" className="px-6 py-4 font-semibold">Kode MK</th>
                                <th scope="col" className="px-6 py-4 font-semibold min-w-[250px]">Mata Kuliah</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-center">SKS (K)</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-center">Nilai (H)</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-center">Bobot (B)</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-center">Mutu (K × B)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {khsData.map((item, index) => {
                                const mutu = item.sks * item.weight;
                                return (
                                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 text-center text-slate-500">{index + 1}</td>
                                        <td className="px-6 py-4 font-mono text-xs text-slate-600">{item.code}</td>
                                        <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                                        <td className="px-6 py-4 text-center font-medium text-slate-700">{item.sks}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-xs font-bold border ${getGradeColor(item.grade)}`}>
                                                {item.grade}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center text-slate-600">{item.weight.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-center font-semibold text-slate-900">{mutu.toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        {/* Footer Tabel untuk Total */}
                        <tfoot className="bg-slate-50 font-semibold text-slate-900 border-t border-slate-200">
                            <tr>
                                <td colSpan={3} className="px-6 py-4 text-right">Jumlah Total:</td>
                                <td className="px-6 py-4 text-center text-emerald-700">{totalSKS}</td>
                                <td colSpan={2}></td>
                                <td className="px-6 py-4 text-center text-emerald-700">{totalMutu.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </Card>

            {/* Catatan / Keterangan */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-sm text-slate-600">
                <p className="font-semibold text-slate-800 mb-1">Keterangan Perhitungan:</p>
                <p>Indeks Prestasi Semester (IPS) dihitung dengan rumus: <span className="font-mono text-slate-800 bg-white px-1.5 py-0.5 rounded border border-slate-200">Total Mutu / Total SKS</span>.</p>
                <p className="mt-1">Jika terdapat perbedaan data nilai, harap segera menghubungi Dosen Pengampu atau Biro Administrasi Akademik (BAA) paling lambat 2 minggu setelah KHS diterbitkan.</p>
            </div>

        </div>
    );
}