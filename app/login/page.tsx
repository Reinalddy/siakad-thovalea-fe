"use client"; // Diperlukan karena kita menggunakan komponen interaktif (tombol, input)

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    // Fungsi sementara untuk handle submit
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Tombol masuk diklik!");
        // Nanti kita akan tambahkan logic integrasi ke API Laravel di sini
    };

    return (
        // Background Full Screen
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 md:p-8">
            {/* Container untuk Card agar responsive */}
            <div className="w-full max-w-md space-y-8">
                {/* Logo Section */}
                <div className="flex flex-col items-center justify-center text-center">
                    <Link href="/" className="flex items-center gap-2.5">
                        <GraduationCap className="h-10 w-10 text-emerald-600" />
                        <span className="text-3xl font-bold tracking-tight text-slate-900">
                            Thovalea<span className="text-emerald-600">SIAKAD</span>
                        </span>
                    </Link>
                    <p className="mt-3 text-lg text-slate-700">Silakan masuk dengan akun akademik Anda</p>
                </div>

                {/* Login Card (Elegant shadow & corners) */}
                <Card className="shadow-2xl shadow-slate-900/5 rounded-2xl border-slate-100 bg-white">
                    <form onSubmit={handleLogin}>
                        <CardHeader className="space-y-1 pt-8 pb-6 px-8">
                            <CardTitle className="text-2xl font-bold tracking-tight text-slate-950">Masuk Platform</CardTitle>
                            <CardDescription className="text-slate-600 text-md">
                                Gunakan NIM/NIDN dan kata sandi Anda.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5 px-8 pb-8">
                            {/* Field Email/NIM */}
                            <div className="space-y-2">
                                <Label htmlFor="identity" className="text-sm font-medium text-slate-800">Email atau NIM/NIDN</Label>
                                <Input
                                    id="identity"
                                    type="text"
                                    placeholder="Contoh: 123456789 atau nama@univ.ac.id"
                                    required
                                    className="rounded-lg border-slate-200 focus:border-emerald-300 focus:ring-emerald-200 px-4 py-2.5 text-md"
                                />
                            </div>
                            {/* Field Password */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-sm font-medium text-slate-800">Kata Sandi</Label>
                                    <Link href="#" className="text-sm text-emerald-700 hover:text-emerald-800 font-medium">
                                        Lupa sandi?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    className="rounded-lg border-slate-200 focus:border-emerald-300 focus:ring-emerald-200 px-4 py-2.5 text-md"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 px-8 pb-10">
                            <Button type="submit" className="w-full rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/10 text-md py-6 font-semibold">
                                Masuk Sekarang
                            </Button>
                            <p className="text-center text-sm text-slate-600 mt-2">
                                Kesulitan masuk? Hubungi <Link href="#" className="text-emerald-700 hover:text-emerald-800 font-medium">Biro Akademik</Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}