"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DoorOpen, Hash, Users, Loader2, X, Save } from "lucide-react";

export interface RoomFormData {
    id?: number;
    kode_ruang: string;
    nama_ruang: string;
    kapasitas: number;
    jenis_ruang: string;
}

interface RoomModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: RoomFormData) => Promise<void>;
    initialData?: RoomFormData | null;
    isSubmitting: boolean;
}

const defaultFormState: RoomFormData = {
    kode_ruang: "",
    nama_ruang: "",
    kapasitas: 40,
    jenis_ruang: "Teori",
};

export default function RoomModal({ isOpen, onClose, onSubmit, initialData, isSubmitting }: RoomModalProps) {
    const [formData, setFormData] = useState<RoomFormData>(defaultFormState);

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
        // Parsing ke integer khusus untuk field kapasitas
        const parsedValue = name === "kapasitas" ? Number(value) : value;
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
                        <DoorOpen className="h-5 w-5 text-blue-600" />
                        {initialData ? "Edit Ruangan" : "Tambah Ruangan Baru"}
                    </h3>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    <form id="roomForm" onSubmit={handleSubmitForm} className="space-y-5">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold flex items-center gap-1.5"><Hash className="h-4 w-4 text-slate-400" /> Kode Ruang</Label>
                                <Input
                                    name="kode_ruang"
                                    placeholder="Cth: A.1.1"
                                    value={formData.kode_ruang}
                                    onChange={handleInputChange}
                                    required
                                    className="border-slate-200 uppercase"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold">Jenis Ruangan</Label>
                                <select
                                    name="jenis_ruang"
                                    value={formData.jenis_ruang}
                                    onChange={handleInputChange}
                                    required
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Teori">Ruang Teori</option>
                                    <option value="Laboratorium">Laboratorium</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-700 font-bold flex items-center gap-1.5"><DoorOpen className="h-4 w-4 text-slate-400" /> Nama Ruangan Lengkap</Label>
                            <Input
                                name="nama_ruang"
                                placeholder="Cth: Ruang Teori Utama / Lab Komputer 1"
                                value={formData.nama_ruang}
                                onChange={handleInputChange}
                                required
                                className="border-slate-200"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-700 font-bold flex items-center gap-1.5"><Users className="h-4 w-4 text-slate-400" /> Kapasitas (Jumlah Kursi)</Label>
                            <Input
                                type="number"
                                name="kapasitas"
                                min="10" max="200"
                                value={formData.kapasitas}
                                onChange={handleInputChange}
                                required
                                className="border-slate-200"
                            />
                            <p className="text-xs text-slate-500">Kapasitas maksimal ruangan ini, akan digunakan untuk batasan plot kelas KRS.</p>
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                    <Button type="button" variant="outline" onClick={onClose} className="border-slate-300">Batal</Button>
                    <Button type="submit" form="roomForm" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                        {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        {isSubmitting ? 'Menyimpan...' : 'Simpan Data'}
                    </Button>
                </div>

            </div>
        </div>
    );
}