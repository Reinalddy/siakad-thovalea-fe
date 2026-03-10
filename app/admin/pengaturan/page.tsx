"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Settings, Building2, Link2, ShieldCheck,
    Save, Upload, BookOpen, CreditCard, MessageSquare
} from "lucide-react";

export default function PengaturanSistemPage() {
    // State untuk navigasi tab vertikal
    const [activeTab, setActiveTab] = useState("umum");

    const handleSave = () => {
        alert("Simulasi: Pengaturan berhasil disimpan ke database!");
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8">

            {/* Header Halaman */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                    <Settings className="h-8 w-8 text-blue-600" />
                    Pengaturan Sistem
                </h2>
                <p className="text-slate-600 mt-1">Konfigurasi profil institusi, aturan akademik, dan integrasi API pihak ketiga.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start mt-8">

                {/* KOLOM KIRI: Menu Navigasi Pengaturan (Vertical Tabs) */}
                <div className="w-full md:w-64 shrink-0 flex flex-col gap-1">
                    <button
                        onClick={() => setActiveTab("umum")}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${activeTab === "umum" ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
                            }`}
                    >
                        <Building2 className="h-4 w-4" /> Profil Institusi
                    </button>
                    <button
                        onClick={() => setActiveTab("akademik")}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${activeTab === "akademik" ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
                            }`}
                    >
                        <BookOpen className="h-4 w-4" /> Aturan Akademik
                    </button>
                    <button
                        onClick={() => setActiveTab("integrasi")}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${activeTab === "integrasi" ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
                            }`}
                    >
                        <Link2 className="h-4 w-4" /> Integrasi & API
                    </button>
                    <button
                        onClick={() => setActiveTab("keamanan")}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${activeTab === "keamanan" ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
                            }`}
                    >
                        <ShieldCheck className="h-4 w-4" /> Keamanan Sistem
                    </button>
                </div>

                {/* KOLOM KANAN: Form Konten Dinamis */}
                <div className="flex-1 w-full min-w-0">

                    {/* KONTEN TAB: PROFIL INSTITUSI */}
                    {activeTab === "umum" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="rounded-2xl border-slate-200 shadow-sm bg-white">
                                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5">
                                    <CardTitle className="text-xl text-slate-900">Identitas Kampus</CardTitle>
                                    <CardDescription>Informasi ini akan ditampilkan pada kop surat, BAP, dan tagihan (Invoice).</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6">

                                    {/* Upload Logo */}
                                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                                        <div className="h-24 w-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center shrink-0">
                                            <Building2 className="h-8 w-8 text-slate-400" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-slate-800 font-bold">Logo Institusi</Label>
                                            <p className="text-xs text-slate-500">Gunakan format PNG transparan. Ukuran maksimal 2MB.</p>
                                            <Button variant="outline" size="sm" className="mt-2 border-slate-300 text-slate-700">
                                                <Upload className="h-4 w-4 mr-2" /> Unggah Logo Baru
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="nama_kampus" className="text-slate-800 font-bold">Nama Lengkap Institusi</Label>
                                            <Input id="nama_kampus" defaultValue="Universitas Teknologi Thovalea" className="border-slate-200 focus:border-blue-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="singkatan" className="text-slate-800 font-bold">Singkatan / Akronim</Label>
                                            <Input id="singkatan" defaultValue="UTT" className="border-slate-200 focus:border-blue-500" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="alamat" className="text-slate-800 font-bold">Alamat Utama</Label>
                                            <Input id="alamat" defaultValue="Jl. Raya Perjuangan No. 45, Bekasi, Jawa Barat" className="border-slate-200 focus:border-blue-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-slate-800 font-bold">Email Resmi (Kontak)</Label>
                                            <Input id="email" type="email" defaultValue="info@thovalea.ac.id" className="border-slate-200 focus:border-blue-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="telepon" className="text-slate-800 font-bold">Nomor Telepon</Label>
                                            <Input id="telepon" defaultValue="(021) 888-9999" className="border-slate-200 focus:border-blue-500" />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-slate-50 border-t border-slate-100 p-6">
                                    <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md">
                                        <Save className="h-4 w-4 mr-2" /> Simpan Perubahan Profil
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    )}

                    {/* KONTEN TAB: INTEGRASI & API */}
                    {activeTab === "integrasi" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                            {/* API Payment Gateway */}
                            <Card className="rounded-2xl border-slate-200 shadow-sm bg-white">
                                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5">
                                    <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
                                        <CreditCard className="h-5 w-5 text-amber-500" />
                                        Payment Gateway (Midtrans)
                                    </CardTitle>
                                    <CardDescription>Kredensial untuk memproses pembayaran UKT secara otomatis.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 mb-4">
                                        <div>
                                            <p className="font-bold text-slate-900">Mode Produksi (Live)</p>
                                            <p className="text-xs text-slate-500 mt-0.5">Matikan untuk menguji transaksi menggunakan Sandbox.</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="midtrans_client" className="text-slate-800 font-bold">Client Key</Label>
                                        <Input id="midtrans_client" type="password" defaultValue="SB-Mid-client-XXXXX" className="border-slate-200 font-mono text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="midtrans_server" className="text-slate-800 font-bold">Server Key</Label>
                                        <Input id="midtrans_server" type="password" defaultValue="SB-Mid-server-XXXXX" className="border-slate-200 font-mono text-sm" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* API WhatsApp Gateway */}
                            <Card className="rounded-2xl border-slate-200 shadow-sm bg-white">
                                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5">
                                    <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
                                        <MessageSquare className="h-5 w-5 text-emerald-500" />
                                        WhatsApp Gateway Webhook
                                    </CardTitle>
                                    <CardDescription>Hubungkan sistem SIAKAD dengan service WA Gateway untuk pengiriman notifikasi KRS dan Tagihan otomatis.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="wa_endpoint" className="text-slate-800 font-bold">Endpoint URL (Express/Nuxt Service)</Label>
                                        <Input id="wa_endpoint" defaultValue="https://api.wa.thovalea.com/v1/send-message" className="border-slate-200 font-mono text-sm focus:border-blue-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="wa_token" className="text-slate-800 font-bold">Bearer Token / API Key</Label>
                                        <Input id="wa_token" type="password" defaultValue="thovalea_super_secret_token_123" className="border-slate-200 font-mono text-sm focus:border-blue-500" />
                                    </div>
                                    <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-800">
                                        Sistem akan mengirimkan <strong>POST request</strong> ke endpoint di atas dengan *payload* JSON setiap kali ada tagihan UKT baru atau penolakan KRS oleh Dosen.
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-slate-50 border-t border-slate-100 p-6">
                                    <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md">
                                        <Save className="h-4 w-4 mr-2" /> Simpan Konfigurasi API
                                    </Button>
                                </CardFooter>
                            </Card>

                        </div>
                    )}

                    {/* Placeholder untuk Tab Lainnya (Supaya kamu bisa kembangkan sendiri nanti) */}
                    {(activeTab === "akademik" || activeTab === "keamanan") && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-200 rounded-2xl bg-white text-slate-400">
                            <Settings className="h-10 w-10 mb-2 animate-spin-slow text-slate-300" />
                            <p className="font-medium text-slate-500">Konfigurasi {activeTab === "akademik" ? "Aturan Akademik" : "Keamanan"} sedang dalam pengembangan.</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}