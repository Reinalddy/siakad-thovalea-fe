"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, Loader2, AlertCircle } from "lucide-react";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            // Tembak API Laravel
            const response = await api.post('/login', { email, password });

            // Tangkap data dari response JSON Laravel kamu
            const { token, user } = response.data.data;

            // Simpan ke Zustand & Cookies
            setAuth(user, token);

            // Redirect cerdas berdasarkan Role Spatie
            if (user.role === "Super Admin" || user.role === "Admin BAAK") {
                router.push("/admin");
            } else if (user.role === "Dosen") {
                router.push("/lecturer");
            } else if (user.role === "Mahasiswa") {
                router.push("/dashboard");
            } else {
                setErrorMessage("Role tidak dikenali oleh sistem.");
            }

        } catch (error: any) {
            // Tangkap error message dari JSON Backend
            if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Terjadi kesalahan sistem. Coba lagi.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-center mb-6">
                        <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <GraduationCap className="h-8 w-8 text-white" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Portal SIAKAD</h2>
                    <p className="text-slate-500 text-center text-sm mb-8">Masuk menggunakan email dan password terdaftar.</p>

                    {/* Alert Error */}
                    {errorMessage && (
                        <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Email Kampus</label>
                            <Input
                                type="email"
                                placeholder="email@thovalea.com"
                                className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-bold text-slate-700">Password</label>
                                <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Lupa password?</a>
                            </div>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-md mt-4 shadow-md"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-5 w-5 mr-2 animate-spin" /> Sedang Memproses...
                                </>
                            ) : "Masuk ke Sistem"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}