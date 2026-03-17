import { Edit, Trash2, Loader2, Mail } from "lucide-react";

export default function LecturerTable({ data, isLoading, onEdit, onDelete }: any) {
    if (isLoading) return <div className="py-16 text-center"><Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" /></div>;

    return (
        <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase border-b border-slate-100">
                <tr>
                    <th className="px-4 py-3 font-bold text-slate-900">NIDN</th>
                    <th className="px-4 py-3 font-bold text-slate-900">Nama & Gelar</th>
                    <th className="px-4 py-3 font-bold text-slate-900">Email</th>
                    <th className="px-4 py-3 font-bold text-slate-900">Prodi</th>
                    <th className="px-4 py-3 font-bold text-slate-900">Status</th>
                    <th className="px-4 py-3 font-bold text-slate-900 text-right">Aksi</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {data.length > 0 ? data.map((lecturer: any) => (
                    <tr key={lecturer.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-4 font-bold text-slate-600">{lecturer.nidn}</td>
                        <td className="px-4 py-4 font-bold text-slate-900">{lecturer.user.name}</td>
                        <td className="px-4 py-4 text-slate-500 flex items-center gap-1.5"><Mail className="h-3 w-3" /> {lecturer.user.email}</td>
                        <td className="px-4 py-4 text-slate-600">{lecturer.prodi}</td>
                        <td className="px-4 py-4"><span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${lecturer.status_dosen === 'Tetap' ? 'bg-emerald-50 text-emerald-700' : lecturer.status_dosen === 'LB' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>{lecturer.status_dosen}</span></td>
                        <td className="px-4 py-4 text-right">
                            <button onClick={() => onEdit(lecturer)} className="p-2 text-slate-400 hover:text-blue-600"><Edit className="h-4 w-4" /></button>
                            <button onClick={() => onDelete(lecturer.id, lecturer.user.name)} className="p-2 text-slate-400 hover:text-rose-600"><Trash2 className="h-4 w-4" /></button>
                        </td>
                    </tr>
                )) : <tr><td colSpan={6} className="text-center py-10 text-slate-500">Belum ada data dosen.</td></tr>}
            </tbody>
        </table>
    );
}