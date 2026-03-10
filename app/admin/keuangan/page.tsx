"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search, Plus, Filter, Download, Wallet,
    CreditCard, AlertCircle, CheckCircle2,
    MoreHorizontal, Receipt, FileSpreadsheet, TrendingUp
} from "lucide-react";

// Helper Format Rupiah
const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(angka);
};

// Dummy Data Tagihan Mahasiswa
const billingData = [
    { id: "INV-2026-001", nim: "20230001", name: "Ahmad Riyadi", semester: "Genap 2025/2026", amount: 4500000, status: "Lunas", paidDate: "10 Feb 2026" },
    { id: "INV-2026-002", nim: "20230045", name: "Siti Nurhaliza", semester: "Genap 2025/2026", amount: 4500000, status: "Lunas", paidDate: "15 Feb 2026" },
    { id: "INV-2026-003", nim: "20220102", name: "Budi Santoso", semester: "Genap 2025/2026", amount: 4500000, status: "Belum Bayar", paidDate: "-" },
    { id: "INV-2026-004", nim: "20210088", name: "Citra Kirana", semester: "Genap 2025/2026", amount: 4000000, status: "Menunggak", paidDate: "-" }, // Beda nominal, misal beasiswa parsial
    { id: "INV-2026-005", nim: "20240012", name: "Eko Prasetyo", semester: "Genap 2025/2026", amount: 4500000, status: "Lunas", paidDate: "05 Mar 2026" },
];

