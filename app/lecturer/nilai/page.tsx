"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Calculator, Save, Upload, CheckCircle2,
    AlertCircle, FileSpreadsheet, Users, ArrowLeft
} from "lucide-react";
import Link from "next/link";

// Konfigurasi Bobot Default (Bisa diubah dosen)
const initialWeights = {
    absen: 10,
    tugas: 20,
    uts: 30,
    uas: 40,
};

// Dummy Data Mahasiswa (Sebagian sudah diisi, sebagian belum)
const initialStudents = [
    { id: "20230001", nim: "20230001", name: "Ahmad Riyadi", absen: 100, tugas: 85, uts: 80, uas: 88 },
    { id: "20230045", nim: "20230045", name: "Siti Nurhaliza", absen: 80, tugas: 75, uts: 60, uas: 65 },
    { id: "20230088", nim: "20230088", name: "Budi Santoso", absen: 100, tugas: 0, uts: 0, uas: 0 }, // Belum diisi
    { id: "20230092", nim: "20230092", name: "Citra Kirana", absen: 100, tugas: 90, uts: 85, uas: 92 },
    { id: "20230105", nim: "20230105", name: "Eko Prasetyo", absen: 50, tugas: 40, uts: 45, uas: 30 }, // Nilai E
];

export default function InputNilaiPage() {
    const [weights, setWeights] = useState(initialWeights);
    const [students, setStudents] = useState(initialStudents);

    const totalWeight = weights.absen + weights.tugas + weights.uts + weights.uas;
    const isWeightValid = totalWeight === 100;

    // Fungsi Auto-Calculate
    const calculateFinalScore = (student: any) => {
        return (
            (student.absen * (weights.absen / 100)) +
            (student.tugas * (weights.tugas / 100)) +
            (student.uts * (weights.uts / 100)) +
            (student.uas * (weights.uas / 100))
        );
    };

    const getGradeLetter = (score: number) => {
        if (score >= 85) return "A";
        if (score >= 80) return "A-";
        if (score >= 75) return "B+";
        if (score >= 70) return "B";
        if (score >= 65) return "B-";
        if (score >= 60) return "C+";
        if (score >= 55) return "C";
        if (score >= 40) return "D";
        return "E";
    };

    const getGradeColor = (letter: string) => {
        if (letter.startsWith("A")) return "text-emerald-700 bg-emerald-50 border-emerald-200";
        if (letter.startsWith("B")) return "text-blue-700 bg-blue-50 border-blue-200";
        if (letter.startsWith("C")) return "text-amber-700 bg-amber-50 border-amber-200";
        return "text-rose-700 bg-rose-50 border-rose-200 font-bold"; // D & E
    };

    // Handle Perubahan Input (Inline Edit)
    const handleScoreChange = (id: string, field: string, value: string) => {
        const numValue = value === "" ? 0 : Number(value);
        if (numValue < 0 || numValue > 100) return; // Validasi max 100

        setStudents(students.map(s => s.id === id ? { ...s, [field]: numValue } : s));
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8">

            {/* Header Halaman */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <Link href="/lecturer/jadwal" className="text-sm text-slate-500 hover:text-emerald-600 flex items-center gap-1 mb-2 transition-colors">
                        <ArrowLeft className="h-4 w-4" /> Kembali ke Jadwal
                    </Link>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <FileSpreadsheet className="h-8 w-8 text-emerald-600" />
                        Input Nilai Mahasiswa
                    </h2>
                    <div className="flex items-center gap-3 mt-2 text-sm text-slate-600">
                        <span className="font-semibold px-2.5 py-1 bg-slate-100 rounded-md border border-slate-200 text-slate-800">TI-401 Rekayasa Perangkat Lunak</span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> Kelas TI-4A (35 Mahasiswa)</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50 rounded-xl shadow-sm">
                        <Upload className="h-4 w-4 mr-2 text-emerald-600" />
                        Import Excel
                    </Button>
                    <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-md">
                        <Save className="h-4 w-4 mr-2" />
                        Simpan Permanen
                    </Button>
                </div>
            </div>

            {/* Konfigurasi Bobot Nilai */}
            <Card className={`rounded-2xl border-2 shadow-sm transition-colors ${!isWeightValid ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200 bg-white'}`}>
                <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${isWeightValid ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                <Calculator className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Konfigurasi Bobot Penilaian</h3>
                                <p className={`text-sm mt-0.5 ${isWeightValid ? 'text-slate-500' : 'text-rose-600 font-medium'}`}>
                                    Total bobot harus tepat 100%. Saat ini: <strong>{totalWeight}%</strong>
                                </p>
                            </div>
                        </div>

                        {/* Input Bobot */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {Object.keys(weights).map((key) => (
                                <div key={key} className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{key}</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={weights[key as keyof typeof weights]}
                                            onChange={(e) => setWeights({ ...weights, [key]: Number(e.target.value) })}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-slate-50 pr-8"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tabel Input Nilai (Excel Style) */}
            <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="text-xs text-slate-600 uppercase bg-slate-100 border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3 font-bold w-12 text-center">No</th>
                                <th className="px-4 py-3 font-bold w-32">NIM</th>
                                <th className="px-4 py-3 font-bold min-w-[200px]">Nama Mahasiswa</th>
                                <th className="px-2 py-3 font-bold text-center w-24">Absen <span className="text-emerald-600">({weights.absen}%)</span></th>
                                <th className="px-2 py-3 font-bold text-center w-24">Tugas <span className="text-emerald-600">({weights.tugas}%)</span></th>
                                <th className="px-2 py-3 font-bold text-center w-24">UTS <span className="text-emerald-600">({weights.uts}%)</span></th>
                                <th className="px-2 py-3 font-bold text-center w-24">UAS <span className="text-emerald-600">({weights.uas}%)</span></th>
                                <th className="px-4 py-3 font-bold text-center w-28 bg-emerald-50 border-l border-slate-200">Nilai Akhir</th>
                                <th className="px-4 py-3 font-bold text-center w-28 bg-emerald-50">Huruf Mutu</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {students.map((student, index) => {
                                const finalScore = calculateFinalScore(student);
                                const gradeLetter = getGradeLetter(finalScore);
                                const isFail = gradeLetter === "D" || gradeLetter === "E";

                                return (
                                    <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-4 py-2 text-center text-slate-500 font-medium">{index + 1}</td>
                                        <td className="px-4 py-2 font-mono text-slate-600 text-xs">{student.nim}</td>
                                        <td className="px-4 py-2 font-semibold text-slate-900">{student.name}</td>

                                        {/* Input Cells */}
                                        {['absen', 'tugas', 'uts', 'uas'].map((field) => (
                                            <td key={field} className="px-2 py-2">
                                                <input
                                                    type="number"
                                                    min="0" max="100"
                                                    value={student[field as keyof typeof student] || ""}
                                                    onChange={(e) => handleScoreChange(student.id, field, e.target.value)}
                                                    className="w-full text-center py-1.5 px-2 rounded-md border border-transparent hover:border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-white bg-slate-50 font-medium text-slate-900 outline-none transition-all placeholder:text-slate-300"
                                                    placeholder="0"
                                                />
                                            </td>
                                        ))}

                                        {/* Auto-calculated Cells */}
                                        <td className="px-4 py-2 text-center font-bold text-slate-900 border-l border-slate-100 bg-slate-50/30">
                                            {finalScore.toFixed(1)}
                                        </td>
                                        <td className="px-4 py-2 text-center bg-slate-50/30">
                                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold border ${getGradeColor(gradeLetter)}`}>
                                                {gradeLetter}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-600 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-emerald-600" />
                        Nilai akan tersimpan otomatis sebagai draft.
                    </p>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <Button variant="outline" className="w-full sm:w-auto border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100">
                            Simpan Draft
                        </Button>
                        <Button disabled={!isWeightValid} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white">
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Publikasikan Nilai
                        </Button>
                    </div>
                </CardFooter>
            </Card>

        </div>
    );
}