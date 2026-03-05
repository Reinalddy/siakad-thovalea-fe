"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search, CheckCircle2, XCircle, AlertTriangle,
    ChevronDown, ChevronUp, UserCheck, FileText, CheckSquare
} from "lucide-react";

// Dummy Data Mahasiswa Bimbingan yang Mengajukan KRS
const initialStudents = [
    {
        id: "20230001", name: "Ahmad Riyadi", ipk: 3.85, maxSks: 24, requestedSks: 21, status: "Menunggu",
        courses: [
            { code: "TI-401", name: "Pemrograman Web Lanjut", sks: 3 },
            { code: "TI-402", name: "Rekayasa Perangkat Lunak", sks: 3 },
            { code: "TI-405", name: "Cloud Computing", sks: 3 },
            { code: "TI-406", name: "Kecerdasan Buatan (AI)", sks: 3 },
            { code: "MKU-105", name: "Pendidikan Kewarganegaraan", sks: 2 },
        ]
    },
    {
        id: "20230045", name: "Siti Nurhaliza", ipk: 2.75, maxSks: 20, requestedSks: 24, status: "Menunggu", // Kasus: SKS melebihi batas karena IPK turun
        courses: [
            { code: "TI-401", name: "Pemrograman Web Lanjut", sks: 3 },
            { code: "TI-402", name: "Rekayasa Perangkat Lunak", sks: 3 },
            { code: "TI-403", name: "Sistem Basis Data 2", sks: 3 },
            { code: "TI-408", name: "Etika Profesi IT", sks: 2 },
            { code: "TI-201", name: "Struktur Data (Mengulang)", sks: 3 },
            { code: "TI-205", name: "Jaringan Komputer (Mengulang)", sks: 3 },
        ]
    },
    {
        id: "20230088", name: "Budi Santoso", ipk: 3.50, maxSks: 24, requestedSks: 18, status: "Disetujui",
        courses: [
            { code: "TI-401", name: "Pemrograman Web Lanjut", sks: 3 },
            { code: "TI-402", name: "Rekayasa Perangkat Lunak", sks: 3 },
        ]
    },
];

