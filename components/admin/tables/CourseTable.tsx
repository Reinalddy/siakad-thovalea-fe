import { Edit, Trash2, Loader2, CheckSquare } from "lucide-react";

export default function CourseTable({ data, isLoading, onEdit, onDelete }: any) {
    if (isLoading) return <div className="py-16 text-center"><Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" /></div>;

    return (
        <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase border-b border-slate-100">
                <tr>
                    <th className="px-4 py-3 font-bold text-slate-900">Kode MK</th>
                    <th className="px-4 py-3 font-bold text-slate-900">Nama Mata Kuliah</th>
                    <th className="px-4 py-3 font-bold text-slate-900 text-center">SKS</th>
                    <th className="px-4 py-3 font-bold text-slate-900 text-center">Semester</th>
                    <th className="px-4 py-3 font-bold text-slate-900 text-center">Jenis</th>
                    <th className="px-4 py-3 font-bold text-slate-900 text-right">Aksi</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {data.length > 0 ? data.map((course: any) => (
                    <tr key={course.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-4 font-bold text-slate-600 uppercase">{course.kode_mk}</td>
                        <td className="px-4 py-4 font-bold text-slate-900">{course.nama_mk}</td>
                        <td className="px-4 py-4 text-center font-semibold text-slate-600">{course.sks}</td>
                        <td className="px-4 py-4 text-center text-slate-500">Smt {course.semester_plot}</td>
                        <td className="px-4 py-4 text-center">
                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${course.tipe === 'Wajib' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{course.tipe}</span>
                        </td>
                        <td className="px-4 py-4 text-right">
                            <button onClick={() => onEdit(course)} className="p-2 text-slate-400 hover:text-blue-600"><Edit className="h-4 w-4" /></button>
                            <button onClick={() => onDelete(course.id, course.nama_mk)} className="p-2 text-slate-400 hover:text-rose-600"><Trash2 className="h-4 w-4" /></button>
                        </td>
                    </tr>
                )) : <tr><td colSpan={6} className="text-center py-10 text-slate-500">Belum ada data mata kuliah.</td></tr>}
            </tbody>
        </table>
    );
}