"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Hash, Mail, User as UserIcon, BookOpen, Loader2, X, Save } from "lucide-react";

export interface LecturerFormData {
    id?: number;
    nidn: string;
    nama: string; // Akan dikirim ke tabel users
    email: string; // Akan dikirim ke tabel users
    prodi: string;
    status_dosen: string;
}

interface LecturerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: LecturerFormData) => Promise<void>;
    initialData?: LecturerFormData | null;
    isSubmitting: boolean;
}

const defaultFormState: LecturerFormData = {
    nidn: "",
    nama: "",
    email: "",
    prodi: "Teknik Informatika", // Sesuaikan default prodi
    status_dosen: "Tetap",
};

export default function LecturerModal({ isOpen, onClose, onSubmit, initialData, isSubmitting }: LecturerModalProps) {
    const [formData, setFormData] = useState<LecturerFormData>(defaultFormState);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData(initialData);
            } else {
                setFormData(defaultFormState);
            }
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-blue-600" />
                        {initialData ? "Edit Data Dosen" : "Tambah Dosen Baru"}
                    </h3>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    {/* Info Banner */}
                    {!initialData && (
                        <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800 flex items-start gap-2">
                            <div className="mt-0.5 font-bold">ℹ️</div>
                            <p>Sistem akan otomatis membuatkan akun login menggunakan <strong>Email</strong> yang Anda masukkan dengan password default: <code className="bg-blue-100 px-1 py-0.5 rounded text-blue-900 font-mono">password123</code></p>
                        </div>
                    )}

                    <form id="lecturerForm" onSubmit={handleSubmitForm} className="space-y-5">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold flex items-center gap-1.5"><Hash className="h-4 w-4 text-slate-400" /> NIDN</Label>
                                <Input
                                    name="nidn"
                                    placeholder="Cth: 0412038..."
                                    value={formData.nidn}
                                    onChange={handleInputChange}
                                    required
                                    className="border-slate-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold flex items-center gap-1.5"><UserIcon className="h-4 w-4 text-slate-400" /> Nama Lengkap & Gelar</Label>
                                <Input
                                    name="nama"
                                    placeholder="Cth: Dr. Budi Santoso, M.Kom."
                                    value={formData.nama}
                                    onChange={handleInputChange}
                                    required
                                    className="border-slate-200"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-700 font-bold flex items-center gap-1.5"><Mail className="h-4 w-4 text-slate-400" /> Alamat Email Aktif</Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Cth: dosen@thovalea.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="border-slate-200"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold flex items-center gap-1.5"><BookOpen className="h-4 w-4 text-slate-400" /> Program Studi</Label>
                                <Input
                                    name="prodi"
                                    placeholder="Cth: Teknik Informatika"
                                    value={formData.prodi}
                                    onChange={handleInputChange}
                                    required
                                    className="border-slate-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold">Status Dosen</Label>
                                <select
                                    name="status_dosen"
                                    value={formData.status_dosen}
                                    onChange={handleInputChange}
                                    required
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Tetap">Dosen Tetap</option>
                                    <option value="LB">Luar Biasa (LB)</option>
                                    <option value="Cuti">Cuti / Tugas Belajar</option>
                                </select>
                            </div>
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                    <Button type="button" variant="outline" onClick={onClose} className="border-slate-300">Batal</Button>
                    <Button type="submit" form="lecturerForm" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                        {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        {isSubmitting ? 'Menyimpan...' : 'Simpan Data'}
                    </Button>
                </div>

            </div>
        </div>
    );
}