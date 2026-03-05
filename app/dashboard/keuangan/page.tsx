"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    CreditCard, Wallet, AlertCircle, CheckCircle2,
    Clock, Download, FileText, ChevronRight, Building2
} from "lucide-react";

// Helper Format Rupiah
const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(angka);
};

// Dummy Data Tagihan Aktif
const activeBill = {
    id: "INV-2026-001",
    semester: "Genap 2025/2026",
    amount: 4500000,
    dueDate: "10 Maret 2026",
    status: "UNPAID", // UNPAID | PAID | OVERDUE
};

// Dummy Data Riwayat Pembayaran
const paymentHistory = [
    { id: "INV-2025-002", semester: "Ganjil 2025/2026", amount: 4500000, date: "15 Agustus 2025", status: "PAID", method: "Virtual Account BCA" },
    { id: "INV-2025-001", semester: "Genap 2024/2025", amount: 4500000, date: "10 Februari 2025", status: "PAID", method: "QRIS" },
    { id: "INV-2024-002", semester: "Ganjil 2024/2025", amount: 4500000, date: "20 Agustus 2024", status: "PAID", method: "Virtual Account Mandiri" },
];

export default function KeuanganPage() {
    const handlePayment = () => {
        alert("Simulasi: Mengarahkan ke Payment Gateway (Midtrans/Xendit) untuk pembayaran UKT.");
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">

            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Tagihan & Pembayaran</h2>
                <p className="text-slate-600 mt-1">Kelola pembayaran Uang Kuliah Tunggal (UKT) dan biaya akademik lainnya.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">

                {/* KOLOM KIRI & TENGAH: Tagihan Aktif (Makan 2 Kolom) */}
                <div className="xl:col-span-2 space-y-6">

                    {/* Card Tagihan Aktif - Desain ala Fintech */}
                    <Card className={`rounded-2xl border-2 shadow-lg overflow-hidden relative ${activeBill.status === 'UNPAID' ? 'border-rose-200' : 'border-emerald-200'
                        }`}>
                        {/* Pita Status */}
                        <div className={`absolute top-0 left-0 w-full h-2 ${activeBill.status === 'UNPAID' ? 'bg-rose-500' : 'bg-emerald-500'
                            }`}></div>

                        <CardContent className="p-0">
                            <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${activeBill.status === 'UNPAID' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                                            }`}>
                                            {activeBill.status === 'UNPAID' ? 'Belum Dibayar' : 'Lunas'}
                                        </span>
                                        <span className="text-sm text-slate-500 font-mono">{activeBill.id}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900">UKT Semester {activeBill.semester}</h3>
                                    <div className="flex items-center gap-2 mt-2 text-sm text-rose-600 font-medium">
                                        <Clock className="h-4 w-4" />
                                        Jatuh Tempo: {activeBill.dueDate}
                                    </div>
                                </div>

                                <div className="text-left sm:text-right w-full sm:w-auto p-4 sm:p-0 bg-slate-50 sm:bg-transparent rounded-xl border sm:border-0 border-slate-100">
                                    <p className="text-sm text-slate-500 font-medium mb-1">Total Tagihan</p>
                                    <p className="text-4xl font-black text-slate-900 tracking-tight">{formatRupiah(activeBill.amount)}</p>
                                </div>
                            </div>
                        </CardContent>

                        {activeBill.status === 'UNPAID' && (
                            <CardFooter className="bg-slate-50 border-t border-slate-100 p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                                <p className="text-sm text-slate-600 flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-amber-500" />
                                    KRS Anda akan terkunci jika tagihan belum dilunasi.
                                </p>
                                <Button
                                    onClick={handlePayment}
                                    className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white rounded-xl px-8 py-6 text-md shadow-lg shadow-rose-500/20"
                                >
                                    <CreditCard className="h-5 w-5 mr-2" />
                                    Bayar Sekarang
                                </Button>
                            </CardFooter>
                        )}
                    </Card>

                    {/* Riwayat Pembayaran */}
                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Riwayat Pembayaran</h3>
                    <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
                        <div className="divide-y divide-slate-100">
                            {paymentHistory.map((payment) => (
                                <div key={payment.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full shrink-0">
                                            <CheckCircle2 className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900">UKT Semester {payment.semester}</h4>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-slate-500">
                                                <span>{payment.date}</span>
                                                <span className="hidden sm:inline">•</span>
                                                <span>{payment.method}</span>
                                                <span className="hidden sm:inline">•</span>
                                                <span className="font-mono text-xs">{payment.id}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                                        <span className="font-bold text-slate-900">{formatRupiah(payment.amount)}</span>
                                        <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg h-8">
                                            <Download className="h-4 w-4 mr-1.5" />
                                            Kwitansi
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* KOLOM KANAN: Informasi & Metode Pembayaran (Sticky Sidebar) */}
                <div className="xl:col-span-1 space-y-6">
                    <Card className="rounded-2xl border-slate-200 shadow-sm sticky top-24">
                        <CardHeader className="bg-slate-50 border-b border-slate-100 rounded-t-2xl">
                            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <Wallet className="h-5 w-5 text-emerald-600" />
                                Metode Pembayaran
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-100 text-sm">
                                <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-slate-700">
                                    <div className="flex items-center gap-3">
                                        <Building2 className="h-5 w-5 text-blue-600" />
                                        <span className="font-medium">Transfer Virtual Account (VA)</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-slate-400" />
                                </button>
                                <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-slate-700">
                                    <div className="flex items-center gap-3">
                                        <div className="h-5 w-5 rounded bg-emerald-500 flex items-center justify-center text-white font-bold text-[10px]">QR</div>
                                        <span className="font-medium">QRIS (GoPay, OVO, Dana)</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-slate-400" />
                                </button>
                                <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-slate-700">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="h-5 w-5 text-purple-600" />
                                        <span className="font-medium">Kartu Kredit / Debit</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-slate-400" />
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border-slate-200 shadow-sm bg-slate-50">
                        <CardContent className="p-5 text-sm text-slate-600">
                            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <FileText className="h-4 w-4 text-slate-500" />
                                Ketentuan Pembayaran
                            </h4>
                            <ul className="list-disc pl-5 space-y-1.5">
                                <li>Pembayaran UKT wajib dilunasi sebelum masa pengisian KRS dimulai.</li>
                                <li>Simpan bukti pembayaran digital (Kwitansi) yang dapat diunduh pada riwayat pembayaran.</li>
                                <li>Jika status pembayaran belum berubah setelah 1x24 jam, hubungi Bagian Keuangan.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}