import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, AlertCircle, CheckCircle2, FileWarning, BookOpen } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-8 max-w-6xl mx-auto">

            {/* Header Section dengan Konteks Waktu */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Selamat datang kembali, Reinalddy!</h2>
                    <p className="text-slate-600 mt-1">Kamis, 5 Maret 2026 • Semester Genap 2025/2026</p>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6">
                    Lihat KRS Aktif
                </Button>
            </div>

            {/* Alert / Warning Banner (UX: Memberi tahu info kritis) */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start sm:items-center gap-4">
                <div className="bg-amber-100 p-2 rounded-full text-amber-600 shrink-0">
                    <FileWarning className="h-5 w-5" />
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-semibold text-amber-800">Periode Pengisian KRS Segera Berakhir</h4>
                    <p className="text-sm text-amber-700 mt-0.5">Batas akhir pengisian Kartu Rencana Studi adalah tanggal 10 Maret 2026. Pastikan Anda sudah mengunci pilihan mata kuliah.</p>
                </div>
            </div>

            {/* Statistik Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="rounded-2xl border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">IPK Kumulatif</CardTitle>
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">3.85</div>
                        <p className="text-xs text-emerald-600 mt-1 font-medium">+0.12 dari semester lalu</p>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Total SKS Tempuh</CardTitle>
                        <BookOpen className="h-5 w-5 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">114 <span className="text-lg font-normal text-slate-500">/ 144</span></div>
                        <p className="text-xs text-slate-500 mt-1">Sisa 30 SKS untuk lulus</p>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl border-emerald-200 bg-emerald-50 shadow-sm sm:col-span-2 lg:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-800">Status Keuangan</CardTitle>
                        <AlertCircle className="h-5 w-5 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold text-emerald-900">Lunas</div>
                        <p className="text-xs text-emerald-700 mt-1">UKT Semester Genap telah dibayar</p>
                    </CardContent>
                </Card>
            </div>

            {/* Jadwal Kuliah Hari Ini */}
            <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Jadwal Kuliah Hari Ini</h3>
                <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
                    <div className="divide-y divide-slate-100">
                        {/* Item Jadwal 1 */}
                        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                            <div className="flex gap-4 items-start sm:items-center">
                                <div className="bg-slate-100 text-slate-700 rounded-xl p-3 text-center min-w-[80px]">
                                    <p className="text-sm font-bold">08:00</p>
                                    <p className="text-xs text-slate-500">10:30</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900 text-lg">Rekayasa Perangkat Lunak</h4>
                                    <p className="text-sm text-slate-500 mt-1">TI-302 • 3 SKS</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg w-fit">
                                <MapPin className="h-4 w-4 text-emerald-500" />
                                Ruang Lab A2
                            </div>
                        </div>
                        {/* Item Jadwal 2 */}
                        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                            <div className="flex gap-4 items-start sm:items-center">
                                <div className="bg-slate-100 text-slate-700 rounded-xl p-3 text-center min-w-[80px]">
                                    <p className="text-sm font-bold">13:00</p>
                                    <p className="text-xs text-slate-500">14:40</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900 text-lg">Kecerdasan Buatan</h4>
                                    <p className="text-sm text-slate-500 mt-1">TI-305 • 2 SKS</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg w-fit">
                                <MapPin className="h-4 w-4 text-emerald-500" />
                                Gedung B, R. 401
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

        </div>
    );
}