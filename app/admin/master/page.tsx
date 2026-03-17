"use client";

import { useState, useEffect } from "react";
import {
    Users, GraduationCap, BookOpen, DoorOpen,
    Upload, Download, Plus, Search, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

// --- Import Modals ---
import CourseModal, { CourseFormData } from "@/components/admin/CourseModal";
import RoomModal, { RoomFormData } from "@/components/admin/RoomModal";
import LecturerModal, { LecturerFormData } from "@/components/admin/LecturerModal";
import StudentModal, { StudentFormData } from "@/components/admin/StudentModal";

// --- Import Table Components ---
import CourseTable from "@/components/admin/tables/CourseTable";
import RoomTable from "@/components/admin/tables/RoomTable";
import LecturerTable from "@/components/admin/tables/LecturerTable";
import StudentTable from "@/components/admin/tables/StudentTable";

export default function MasterDataPage() {
    // --- UI States ---
    const [activeTab, setActiveTab] = useState<"mahasiswa" | "dosen" | "mata_kuliah" | "ruangan">("mahasiswa");
    const [searchQuery, setSearchQuery] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- Data States ---
    const [courses, setCourses] = useState<any[]>([]);
    const [rooms, setRooms] = useState<any[]>([]);
    const [lecturers, setLecturers] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);

    // --- Loading States ---
    const [isLoadingCourses, setIsLoadingCourses] = useState(false);
    const [isLoadingRooms, setIsLoadingRooms] = useState(false);
    const [isLoadingLecturers, setIsLoadingLecturers] = useState(false);
    const [isLoadingStudents, setIsLoadingStudents] = useState(false);

    // --- Modal States ---
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<CourseFormData | null>(null);

    const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<RoomFormData | null>(null);

    const [isLecturerModalOpen, setIsLecturerModalOpen] = useState(false);
    const [selectedLecturer, setSelectedLecturer] = useState<LecturerFormData | null>(null);

    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<StudentFormData | null>(null);

    // ==========================================
    // 1. FETCHERS (Fungsi Ambil Data)
    // ==========================================
    const fetchCourses = async () => {
        setIsLoadingCourses(true);
        try {
            const response = await api.get('/admin/courses');
            setCourses(response.data.data);
        } catch (error) {
            toast.error("Gagal memuat data Mata Kuliah.");
        } finally {
            setIsLoadingCourses(false);
        }
    };

    const fetchRooms = async () => {
        setIsLoadingRooms(true);
        try {
            const response = await api.get('/admin/rooms');
            setRooms(response.data.data);
        } catch (error) {
            toast.error("Gagal memuat data Ruangan.");
        } finally {
            setIsLoadingRooms(false);
        }
    };

    const fetchLecturers = async () => {
        setIsLoadingLecturers(true);
        try {
            const response = await api.get('/admin/lecturers');
            setLecturers(response.data.data);
        } catch (error) {
            toast.error("Gagal memuat data Dosen.");
        } finally {
            setIsLoadingLecturers(false);
        }
    };

    const fetchStudents = async () => {
        setIsLoadingStudents(true);
        try {
            const response = await api.get('/admin/students');
            setStudents(response.data.data);
        } catch (error) {
            toast.error("Gagal memuat data Mahasiswa.");
        } finally {
            setIsLoadingStudents(false);
        }
    };

    // ==========================================
    // 2. EFFECT HOOKS (Trigger Fetch Data)
    // ==========================================
    useEffect(() => {
        setSearchQuery(""); // Reset pencarian setiap ganti tab

        if (activeTab === "mata_kuliah") fetchCourses();
        if (activeTab === "ruangan") fetchRooms();
        if (activeTab === "dosen") fetchLecturers();
        if (activeTab === "mahasiswa") {
            fetchStudents();
            fetchLecturers(); // Mahasiswa butuh data dosen untuk dropdown Pembimbing Akademik
        }
    }, [activeTab]);

    // ==========================================
    // 3. SUBMIT HANDLERS (Fungsi Simpan Data)
    // ==========================================
    const handleSubmitCourse = async (formData: CourseFormData) => {
        setIsSubmitting(true);
        const toastId = toast.loading("Menyimpan data Mata Kuliah...");
        try {
            if (formData.id) {
                await api.put(`/admin/courses/${formData.id}`, formData);
            } else {
                await api.post('/admin/courses', formData);
            }
            toast.success("Berhasil menyimpan data!", { id: toastId });
            setIsCourseModalOpen(false);
            fetchCourses();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Gagal menyimpan data.", { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitRoom = async (formData: RoomFormData) => {
        setIsSubmitting(true);
        const toastId = toast.loading("Menyimpan data Ruangan...");
        try {
            if (formData.id) {
                await api.put(`/admin/rooms/${formData.id}`, formData);
            } else {
                await api.post('/admin/rooms', formData);
            }
            toast.success("Berhasil menyimpan data!", { id: toastId });
            setIsRoomModalOpen(false);
            fetchRooms();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Gagal menyimpan data.", { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitLecturer = async (formData: LecturerFormData) => {
        setIsSubmitting(true);
        const toastId = toast.loading("Menyimpan data Dosen...");
        try {
            if (formData.id) {
                await api.put(`/admin/lecturers/${formData.id}`, formData);
            } else {
                await api.post('/admin/lecturers', formData);
            }
            toast.success("Berhasil menyimpan data!", { id: toastId });
            setIsLecturerModalOpen(false);
            fetchLecturers();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Gagal menyimpan data.", { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitStudent = async (formData: StudentFormData) => {
        setIsSubmitting(true);
        const toastId = toast.loading("Menyimpan data Mahasiswa...");
        try {
            if (formData.id) {
                await api.put(`/admin/students/${formData.id}`, formData);
            } else {
                await api.post('/admin/students', formData);
            }
            toast.success("Berhasil menyimpan data!", { id: toastId });
            setIsStudentModalOpen(false);
            fetchStudents();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Gagal menyimpan data.", { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    // ==========================================
    // 4. DELETE HANDLER (Fungsi Hapus Universal)
    // ==========================================
    const handleDelete = async (endpoint: string, id: number, name: string, refreshData: () => void) => {
        const result = await Swal.fire({
            title: 'Konfirmasi Hapus',
            html: `Apakah Anda yakin ingin menghapus <b>${name}</b>?<br/><span class="text-sm text-rose-600">Tindakan ini tidak dapat dibatalkan.</span>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e11d48',
            cancelButtonColor: '#94a3b8',
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Batal'
        });

        if (result.isConfirmed) {
            const toastId = toast.loading("Menghapus data...");
            try {
                await api.delete(`${endpoint}/${id}`);
                toast.success("Data berhasil dihapus!", { id: toastId });
                refreshData();
            } catch (error: any) {
                toast.error("Gagal menghapus data.", { id: toastId });
            }
        }
    };

    // ==========================================
    // 5. EDIT HANDLERS (Fungsi Buka Modal Edit)
    // ==========================================
    const handleEditCourse = (course: any) => {
        setSelectedCourse(course);
        setIsCourseModalOpen(true);
    };

    const handleEditRoom = (room: any) => {
        setSelectedRoom(room);
        setIsRoomModalOpen(true);
    };

    const handleEditLecturer = (lecturer: any) => {
        setSelectedLecturer({
            id: lecturer.id,
            nidn: lecturer.nidn,
            nama: lecturer.user.name,
            email: lecturer.user.email,
            prodi: lecturer.prodi,
            status_dosen: lecturer.status_dosen
        });
        setIsLecturerModalOpen(true);
    };

    const handleEditStudent = (student: any) => {
        setSelectedStudent({
            id: student.id,
            nim: student.nim,
            nama: student.user.name,
            email: student.user.email,
            prodi: student.prodi,
            angkatan: student.angkatan,
            status_mahasiswa: student.status_mahasiswa,
            ipk: student.ipk,
            dosen_pa_id: student.dosen_pa_id || ""
        });
        setIsStudentModalOpen(true);
    };

    // ==========================================
    // 6. FILTERING LOGIC (Pencarian Data)
    // ==========================================
    const search = searchQuery.toLowerCase();

    const filteredCourses = courses.filter(c =>
        c.nama_mk.toLowerCase().includes(search) || c.kode_mk.toLowerCase().includes(search)
    );

    const filteredRooms = rooms.filter(r =>
        r.nama_ruang.toLowerCase().includes(search) || r.kode_ruang.toLowerCase().includes(search)
    );

    const filteredLecturers = lecturers.filter(l =>
        l.user.name.toLowerCase().includes(search) || l.nidn.toLowerCase().includes(search)
    );

    const filteredStudents = students.filter(s =>
        s.user.name.toLowerCase().includes(search) || s.nim.toLowerCase().includes(search)
    );

    // ==========================================
    // RENDER UI
    // ==========================================
    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Master Data Global</h2>
                    <p className="text-slate-500 mt-1">Kelola data sivitas akademika dan infrastruktur kampus.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-full bg-white">
                        <Upload className="h-4 w-4 mr-2" /> Import CSV
                    </Button>
                    <Button variant="outline" className="rounded-full bg-white">
                        <Download className="h-4 w-4 mr-2 text-emerald-600" /> Export
                    </Button>
                    <Button
                        onClick={() => {
                            if (activeTab === "mata_kuliah") { setSelectedCourse(null); setIsCourseModalOpen(true); }
                            else if (activeTab === "ruangan") { setSelectedRoom(null); setIsRoomModalOpen(true); }
                            else if (activeTab === "dosen") { setSelectedLecturer(null); setIsLecturerModalOpen(true); }
                            else if (activeTab === "mahasiswa") { setSelectedStudent(null); setIsStudentModalOpen(true); }
                        }}
                        className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Plus className="h-4 w-4 mr-2" /> Tambah Data
                    </Button>
                </div>
            </div>

            {/* TABS NAVIGATION */}
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4 overflow-x-auto no-scrollbar">
                <button
                    onClick={() => setActiveTab("mahasiswa")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === "mahasiswa" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border"}`}
                >
                    <Users className="h-4 w-4" /> Mahasiswa
                </button>

                <button
                    onClick={() => setActiveTab("dosen")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === "dosen" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border"}`}
                >
                    <GraduationCap className="h-4 w-4" /> Dosen
                </button>

                <button
                    onClick={() => setActiveTab("mata_kuliah")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === "mata_kuliah" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border"}`}
                >
                    <BookOpen className="h-4 w-4" /> Mata Kuliah
                </button>

                <button
                    onClick={() => setActiveTab("ruangan")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === "ruangan" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border"}`}
                >
                    <DoorOpen className="h-4 w-4" /> Ruangan Kelas
                </button>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="bg-white rounded-2xl border shadow-sm p-6">

                {/* SEARCH BAR */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="w-4 h-4 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white border rounded-xl focus:ring-blue-500 block w-full pl-10 p-2.5"
                            placeholder="Cari data..."
                        />
                    </div>
                    <Button variant="outline" className="rounded-xl bg-white">
                        <Filter className="h-4 w-4 mr-2" /> Filter
                    </Button>
                </div>

                {/* --- RENDER TABEL (DARI KOMPONEN EXTERNAL) --- */}
                <div className="overflow-x-auto">
                    {activeTab === "mahasiswa" && (
                        <StudentTable
                            data={filteredStudents}
                            isLoading={isLoadingStudents}
                            onEdit={handleEditStudent}
                            onDelete={(id: number, name: string) => handleDelete('/admin/students', id, name, fetchStudents)}
                        />
                    )}

                    {activeTab === "dosen" && (
                        <LecturerTable
                            data={filteredLecturers}
                            isLoading={isLoadingLecturers}
                            onEdit={handleEditLecturer}
                            onDelete={(id: number, name: string) => handleDelete('/admin/lecturers', id, name, fetchLecturers)}
                        />
                    )}

                    {activeTab === "mata_kuliah" && (
                        <CourseTable
                            data={filteredCourses}
                            isLoading={isLoadingCourses}
                            onEdit={handleEditCourse}
                            onDelete={(id: number, name: string) => handleDelete('/admin/courses', id, name, fetchCourses)}
                        />
                    )}

                    {activeTab === "ruangan" && (
                        <RoomTable
                            data={filteredRooms}
                            isLoading={isLoadingRooms}
                            onEdit={handleEditRoom}
                            onDelete={(id: number, name: string) => handleDelete('/admin/rooms', id, name, fetchRooms)}
                        />
                    )}
                </div>
            </div>

            {/* --- RENDER SEMUA MODALS --- */}
            <CourseModal
                isOpen={isCourseModalOpen}
                onClose={() => setIsCourseModalOpen(false)}
                onSubmit={handleSubmitCourse}
                initialData={selectedCourse}
                isSubmitting={isSubmitting}
            />

            <RoomModal
                isOpen={isRoomModalOpen}
                onClose={() => setIsRoomModalOpen(false)}
                onSubmit={handleSubmitRoom}
                initialData={selectedRoom}
                isSubmitting={isSubmitting}
            />

            <LecturerModal
                isOpen={isLecturerModalOpen}
                onClose={() => setIsLecturerModalOpen(false)}
                onSubmit={handleSubmitLecturer}
                initialData={selectedLecturer}
                isSubmitting={isSubmitting}
            />

            <StudentModal
                isOpen={isStudentModalOpen}
                onClose={() => setIsStudentModalOpen(false)}
                onSubmit={handleSubmitStudent}
                initialData={selectedStudent}
                isSubmitting={isSubmitting}
                lecturers={lecturers}
            />

        </div>
    );
}