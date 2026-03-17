import { Edit, Trash2, Loader2 } from "lucide-react";

export default function StudentTable({ data, isLoading, onEdit, onDelete }: any) {
    if (isLoading) return <div className="py-16 text-center"><Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" /></div>;

    return (
        <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase border-b border-slate-100">
                <tr>
                    <th className="px-4 py-3 font-bold text-slate-900">NIM / Nama</th>
                    <th className="px-4 py-3 font-bold text-slate-900">Prodi</th>
                    <th className="px-4 py-3 font-bold text-slate-900">Angkatan</th>
                    <th className="px-4 py-3 font-bold text-slate-900">Dosen PA</th>
                    <th className="px-4 py-3 font-bold text-slate-900">Status & IPK</th>
                    <th className="px-4 py-3 font-bold text-slate-900 text-right">Aksi</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {data.length > 0 ? data.map((student: any) => (
                    <tr key={student.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-4"><p className="font-bold text-slate-900">{student.user.name}</p><p className="text-xs text-slate-500 font-medium">{student.nim}</p></td>
                        <td className="px-4 py-4 text-slate-600">{student.prodi}</td>
                        <td className="px-4 py-4 font-semibold text-slate-700">{student.angkatan}</td>
                        <td className="px-4 py-4">{student.dosen_pa ? <span className="text-blue-700 text-xs font-semibold bg-blue-50 px-2 py-1 rounded">{student.dosen_pa.user.name}</span> : <span className="text-slate-400 text-xs italic">- Belum Diplot -</span>}</td>
                        <td className="px-4 py-4 flex flex-col items-start gap-1">
                            <span className={`px-2.5 py-0.5 rounded-md text-[10px] uppercase font-bold border ${student.status_mahasiswa === 'Aktif' ? 'bg-emerald-50 text-emerald-700' : student.status_mahasiswa === 'Cuti' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>{student.status_mahasiswa}</span>
                            <span className="text-xs font-bold text-slate-500">IPK: {student.ipk}</span>
                        </td>
                        <td className="px-4 py-4 text-right">
                            <button onClick={() => onEdit(student)} className="p-2 text-slate-400 hover:text-blue-600"><Edit className="h-4 w-4" /></button>
                            <button onClick={() => onDelete(student.id, student.user.name)} className="p-2 text-slate-400 hover:text-rose-600"><Trash2 className="h-4 w-4" /></button>
                        </td>
                    </tr>
                )) : <tr><td colSpan={6} className="text-center py-10 text-slate-500">Belum ada data mahasiswa.</td></tr>}
            </tbody>
        </table>
    );
}