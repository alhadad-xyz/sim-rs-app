interface FilterDropdownProps {
  filters: {
    status: string;
    ruangan: string;
    jenis_kelamin: string;
    dpjp: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    status: string;
    ruangan: string;
    jenis_kelamin: string;
    dpjp: string;
  }>>;
  uniqueRuangan: string[];
  uniqueDPJP: string[];
  activeFiltersCount: number;
  isFilterMenuOpen: boolean;
  setIsFilterMenuOpen: (open: boolean) => void;
  onFilterChange: () => void;
}

export function FilterDropdown({
  filters,
  setFilters,
  uniqueRuangan,
  uniqueDPJP,
  activeFiltersCount,
  isFilterMenuOpen,
  setIsFilterMenuOpen,
  onFilterChange,
}: FilterDropdownProps) {
  return (
    <div className="relative flex-1 md:flex-none">
      <button
        onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
        className={`w-full md:w-auto p-1.5 rounded border border-outline-variant transition-colors flex items-center justify-center gap-1 text-label-md font-medium ${
          activeFiltersCount > 0
            ? "bg-primary/10 text-primary border-primary/20"
            : "text-secondary hover:bg-surface-container"
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">
          filter_list
        </span>
        Filter {activeFiltersCount > 0 && `(${activeFiltersCount})`}
      </button>
      {isFilterMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsFilterMenuOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-elevation-3 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-4 space-y-4 relative z-50">
              <div className="flex items-center justify-between border-b border-outline-variant pb-2">
                <span className="font-h3 text-label-md text-on-surface">
                  Filters
                </span>
                <button
                  onClick={() => {
                    setFilters({
                      status: "All",
                      ruangan: "All",
                      jenis_kelamin: "All",
                      dpjp: "All",
                    });
                    onFilterChange();
                  }}
                  className="text-primary text-[11px] font-medium hover:underline"
                >
                  Reset All
                </button>
              </div>

              {/* Status Filter */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-outline uppercase tracking-wider">
                  Status
                </label>
                <div className="grid grid-cols-2 gap-1">
                  {["All", "Aktif", "Kritis", "Sembuh"].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setFilters((prev) => ({ ...prev, status }));
                        onFilterChange();
                      }}
                      className={`px-2 py-1.5 rounded text-left text-[11px] transition-colors ${
                        filters.status === status
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container-low text-on-surface hover:bg-surface-container"
                      }`}
                    >
                      {status === "All" ? "Semua" : status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ruangan Filter */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-outline uppercase tracking-wider">
                  Ruangan / Ward
                </label>
                <select
                  value={filters.ruangan}
                  onChange={(e) => {
                    setFilters((prev) => ({
                      ...prev,
                      ruangan: e.target.value,
                    }));
                    onFilterChange();
                  }}
                  className="w-full bg-surface-container-low border border-outline-variant rounded px-2 py-1.5 text-body-sm text-on-surface outline-none focus:border-primary"
                >
                  {uniqueRuangan.map((r) => (
                    <option key={r} value={r}>
                      {r === "All" ? "Semua Ruangan" : r}
                    </option>
                  ))}
                </select>
              </div>

              {/* JK Filter */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-outline uppercase tracking-wider">
                  Jenis Kelamin
                </label>
                <div className="flex gap-2">
                  {["All", "L", "P"].map((jk) => (
                    <button
                      key={jk}
                      onClick={() => {
                        setFilters((prev) => ({
                          ...prev,
                          jenis_kelamin: jk,
                        }));
                        onFilterChange();
                      }}
                      className={`flex-1 py-1.5 rounded text-center text-[11px] transition-colors ${
                        filters.jenis_kelamin === jk
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container-low text-on-surface hover:bg-surface-container"
                      }`}
                    >
                      {jk === "All"
                        ? "Semua"
                        : jk === "L"
                        ? "Laki-laki"
                        : "Perempuan"}
                    </button>
                  ))}
                </div>
              </div>

              {/* DPJP Filter */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-outline uppercase tracking-wider">
                  Dokter DPJP
                </label>
                <select
                  value={filters.dpjp}
                  onChange={(e) => {
                    setFilters((prev) => ({ ...prev, dpjp: e.target.value }));
                    onFilterChange();
                  }}
                  className="w-full bg-surface-container-low border border-outline-variant rounded px-2 py-1.5 text-body-sm text-on-surface outline-none focus:border-primary"
                >
                  {uniqueDPJP.map((d) => (
                    <option key={d} value={d}>
                      {d === "All" ? "Semua Dokter" : d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
