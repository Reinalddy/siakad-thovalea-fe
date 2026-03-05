import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpenCheck, CreditCard, Layers3 } from "lucide-react";

const features = [
  {
    icon: Layers3,
    title: "KRS Online & Otomatis",
    description: "Pemilihan mata kuliah cepat, bebas bentrok, dan sesuai jatah SKS.",
  },
  {
    icon: BookOpenCheck,
    title: "Pantau KHS & Transkrip",
    description: "Akses nilai semester dan akumulasi IPK secara real-time.",
  },
  {
    icon: CreditCard,
    title: "Integrasi Pembayaran UKT",
    description: "Cek tagihan dan bayar UKT via Payment Gateway terpercaya.",
  },
  {
    icon: CreditCard,
    title: "Integrasi Pembayaran UKT",
    description: "Cek tagihan dan bayar UKT via Payment Gateway terpercaya.",
  },

];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-950">
      {/* 1. Transparent Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-16 items-center justify-between ml-5">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-emerald-600" />
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              Thovalea<span className="text-emerald-600">SIAKAD</span>
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" className="rounded-full px-5 border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800">
                Masuk
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* 2. Modern Hero Section */}
      <main className="flex-1">
        <section className="container grid items-center gap-12 pt-20 pb-16 md:pt-28 md:pb-24 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-700 shadow-inner">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Versi Modern 2.0 Sudah Hadir
            </div>
            <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-7xl leading-[0.95] text-slate-950">
              Modernisasi Akademik Kampus Anda
            </h1>
            <p className="max-w-[600px] text-xl text-slate-700 sm:text-2xl">
              Sistem Informasi Akademik Thovalea memberikan kemudahan akses data, transparansi nilai, dan efisiensi administrasi dalam satu platform modern.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row mt-4">
              <Link href="/login">
                <Button size="lg" className="rounded-full px-8 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 text-md">
                  Mulai Sekarang
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full px-8 border-slate-300 text-slate-800 hover:bg-slate-100 text-md">
                Pelajari Fitur
              </Button>
            </div>
          </div>
          <div className="relative aspect-video rounded-xl bg-slate-900 shadow-2xl shadow-slate-900/10 border border-slate-800 p-2 lg:aspect-square lg:max-w-md lg:justify-self-center">
            {/* Dummy Mac Style Window decoration */}
            <div className="flex gap-1.5 p-2 border-b border-slate-800 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="w-full h-[90%] bg-slate-800 rounded-md flex items-center justify-center text-slate-600 font-mono text-xs">
              {/* Visual Placeholder */}
              [ Dashboard UI Preview ]
            </div>
          </div>
        </section>

        {/* 3. Clean Features Section */}
        <section className="bg-slate-100/70 border-y border-slate-200 py-20 md:py-28">
          <div className="space-y-16">
            <div className="mx-auto flex max-w-[700px] flex-col items-center gap-4 text-center">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-slate-950">Keunggulan Thovalea SIAKAD</h2>
              <p className="text-xl text-slate-700">Solusi digital terintegrasi untuk mahasiswa, dosen, dan staf administrasi.</p>
            </div>

            {/* Container flex-nya tetap sama */}
            <div className="flex flex-wrap justify-center gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  // KOREKSI DI SINI: Hapus flex-1, gunakan w-full untuk mobile, dan sm:w-[350px] untuk tablet ke atas
                  <div
                    key={index}
                    className="w-full sm:w-[350px] relative overflow-hidden rounded-3xl border bg-background p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 hover:border-emerald-100 group"
                  >
                    <div className="mb-6 inline-flex rounded-xl bg-emerald-100 p-3 group-hover:bg-emerald-500 group-hover:text-white transition-colors text-emerald-700">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="mb-3 text-2xl font-semibold tracking-tight text-slate-950">{feature.title}</h3>
                    <p className="text-lg text-slate-700 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* 4. Simple Footer */}
      <footer className="border-t bg-white">
        <div className="py-8 text-center text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} Thovalea Tech. Seluruh hak cipta dilindungi.
        </div>
      </footer>
    </div>
  );
}