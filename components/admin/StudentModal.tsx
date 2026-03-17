"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Hash, Mail, User as UserIcon, BookOpen, GraduationCap, Loader2, X, Save, Star } from "lucide-react";

export interface StudentFormData {
    id?: number;
    nim: string;
    nama: string;
    email: string;
    prodi: string;
    angkatan: string;
    status_mahasiswa: string;
    dosen_pa_id?: number | "";
    ipk: number;
}

interface StudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: StudentFormData) => Promise<void>;
    initialData?: StudentFormData | null;
    isSubmitting: boolean;
    lecturers: any[]; // Menerima data dosen untuk dropdown
}

const defaultFormState: StudentFormData = {
    nim: "",
    nama: "",
    email: "",
    prodi: "Teknik Informatika",
    angkatan: new Date().getFullYear().toString(),
    status_mahasiswa: "Aktif",
    dosen_pa_id: "",
    ipk: 0.00,
};

export default function StudentModal({ isOpen, onClose, onSubmit, initialData, isSubmitting, lecturers }: StudentModalProps) {
    const [formData, setFormData] = useState<StudentFormData>(defaultFormState);

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
        let parsedValue: string | number = value;

        if (name === "ipk") parsedValue = Number(value);
        if (name === "dosen_pa_id") parsedValue = value === "" ? "" : Number(value);

        setFormData((prev) => ({ ...prev, [name]: parsedValue }));
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
                        <Users className="h-5 w-5 text-blue-600" />
                        {initialData ? "Edit Data Mahasiswa" : "Tambah Mahasiswa Baru"}
                    </h3>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    {!initialData && (
                        <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800 flex items-start gap-2">
                            <div className="mt-0.5 font-bold">ℹ️</div>
                            <p>Sistem otomatis membuatkan akun login dengan <strong>Email</strong> yang diinput. Password default: <code className="bg-blue-100 px-1 py-0.5 rounded text-blue-900 font-mono">password123</code></p>
                        </div>
                    )}

                    <form id="studentForm" onSubmit={handleSubmitForm} className="space-y-5">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold flex items-center gap-1.5"><Hash className="h-4 w-4 text-slate-400" /> NIM</Label>
                                <Input name="nim" placeholder="Cth: 20230001" value={formData.nim} onChange={handleInputChange} required className="border-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold flex items-center gap-1.5"><UserIcon className="h-4 w-4 text-slate-400" /> Nama Lengkap</Label>
                                <Input name="nama" placeholder="Cth: Ahmad Riyadi" value={formData.nama} onChange={handleInputChange} required className="border-slate-200" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold flex items-center gap-1.5"><Mail className="h-4 w-4 text-slate-400" /> Email (Untuk Login)</Label>
                                <Input type="email" name="email" placeholder="Cth: ahmad@mhs.thovalea.com" value={formData.email} onChange={handleInputChange} required className="border-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold flex items-center gap-1.5"><GraduationCap className="h-4 w-4 text-slate-400" /> Dosen PA</Label>
                                <select
                                    name="dosen_pa_id" value={formData.dosen_pa_id} onChange={handleInputChange}
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">-- Belum Ditentukan --</option>
                                    {lecturers.map(dosen => (
                                        <option key={dosen.id} value={dosen.id}>{dosen.user.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold flex items-center gap-1.5"><BookOpen className="h-4 w-4 text-slate-400" /> Prodi</Label>
                                <Input name="prodi" placeholder="Teknik Informatika" value={formData.prodi} onChange={handleInputChange} required className="border-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold">Angkatan</Label>
                                <Input name="angkatan" placeholder="2023" value={formData.angkatan} onChange={handleInputChange} required className="border-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold">Status</Label>
                                <select
                                    name="status_mahasiswa" value={formData.status_mahasiswa} onChange={handleInputChange} required
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Aktif">Aktif</option>
                                    <option value="Cuti">Cuti</option>
                                    <option value="Lulus">Lulus</option>
                                    <option value="DO">Drop Out (DO)</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-700 font-bold flex items-center gap-1.5"><Star className="h-4 w-4 text-slate-400" /> IPK (Opsional)</Label>
                            <Input type="number" step="0.01" min="0" max="4" name="ipk" placeholder="0.00" value={formData.ipk} onChange={handleInputChange} className="border-slate-200 w-1/3" />
                            <p className="text-xs text-slate-500">Biarkan 0.00 untuk mahasiswa baru.</p>
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                    <Button type="button" variant="outline" onClick={onClose} className="border-slate-300">Batal</Button>
                    <Button type="submit" form="studentForm" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                        {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        {isSubmitting ? 'Menyimpan...' : 'Simpan Data'}
                    </Button>
                </div>

            </div>
        </div>
    );
}