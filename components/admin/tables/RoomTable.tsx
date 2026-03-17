import { Edit, Trash2, Loader2, Users } from "lucide-react";

export default function RoomTable({ data, isLoading, onEdit, onDelete }: any) {
    if (isLoading) return <div className="py-16 text-center"><Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" /></div>;

    return (
        <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase border-b border-slate-100">
                <tr>
                    <th className="px-4 py-3 font-bold text-slate-900">Kode Ruang</th>
                    <th className="px-4 py-3 font-bold text-slate-900">Nama Ruangan</th>
                    <th className="px-4 py-3 font-bold text-slate-900 text-center">Kapasitas</th>
                    <th className="px-4 py-3 font-bold text-slate-900 text-center">Jenis</th>
                    <th className="px-4 py-3 font-bold text-slate-900 text-right">Aksi</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {data.length > 0 ? data.map((room: any) => (
                    <tr key={room.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-4 font-bold text-slate-900 uppercase">{room.kode_ruang}</td>
                        <td className="px-4 py-4 font-bold text-slate-600">{room.nama_ruang}</td>
                        <td className="px-4 py-4 text-center"><span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-slate-700 font-bold"><Users className="h-3 w-3" /> {room.kapasitas}</span></td>
                        <td className="px-4 py-4 text-center"><span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${room.jenis_ruang === 'Teori' ? 'bg-indigo-50 text-indigo-700' : 'bg-purple-50 text-purple-700'}`}>{room.jenis_ruang}</span></td>
                        <td className="px-4 py-4 text-right">
                            <button onClick={() => onEdit(room)} className="p-2 text-slate-400 hover:text-blue-600"><Edit className="h-4 w-4" /></button>
                            <button onClick={() => onDelete(room.id, room.nama_ruang)} className="p-2 text-slate-400 hover:text-rose-600"><Trash2 className="h-4 w-4" /></button>
                        </td>
                    </tr>
                )) : <tr><td colSpan={5} className="text-center py-10 text-slate-500">Belum ada data ruangan kelas.</td></tr>}
            </tbody>
        </table>
    );
}