export default function PersetujuanKrsPage() {
    const [students, setStudents] = useState(initialStudents);
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Filter pencarian
    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.includes(searchQuery)
    );

    const pendingCount = students.filter(s => s.status === "Menunggu").length;

    // Fungsi Aksi
    const handleApprove = (id: string) => {
        setStudents(students.map(s => s.id === id ? { ...s, status: "Disetujui" } : s));
        setExpandedId(null);
    };

    const handleReject = (id: string) => {
        setStudents(students.map(s => s.id === id ? { ...s, status: "Ditolak" } : s));
        setExpandedId(null);
    };

    const handleApproveAll = () => {
        if (confirm("Apakah Anda yakin ingin menyetujui semua KRS yang berstatus Menunggu?")) {
            setStudents(students.map(s => s.status === "Menunggu" ? { ...s, status: "Disetujui" } : s));
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8">

            {/* Header Halaman */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <CheckSquare className="h-8 w-8 text-emerald-600" />
                        Persetujuan KRS Mahasiswa
                    </h2>
                    <p className="text-slate-600 mt-1">Tinjau dan setujui Kartu Rencana Studi mahasiswa bimbingan Anda.</p>
                </div>

                {/* Tombol Sakti: Approve All */}
                <Button
                    onClick={handleApproveAll}
                    disabled={pendingCount === 0}
                    className={`rounded-xl px-6 shadow-md transition-all ${pendingCount > 0 ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-slate-200 text-slate-500 cursor-not-allowed'}`}
                >
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    Setujui Semua ({pendingCount})
                </Button>
            </div>

            {/* Banner Peringatan jika ada yang pending */}
            {pendingCount > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start sm:items-center gap-4 shadow-sm">
                    <div className="bg-amber-100 p-2 rounded-full text-amber-600 shrink-0">
                        <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-semibold text-amber-800">Menunggu Tindakan Anda</h4>
                        <p className="text-sm text-amber-700 mt-0.5">Terdapat <b>{pendingCount} mahasiswa</b> yang menunggu persetujuan KRS. Harap segera ditinjau agar mereka dapat mengikuti perkuliahan.</p>
                    </div>
                </div>
            )}

            {/* Search & Filter Bar */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                        placeholder="Cari nama atau NIM mahasiswa..."
                        className="pl-10 py-5 rounded-xl border-slate-200 bg-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400"></span> Menunggu
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 ml-3"></span> Disetujui
                    <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 ml-3"></span> Ditolak
                </div>
            </div>

            {/* Daftar Mahasiswa */}
            <div className="space-y-4">
                {filteredStudents.map((student) => {
                    const isPending = student.status === "Menunggu";
                    const isApproved = student.status === "Disetujui";
                    const isRejected = student.status === "Ditolak";
                    const isExpanded = expandedId === student.id;

                    // Logic Warning: Jika SKS yang diminta melebihi jatah IPK
                    const isSksWarning = student.requestedSks > student.maxSks;

                    return (
                        <Card key={student.id} className={`rounded-2xl border-2 transition-all overflow-hidden ${isExpanded ? "border-slate-300 shadow-lg" : "border-slate-200 shadow-sm hover:border-slate-300"
                            }`}>
                            {/* Header List (Selalu Tampil) */}
                            <div
                                className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-colors ${isExpanded ? "bg-slate-50/80" : "bg-white hover:bg-slate-50"
                                    }`}
                                onClick={() => toggleExpand(student.id)}
                            >
                                <div className="flex items-start sm:items-center gap-4">
                                    <div className={`p-3 rounded-full shrink-0 ${isPending ? "bg-amber-100 text-amber-600" :
                                        isApproved ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                                        }`}>
                                        {isPending ? <UserCheck className="h-6 w-6" /> :
                                            isApproved ? <CheckCircle2 className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                            {student.name}
                                            {isSksWarning && <AlertTriangle className="h-4 w-4 text-rose-500" aria-label="Melebihi jatah SKS" />}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-slate-500">
                                            <span className="font-mono font-medium">{student.id}</span>
                                            <span>•</span>
                                            <span>IPK Lanjut: <strong className="text-slate-700">{student.ipk.toFixed(2)}</strong></span>
                                            <span>•</span>
                                            <span className={`${isSksWarning ? 'text-rose-600 font-bold' : 'text-slate-700 font-medium'}`}>
                                                {student.requestedSks} / {student.maxSks} SKS
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${isPending ? "bg-amber-50 text-amber-700 border-amber-200" :
                                        isApproved ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"
                                        }`}>
                                        {student.status}
                                    </span>
                                    <div className="p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors">
                                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                    </div>
                                </div>
                            </div>

                            {/* Area Detail (Muncul saat di-expand) */}
                            {isExpanded && (
                                <div className="border-t border-slate-200 bg-white">

                                    {isSksWarning && (
                                        <div className="bg-rose-50 px-6 py-3 border-b border-rose-100 flex items-center gap-2 text-sm text-rose-700 font-medium">
                                            <AlertTriangle className="h-4 w-4" />
                                            Perhatian: Mahasiswa mengambil SKS melebihi batas maksimal yang diizinkan berdasarkan IPK terakhir!
                                        </div>
                                    )}

                                    <div className="p-6">
                                        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-emerald-600" />
                                            Rincian Mata Kuliah yang Diambil
                                        </h4>

                                        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                                            <table className="w-full text-sm text-left">
                                                <thead className="bg-slate-100 text-slate-600 font-medium border-b border-slate-200">
                                                    <tr>
                                                        <th className="px-4 py-2 w-20">Kode</th>
                                                        <th className="px-4 py-2">Mata Kuliah</th>
                                                        <th className="px-4 py-2 text-center w-20">SKS</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {student.courses.map((course, idx) => (
                                                        <tr key={idx} className="hover:bg-white">
                                                            <td className="px-4 py-2.5 font-mono text-xs text-slate-500">{course.code}</td>
                                                            <td className="px-4 py-2.5 font-medium text-slate-800">{course.name}</td>
                                                            <td className="px-4 py-2.5 text-center font-bold text-slate-700">{course.sks}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot className="bg-slate-100 border-t border-slate-200 font-bold">
                                                    <tr>
                                                        <td colSpan={2} className="px-4 py-2 text-right text-slate-700">Total SKS Diajukan:</td>
                                                        <td className={`px-4 py-2 text-center ${isSksWarning ? 'text-rose-600' : 'text-emerald-700'}`}>
                                                            {student.requestedSks}
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Tombol Aksi di dalam Expand (Hanya muncul jika status Menunggu) */}
                                    {isPending && (
                                        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end gap-3 rounded-b-xl">
                                            <Button
                                                variant="outline"
                                                onClick={() => handleReject(student.id)}
                                                className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300"
                                            >
                                                <XCircle className="h-4 w-4 mr-2" />
                                                Tolak KRS
                                            </Button>
                                            <Button
                                                onClick={() => handleApprove(student.id)}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20"
                                            >
                                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                                Setujui KRS Mahasiswa Ini
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Card>
                    );
                })}

                {filteredStudents.length === 0 && (
                    <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-200 border-dashed">
                        <Search className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                        <p>Tidak ada data mahasiswa yang cocok dengan pencarian.</p>
                    </div>
                )}
            </div>

        </div>
    );
}