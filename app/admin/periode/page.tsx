"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    CalendarDays, Plus, PlayCircle, Edit, Trash2,
    CheckCircle2, AlertTriangle, Clock, Lock, CalendarCheck, Loader2
} from "lucide-react";
import api from "@/lib/axios";

// Import Komponen Modal yang baru kita buat
import PeriodModal, { PeriodFormData } from "@/components/admin/PeriodModal";

interface AcademicPeriod {
    id: number;
    tahun_akademik: string;
    semester: string;
    status: string;
    krs_start: string | null;
    krs_end: string | null;
    nilai_start: string | null;
    nilai_end: string | null;
    ukt_start: string | null;
    ukt_end: string | null;
}

export default function ManajemenPeriodePage() {
    const [periods, setPeriods] = useState<AcademicPeriod[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState<number | null>(null);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedData, setSelectedData] = useState<PeriodFormData | null>(null); // Null = Create, Ada isi = Edit

    const fetchPeriods = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/admin/periods');
            setPeriods(response.data.data);
        } catch (error) {
            console.error("Gagal mengambil data periode", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPeriods();
    }, []);

    const activePeriod = periods.find(p => p.status === "Aktif");

    // --- CRUD HANDLERS ---

    // Buka modal untuk Create
    const handleOpenCreate = () => {
        setSelectedData(null);
        setIsModalOpen(true);
    };

    // Buka modal untuk Edit
    const handleOpenEdit = (periode: AcademicPeriod) => {
        // Mapping dari data tabel ke data form
        setSelectedData({
            id: periode.id,
            tahun_akademik: periode.tahun_akademik,
            semester: periode.semester,
            krs_start: periode.krs_start || "",
            krs_end: periode.krs_end || "",
            nilai_start: periode.nilai_start || "",
            nilai_end: periode.nilai_end || "",
            ukt_start: periode.ukt_start || "",
            ukt_end: periode.ukt_end || "",
        });
        setIsModalOpen(true);
    };

    // Submit Data (Create atau Update tergantung ada id atau tidak)
    const handleSubmitModal = async (formData: PeriodFormData) => {
        setIsSubmitting(true);
        try {
            if (formData.id) {
                // Mode Update (Pastikan route PUT /admin/periods/{id} sudah ada di Laravel)
                await api.put(`/admin/periods/${formData.id}`, formData);
            } else {
                // Mode Create
                await api.post('/admin/periods', formData);
            }
            setIsModalOpen(false);
            fetchPeriods(); // Refresh tabel
        } catch (error: any) {
            alert(error.response?.data?.message || "Gagal menyimpan data.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleActivate = async (id: number) => {
        if (confirm("PERINGATAN KRUSIAL!\nMengaktifkan periode ini akan menutup periode sebelumnya. Lanjutkan?")) {
            setIsActionLoading(id);
            try {
                await api.put(`/admin/periods/${id}/set-active`);
                fetchPeriods();
            } catch (error: any) {
                alert(error.response?.data?.message || "Terjadi kesalahan.");
            } finally {
                setIsActionLoading(null);
            }
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus periode Draft ini secara permanen?")) {
            setIsActionLoading(id);
            try {
                await api.delete(`/admin/periods/${id}`);
                fetchPeriods();
            } catch (error: any) {
                alert(error.response?.data?.message || "Gagal menghapus periode.");
            } finally {
                setIsActionLoading(null);
            }
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Memuat data periode akademik...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">

            {/* Header Halaman */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <CalendarDays className="h-8 w-8 text-blue-600" />
                        Manajemen Periode Akademik
                    </h2>
                    <p className="text-slate-600 mt-1">Atur tahun ajaran, semester aktif, dan batas waktu KRS/KHS.</p>
                </div>

                <Button
                    onClick={handleOpenCreate}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Buat Periode Baru
                </Button>
            </div>

            {/* HIGHLIGHT: Periode Aktif Saat Ini */}
            {/* ... [KODE KARTU HIGHLIGHT TETAP SAMA SEPERTI SEBELUMNYA] ... */}

            {/* Tabel Daftar Semua Periode */}
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Daftar Periode Akademik</h3>
            <Card className="rounded-2xl border-slate-200 shadow-sm bg-white overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-bold text-slate-700">Tahun Akademik</th>
                                <th className="px-6 py-4 font-bold text-slate-700">Masa KRS</th>
                                <th className="px-6 py-4 font-bold text-slate-700">Masa Input Nilai</th>
                                <th className="px-6 py-4 font-bold text-slate-700 text-center">Status</th>
                                <th className="px-6 py-4 font-bold text-slate-700 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {periods.map((periode) => {
                                const isAktif = periode.status === "Aktif";
                                const isSelesai = periode.status === "Selesai";
                                const isDraft = periode.status === "Draft";
                                const loadingAction = isActionLoading === periode.id;

                                return (
                                    <tr key={periode.id} className={`transition-colors hover:bg-slate-50/50 ${isAktif ? 'bg-emerald-50/30' : ''}`}>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-900 text-base">Semester {periode.semester}</p>
                                            <p className="text-slate-500 font-medium mt-0.5">{periode.tahun_akademik}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-slate-800 font-medium">{formatDate(periode.krs_start)}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">s/d {formatDate(periode.krs_end)}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-slate-800 font-medium">{formatDate(periode.nilai_start)}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">s/d {formatDate(periode.nilai_end)}</p>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${isAktif ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                                                    isSelesai ? "bg-slate-100 text-slate-600 border-slate-200" :
                                                        "bg-amber-100 text-amber-700 border-amber-200"
                                                }`}>
                                                {isAktif && <CheckCircle2 className="h-3 w-3" />}
                                                {periode.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {!isAktif && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        disabled={loadingAction}
                                                        onClick={() => handleActivate(periode.id)}
                                                        className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 font-semibold"
                                                    >
                                                        {loadingAction ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlayCircle className="h-4 w-4 mr-1.5" />}
                                                        {loadingAction ? '' : 'Set Aktif'}
                                                    </Button>
                                                )}

                                                {/* Tombol EDIT memanggil fungsi handleOpenEdit dan mengirim objek periode */}
                                                <button
                                                    onClick={() => handleOpenEdit(periode)}
                                                    className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                                                    title="Edit Periode"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>

                                                {isDraft && (
                                                    <button
                                                        onClick={() => handleDelete(periode.id)}
                                                        disabled={loadingAction}
                                                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors disabled:opacity-50"
                                                        title="Hapus Periode"
                                                    >
                                                        {loadingAction ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Render Komponen Modal Secara Terpisah */}
            <PeriodModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitModal}
                initialData={selectedData}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}