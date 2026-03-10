"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search, Plus, Filter, Download, Upload,
    MoreHorizontal, Edit, Trash2, CheckSquare,
    ChevronLeft, ChevronRight, Users, BookOpen, GraduationCap
} from "lucide-react";

// Dummy Data Mahasiswa
const studentsData = [
    { id: "20230001", nim: "20230001", name: "Ahmad Riyadi", prodi: "Teknik Informatika", angkatan: "2023", status: "Aktif" },
    { id: "20230045", nim: "20230045", name: "Siti Nurhaliza", prodi: "Sistem Informasi", angkatan: "2023", status: "Aktif" },
    { id: "20220102", nim: "20220102", name: "Budi Santoso", prodi: "Teknik Informatika", angkatan: "2022", status: "Cuti" },
    { id: "20210088", nim: "20210088", name: "Citra Kirana", prodi: "Teknik Komputer", angkatan: "2021", status: "Lulus" },
    { id: "20240012", nim: "20240012", name: "Eko Prasetyo", prodi: "Sistem Informasi", angkatan: "2024", status: "Aktif" },
];

export default function MasterDataPage() {
    const [activeTab, setActiveTab] = useState("mahasiswa"); // mahasiswa | dosen | matkul
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    // Filter Data
    const filteredData = studentsData.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nim.includes(searchQuery)
    );

    // Toggle Checkbox untuk Bulk Action
    const toggleRow = (id: string) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const toggleAll = () => {
        if (selectedRows.length === filteredData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(filteredData.map(s => s.id));
        }
    };

    // Helper untuk warna Status
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Aktif": return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "Cuti": return "bg-amber-100 text-amber-700 border-amber-200";
            case "Lulus": return "bg-blue-100 text-blue-700 border-blue-200";
            default: return "bg-slate-100 text-slate-700 border-slate-200";
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8">

            {/* Header & Aksi Global */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Master Data Global</h2>
                    <p className="text-slate-600 mt-1">Kelola data sivitas akademika dan infrastruktur kampus.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Button variant="outline" className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50 rounded-xl shadow-sm">
                        <Upload className="h-4 w-4 mr-2 text-blue-600" />
                        Import CSV
                    </Button>
                    <Button variant="outline" className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50 rounded-xl shadow-sm">
                        <Download className="h-4 w-4 mr-2 text-emerald-600" />
                        Export
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/20">
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Data
                    </Button>
                </div>
            </div>

            {/* Tabs Navigasi */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button
                    onClick={() => setActiveTab("mahasiswa")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${activeTab === "mahasiswa" ? "bg-slate-900 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                        }`}
                >
                    <Users className="h-4 w-4" /> Mahasiswa
                </button>
                <button
                    onClick={() => setActiveTab("dosen")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${activeTab === "dosen" ? "bg-slate-900 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                        }`}
                >
                    <GraduationCap className="h-4 w-4" /> Dosen
                </button>
                <button
                    onClick={() => setActiveTab("matkul")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${activeTab === "matkul" ? "bg-slate-900 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                        }`}
                >
                    <BookOpen className="h-4 w-4" /> Mata Kuliah
                </button>
            </div>

            {/* Main Data Table Card */}
            <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden bg-white">

                {/* Toolbar: Search, Filter & Bulk Actions */}
                <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Cari NIM atau Nama..."
                                className="pl-9 py-2 rounded-lg border-slate-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" className="h-10 px-3 rounded-lg border-slate-200 text-slate-600 bg-white">
                            <Filter className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Filter</span>
                        </Button>
                    </div>

                    {/* Muncul hanya jika ada baris yang di-ceklis */}
                    {selectedRows.length > 0 && (
                        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4">
                            <span className="text-sm font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100">
                                {selectedRows.length} Terpilih
                            </span>
                            <Button variant="outline" size="sm" className="h-9 border-slate-200 text-slate-700 hover:bg-slate-100">
                                Ubah Status
                            </Button>
                            <Button variant="destructive" size="sm" className="h-9 shadow-sm">
                                <Trash2 className="h-4 w-4 mr-2" /> Hapus
                            </Button>
                        </div>
                    )}
                </div>

                {/* The Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="text-xs text-slate-500 uppercase bg-white border-b border-slate-200">
                            <tr>
                                <th className="px-5 py-4 w-12 text-center">
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                            checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                                            onChange={toggleAll}
                                        />
                                    </div>
                                </th>
                                <th className="px-5 py-4 font-bold text-slate-700">NIM</th>
                                <th className="px-5 py-4 font-bold text-slate-700 min-w-[200px]">Nama Lengkap</th>
                                <th className="px-5 py-4 font-bold text-slate-700">Program Studi</th>
                                <th className="px-5 py-4 font-bold text-slate-700 text-center">Angkatan</th>
                                <th className="px-5 py-4 font-bold text-slate-700 text-center">Status</th>
                                <th className="px-5 py-4 font-bold text-slate-700 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {filteredData.map((student) => {
                                const isSelected = selectedRows.includes(student.id);
                                return (
                                    <tr
                                        key={student.id}
                                        className={`transition-colors hover:bg-slate-50 group ${isSelected ? 'bg-blue-50/50' : ''}`}
                                    >
                                        <td className="px-5 py-3 text-center">
                                            <div className="flex items-center justify-center">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                    checked={isSelected}
                                                    onChange={() => toggleRow(student.id)}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 font-mono text-xs font-semibold text-slate-600">{student.nim}</td>
                                        <td className="px-5 py-3 font-bold text-slate-900">{student.name}</td>
                                        <td className="px-5 py-3 text-slate-600">{student.prodi}</td>
                                        <td className="px-5 py-3 text-center text-slate-600 font-medium">{student.angkatan}</td>
                                        <td className="px-5 py-3 text-center">
                                            <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusColor(student.status)}`}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                            <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit Data">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors" title="Detail Lainnya">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {filteredData.length === 0 && (
                        <div className="p-12 text-center flex flex-col items-center justify-center">
                            <Search className="h-10 w-10 text-slate-300 mb-3" />
                            <p className="text-slate-500 font-medium">Data tidak ditemukan.</p>
                        </div>
                    )}
                </div>

                {/* Pagination Footer */}
                <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30">
                    <p className="text-sm text-slate-500">
                        Menampilkan <span className="font-bold text-slate-900">1</span> sampai <span className="font-bold text-slate-900">{filteredData.length}</span> dari <span className="font-bold text-slate-900">1,245</span> entri
                    </p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-slate-200 text-slate-500" disabled>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-blue-500 bg-blue-50 text-blue-700 font-bold">
                            1
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-slate-200 text-slate-600 hover:bg-slate-100 font-medium">
                            2
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-slate-200 text-slate-600 hover:bg-slate-100 font-medium">
                            3
                        </Button>
                        <span className="text-slate-400 mx-1">...</span>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-slate-200 text-slate-500 hover:bg-slate-100">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Card>

        </div>
    );
}