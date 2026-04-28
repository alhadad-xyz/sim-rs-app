import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col py-4 z-50">
      <div className="px-6 pb-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center text-on-primary-container">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_hospital
            </span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-blue-600 dark:text-blue-400 tracking-tight leading-tight">
              SIM RS
            </h1>
            <p className="font-body-sm text-body-sm leading-tight text-slate-500">
              Rawat Inap
            </p>
          </div>
        </div>
        <Link
          href="/pasien-masuk"
          className="w-full bg-primary text-on-primary py-2 px-4 rounded font-label-md text-label-md hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-2 mb-6"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Pendaftaran Pasien
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-3">
        <ul className="space-y-1">
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:transition-all duration-150 active:scale-[0.98] font-body-sm text-body-sm leading-tight"
            >
              <span className="material-symbols-outlined text-[20px]">
                dashboard
              </span>
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 rounded-md bg-slate-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold border-r-4 border-blue-600 font-body-sm text-body-sm leading-tight active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[20px]">
                patient_list
              </span>
              Daftar Pasien
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:transition-all duration-150 active:scale-[0.98] font-body-sm text-body-sm leading-tight"
            >
              <span className="material-symbols-outlined text-[20px]">
                meeting_room
              </span>
              Manajemen Bangsal
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:transition-all duration-150 active:scale-[0.98] font-body-sm text-body-sm leading-tight"
            >
              <span className="material-symbols-outlined text-[20px]">
                medical_services
              </span>
              Tindakan Medis
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:transition-all duration-150 active:scale-[0.98] font-body-sm text-body-sm leading-tight"
            >
              <span className="material-symbols-outlined text-[20px]">
                assessment
              </span>
              Laporan Operasional
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:transition-all duration-150 active:scale-[0.98] font-body-sm text-body-sm leading-tight"
            >
              <span className="material-symbols-outlined text-[20px]">
                settings
              </span>
              Pengaturan
            </Link>
          </li>
        </ul>
      </nav>
      <div className="px-3 mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
        <ul className="space-y-1">
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:transition-all duration-150 active:scale-[0.98] font-body-sm text-body-sm leading-tight"
            >
              <span className="material-symbols-outlined text-[20px]">
                help_outline
              </span>
              Bantuan
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:transition-all duration-150 active:scale-[0.98] font-body-sm text-body-sm leading-tight"
            >
              <span className="material-symbols-outlined text-[20px]">
                logout
              </span>
              Keluar
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