export default function KeuanganAdminPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("Semua");

    // Filter Data
    const filteredBills = billingData.filter(bill => {
        const matchesSearch = bill.name.toLowerCase().includes(searchQuery.toLowerCase()) || bill.nim.includes(searchQuery) || bill.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "Semua" || bill.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Helper Warna Status
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Lunas": return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "Belum Bayar": return "bg-amber-100 text-amber-700 border-amber-200";
            case "Menunggak": return "bg-rose-100 text-rose-700 border-rose-200";
            default: return "bg-slate-100 text-slate-700 border-slate-200";
        }
    };

    const handleGenerateTagihan = () => {
        alert("Simulasi: Meng-generate tagihan UKT Semester Genap 2025/2026 untuk 4.250 mahasiswa aktif secara massal.");
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8">

            {/* Header Halaman */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <Wallet className="h-8 w-8 text-blue-600" />
                        Keuangan & Tagihan
                    </h2>
                    <p className="text-slate-600 mt-1">Kelola tagihan UKT, pantau pembayaran, dan rekonsiliasi keuangan.</p>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50 rounded-xl shadow-sm">
                        <FileSpreadsheet className="h-4 w-4 mr-2 text-emerald-600" />
                        Export Laporan
                    </Button>
                    <Button onClick={handleGenerateTagihan} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/20">
                        <Plus className="h-4 w-4 mr-2" />
                        Generate Tagihan Massal
                    </Button>
                </div>
            </div>

            {/* Statistik Keuangan (Top Cards) */}
            <div className="grid gap-4 sm:grid-cols-3">
                <Card className="rounded-2xl border-slate-200 shadow-sm bg-white">
                    <CardContent className="p-5 flex items-start gap-4">
                        <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600 shrink-0">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-500 mb-1">Total Pendapatan (Lunas)</p>
                            <h4 className="text-2xl font-black text-slate-900 tracking-tight">{formatRupiah(13500000000)}</h4>
                            <p className="text-xs text-emerald-600 font-medium mt-1">3,000 Mahasiswa</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-slate-200 shadow-sm bg-white">
                    <CardContent className="p-5 flex items-start gap-4">
                        <div className="bg-amber-100 p-3 rounded-xl text-amber-600 shrink-0">
                            <CreditCard className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-500 mb-1">Menunggu Pembayaran</p>
                            <h4 className="text-2xl font-black text-slate-900 tracking-tight">{formatRupiah(4500000000)}</h4>
                            <p className="text-xs text-amber-600 font-medium mt-1">1,000 Mahasiswa</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-rose-200 shadow-sm bg-rose-50">
                    <CardContent className="p-5 flex items-start gap-4">
                        <div className="bg-rose-100 p-3 rounded-xl text-rose-600 shrink-0">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-rose-700 mb-1">Tagihan Menunggak (Overdue)</p>
                            <h4 className="text-2xl font-black text-rose-900 tracking-tight">{formatRupiah(1125000000)}</h4>
                            <p className="text-xs text-rose-600 font-bold mt-1">250 Mahasiswa terkunci KRS-nya</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Data Table Card */}
            <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden bg-white">

                {/* Toolbar: Search & Filter Tabs */}
                <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">

                    <div className="relative flex-1 sm:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Cari Invoice, NIM, atau Nama Mahasiswa..."
                            className="pl-9 py-2 rounded-lg border-slate-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
                        {["Semua", "Lunas", "Belum Bayar", "Menunggak"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${statusFilter === status
                                        ? "bg-slate-800 text-white shadow-sm"
                                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                        <Button variant="outline" className="ml-2 h-9 px-3 rounded-lg border-slate-200 text-slate-600 bg-white">
                            <Filter className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Filter Lanjut</span>
                        </Button>
                    </div>
                </div>

                {/* Tabel Tagihan */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-5 py-4 font-bold text-slate-700">No. Invoice</th>
                                <th className="px-5 py-4 font-bold text-slate-700">Mahasiswa</th>
                                <th className="px-5 py-4 font-bold text-slate-700">Periode Tagihan</th>
                                <th className="px-5 py-4 font-bold text-slate-700 text-right">Nominal (Rp)</th>
                                <th className="px-5 py-4 font-bold text-slate-700 text-center">Status</th>
                                <th className="px-5 py-4 font-bold text-slate-700 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {filteredBills.map((bill) => {
                                const isLunas = bill.status === "Lunas";
                                const isNunggak = bill.status === "Menunggak";

                                return (
                                    <tr key={bill.id} className={`transition-colors hover:bg-slate-50 ${isNunggak ? 'bg-rose-50/30' : ''}`}>
                                        <td className="px-5 py-4">
                                            <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-200">{bill.id}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <p className="font-bold text-slate-900">{bill.name}</p>
                                            <p className="text-xs text-slate-500 font-mono mt-0.5">{bill.nim}</p>
                                        </td>
                                        <td className="px-5 py-4 text-slate-600 font-medium">
                                            {bill.semester}
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <p className={`font-bold ${isNunggak ? 'text-rose-700' : 'text-slate-900'}`}>{formatRupiah(bill.amount)}</p>
                                            {isLunas && <p className="text-[10px] text-emerald-600 font-medium mt-0.5">Dibayar: {bill.paidDate}</p>}
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(bill.status)}`}>
                                                {isLunas && <CheckCircle2 className="h-3 w-3" />}
                                                {!isLunas && <AlertCircle className="h-3 w-3" />}
                                                {bill.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                {/* Aksi Berdasarkan Status */}
                                                {isLunas ? (
                                                    <Button variant="outline" size="sm" className="h-8 border-emerald-200 text-emerald-700 hover:bg-emerald-50" title="Cetak Kwitansi">
                                                        <Receipt className="h-4 w-4 mr-1.5" /> Kwitansi
                                                    </Button>
                                                ) : (
                                                    <Button variant="outline" size="sm" className="h-8 border-slate-200 text-slate-700 hover:bg-slate-100" title="Kirim Pengingat Tagihan">
                                                        <AlertCircle className="h-4 w-4 mr-1.5" /> Ingatkan
                                                    </Button>
                                                )}

                                                <div className="h-4 w-px bg-slate-200 mx-1"></div>

                                                <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors" title="Detail & Log Pembayaran">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {filteredBills.length === 0 && (
                        <div className="p-12 text-center flex flex-col items-center justify-center">
                            <Search className="h-10 w-10 text-slate-300 mb-3" />
                            <p className="text-slate-500 font-medium">Tagihan tidak ditemukan.</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}