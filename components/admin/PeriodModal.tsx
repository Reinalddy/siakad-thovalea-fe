"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarCheck, Clock, AlertTriangle, Loader2, X, Save } from "lucide-react";

// Tipe data form yang diexport agar bisa dipakai di page.tsx
export interface PeriodFormData {
    id?: number;
    tahun_akademik: string;
    semester: string;
    krs_start: string;
    krs_end: string;
    nilai_start: string;
    nilai_end: string;
    ukt_start: string;
    ukt_end: string;
}

interface PeriodModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: PeriodFormData) => Promise<void>;
    initialData?: PeriodFormData | null; // Jika ada isinya, berarti mode Edit
    isSubmitting: boolean;
}

const defaultFormState: PeriodFormData = {
    tahun_akademik: "",
    semester: "Ganjil",
    krs_start: "",
    krs_end: "",
    nilai_start: "",
    nilai_end: "",
    ukt_start: "",
    ukt_end: "",
};

export default function PeriodModal({ isOpen, onClose, onSubmit, initialData, isSubmitting }: PeriodModalProps) {
    const [formData, setFormData] = useState<PeriodFormData>(defaultFormState);

    // Efek untuk mengisi form otomatis jika sedang mode Edit
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData(initialData); // Mode Edit
            } else {
                setFormData(defaultFormState); // Mode Create
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

                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-900">
                        {initialData ? "Edit Periode Akademik" : "Buat Periode Baru"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto">
                    <form id="periodeForm" onSubmit={handleSubmitForm} className="space-y-6">

                        {/* Info Dasar */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold">Tahun Akademik</Label>
                                <Input
                                    name="tahun_akademik"
                                    placeholder="Contoh: 2026/2027"
                                    value={formData.tahun_akademik}
                                    onChange={handleInputChange}
                                    required
                                    className="border-slate-200 focus:border-blue-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold">Semester</Label>
                                <select
                                    name="semester"
                                    value={formData.semester}
                                    onChange={handleInputChange}
                                    required
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Ganjil">Ganjil</option>
                                    <option value="Genap">Genap</option>
                                    <option value="Pendek">Pendek / Antara</option>
                                </select>
                            </div>
                        </div>

                        <div className="h-px w-full bg-slate-100 my-2"></div>

                        {/* Timeline Masa KRS */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-sm flex items-center gap-2 text-blue-700">
                                <CalendarCheck className="h-4 w-4" /> Timeline Pengisian KRS
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-slate-600 text-xs font-semibold">Tanggal Buka</Label>
                                    <Input type="date" name="krs_start" value={formData.krs_start} onChange={handleInputChange} required className="border-slate-200" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-slate-600 text-xs font-semibold">Tanggal Tutup</Label>
                                    <Input type="date" name="krs_end" value={formData.krs_end} onChange={handleInputChange} required className="border-slate-200" />
                                </div>
                            </div>
                        </div>

                        {/* Timeline Input Nilai */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-sm flex items-center gap-2 text-emerald-700">
                                <Clock className="h-4 w-4" /> Timeline Input Nilai Dosen
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-slate-600 text-xs font-semibold">Tanggal Buka</Label>
                                    <Input type="date" name="nilai_start" value={formData.nilai_start} onChange={handleInputChange} required className="border-slate-200" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-slate-600 text-xs font-semibold">Tanggal Tutup</Label>
                                    <Input type="date" name="nilai_end" value={formData.nilai_end} onChange={handleInputChange} required className="border-slate-200" />
                                </div>
                            </div>
                        </div>

                        {/* Timeline Pembayaran UKT */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-sm flex items-center gap-2 text-amber-700">
                                <AlertTriangle className="h-4 w-4" /> Timeline Pembayaran UKT
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-slate-600 text-xs font-semibold">Tanggal Buka</Label>
                                    <Input type="date" name="ukt_start" value={formData.ukt_start} onChange={handleInputChange} required className="border-slate-200" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-slate-600 text-xs font-semibold">Tanggal Tutup</Label>
                                    <Input type="date" name="ukt_end" value={formData.ukt_end} onChange={handleInputChange} required className="border-slate-200" />
                                </div>
                            </div>
                        </div>

                    </form>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                    <Button type="button" variant="outline" onClick={onClose} className="border-slate-300">
                        Batal
                    </Button>
                    <Button type="submit" form="periodeForm" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                        {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        {isSubmitting ? 'Menyimpan...' : 'Simpan Data'}
                    </Button>
                </div>

            </div>
        </div>
    );
}