"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Hash, Layers, Loader2, X, Save } from "lucide-react";

export interface CourseFormData {
    id?: number;
    kode_mk: string;
    nama_mk: string;
    sks: number;
    semester_plot: number;
    tipe: string;
}

interface CourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CourseFormData) => Promise<void>;
    initialData?: CourseFormData | null;
    isSubmitting: boolean;
}

const defaultFormState: CourseFormData = {
    kode_mk: "",
    nama_mk: "",
    sks: 3,
    semester_plot: 1,
    tipe: "Wajib",
};

export default function CourseModal({ isOpen, onClose, onSubmit, initialData, isSubmitting }: CourseModalProps) {
    const [formData, setFormData] = useState<CourseFormData>(defaultFormState);

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
        // Parsing angka untuk SKS dan Semester agar tidak dikirim sebagai string
        const parsedValue = (name === "sks" || name === "semester_plot") ? Number(value) : value;
        setFormData((prev) => ({ ...prev, [name]: parsedValue }));
    };

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        {initialData ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
                    </h3>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    <form id="courseForm" onSubmit={handleSubmitForm} className="space-y-5">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold flex items-center gap-1.5"><Hash className="h-4 w-4 text-slate-400" /> Kode MK</Label>
                                <Input
                                    name="kode_mk"
                                    placeholder="Cth: TIF101"
                                    value={formData.kode_mk}
                                    onChange={handleInputChange}
                                    required
                                    className="border-slate-200 uppercase"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold">Jenis Mata Kuliah</Label>
                                <select
                                    name="jenis"
                                    value={formData.tipe}
                                    onChange={handleInputChange}
                                    required
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Wajib">Wajib</option>
                                    <option value="Pilihan">Pilihan</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-700 font-bold flex items-center gap-1.5"><BookOpen className="h-4 w-4 text-slate-400" /> Nama Mata Kuliah</Label>
                            <Input
                                name="nama_mk"
                                placeholder="Cth: Algoritma dan Pemrograman"
                                value={formData.nama_mk}
                                onChange={handleInputChange}
                                required
                                className="border-slate-200"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold flex items-center gap-1.5"><Layers className="h-4 w-4 text-slate-400" /> Bobot SKS</Label>
                                <Input
                                    type="number"
                                    name="sks"
                                    min="1" max="6"
                                    value={formData.sks}
                                    onChange={handleInputChange}
                                    required
                                    className="border-slate-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold">Plot Semester Default</Label>
                                <Input
                                    type="number"
                                    name="semester_plot"
                                    min="1" max="8"
                                    value={formData.semester_plot}
                                    onChange={handleInputChange}
                                    required
                                    className="border-slate-200"
                                />
                            </div>
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                    <Button type="button" variant="outline" onClick={onClose} className="border-slate-300">Batal</Button>
                    <Button type="submit" form="courseForm" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                        {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        {isSubmitting ? 'Menyimpan...' : 'Simpan Data'}
                    </Button>
                </div>

            </div>
        </div>
    );
}