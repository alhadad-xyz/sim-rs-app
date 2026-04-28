import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-6 h-14">
      <div className="flex items-center gap-6">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          SIM RS / Rawat Inap
        </span>
        <nav className="hidden md:flex items-center gap-6 h-full pt-4">
          <Link
            href="#"
            className="font-body-sm text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 pb-4"
          >
            Monitoring
          </Link>
          <Link
            href="#"
            className="font-body-sm text-sm font-medium text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 pb-4"
          >
            Visite
          </Link>
          <Link
            href="#"
            className="font-body-sm text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 pb-4"
          >
            Bed Management
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-slate-500">
          <button className="p-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-blue-500/20">
            <span className="material-symbols-outlined text-[20px]">
              notifications
            </span>
          </button>
          <button className="p-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-blue-500/20">
            <span className="material-symbols-outlined text-[20px]">apps</span>
          </button>
          <button className="p-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-blue-500/20">
            <span className="material-symbols-outlined text-[20px]">
              account_circle
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
