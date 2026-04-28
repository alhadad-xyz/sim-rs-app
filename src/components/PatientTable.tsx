import { Patient } from "@/types/patient";

interface PatientTableProps {
  patients: Patient[];
  sortConfig: { key: keyof Patient; direction: "asc" | "desc" };
  handleSort: (key: keyof Patient) => void;
  activeFiltersCount: number;
  searchQuery: string;
  setFilters: React.Dispatch<
    React.SetStateAction<{
      status: string;
      ruangan: string;
      jenis_kelamin: string;
      dpjp: string;
    }>
  >;
  setSearchQuery: (query: string) => void;
  calculateAge: (birthDate: string) => number;
}

export function PatientTable({
  patients,
  sortConfig,
  handleSort,
  activeFiltersCount,
  searchQuery,
  setFilters,
  setSearchQuery,
  calculateAge,
}: PatientTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse whitespace-nowrap">
        <thead>
          <tr className="bg-surface-container-low border-b border-outline-variant">
            <th
              className="py-2 px-3 font-label-md text-label-md text-secondary w-24 cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleSort("nomor_rm")}
            >
              <div className="flex items-center gap-1">
                No. RM
                {sortConfig.key === "nomor_rm" && (
                  <span className="material-symbols-outlined text-[14px]">
                    {sortConfig.direction === "asc"
                      ? "arrow_upward"
                      : "arrow_downward"}
                  </span>
                )}
              </div>
            </th>
            <th
              className="py-2 px-3 font-label-md text-label-md text-secondary w-32 cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleSort("nik")}
            >
              <div className="flex items-center gap-1">
                NIK
                {sortConfig.key === "nik" && (
                  <span className="material-symbols-outlined text-[14px]">
                    {sortConfig.direction === "asc"
                      ? "arrow_upward"
                      : "arrow_downward"}
                  </span>
                )}
              </div>
            </th>
            <th
              className="py-2 px-3 font-label-md text-label-md text-secondary cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleSort("nama")}
            >
              <div className="flex items-center gap-1">
                Nama Pasien
                {sortConfig.key === "nama" && (
                  <span className="material-symbols-outlined text-[14px]">
                    {sortConfig.direction === "asc"
                      ? "arrow_upward"
                      : "arrow_downward"}
                  </span>
                )}
              </div>
            </th>
            <th
              className="py-2 px-3 font-label-md text-label-md text-secondary cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleSort("ruangan")}
            >
              <div className="flex items-center gap-1">
                Ruangan / Bed
                {sortConfig.key === "ruangan" && (
                  <span className="material-symbols-outlined text-[14px]">
                    {sortConfig.direction === "asc"
                      ? "arrow_upward"
                      : "arrow_downward"}
                  </span>
                )}
              </div>
            </th>
            <th
              className="py-2 px-3 font-label-md text-label-md text-secondary cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleSort("dpjp")}
            >
              <div className="flex items-center gap-1">
                Dokter DPJP
                {sortConfig.key === "dpjp" && (
                  <span className="material-symbols-outlined text-[14px]">
                    {sortConfig.direction === "asc"
                      ? "arrow_upward"
                      : "arrow_downward"}
                  </span>
                )}
              </div>
            </th>
            <th
              className="py-2 px-3 font-label-md text-label-md text-secondary w-28 text-center cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center justify-center gap-1">
                Status
                {sortConfig.key === "status" && (
                  <span className="material-symbols-outlined text-[14px]">
                    {sortConfig.direction === "asc"
                      ? "arrow_upward"
                      : "arrow_downward"}
                  </span>
                )}
              </div>
            </th>
            <th
              className="py-2 px-3 font-label-md text-label-md text-secondary w-32 cursor-pointer hover:text-primary transition-colors text-right"
              onClick={() => handleSort("tanggal_masuk")}
            >
              <div className="flex items-center justify-end gap-1">
                Tgl Masuk
                {sortConfig.key === "tanggal_masuk" && (
                  <span className="material-symbols-outlined text-[14px]">
                    {sortConfig.direction === "asc"
                      ? "arrow_upward"
                      : "arrow_downward"}
                  </span>
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant bg-surface-lowest">
          {patients.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-12 text-center rounded-b-xl">
                <div className="flex flex-col items-center gap-2 text-outline">
                  <span className="material-symbols-outlined text-[48px]">
                    person_off
                  </span>
                  <p className="text-body-sm font-medium">
                    {activeFiltersCount > 0 || searchQuery
                      ? "Tidak ada pasien yang cocok dengan kriteria filter"
                      : "Tidak ada pasien ditemukan"}
                  </p>
                  {(activeFiltersCount > 0 || searchQuery) && (
                    <button
                      onClick={() => {
                        setFilters({
                          status: "All",
                          ruangan: "All",
                          jenis_kelamin: "All",
                          dpjp: "All",
                        });
                        setSearchQuery("");
                      }}
                      className="text-primary text-body-sm font-medium hover:underline mt-2"
                    >
                      Bersihkan semua filter
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ) : (
            patients.map((patient) => (
              <tr
                key={patient.id}
                className="hover:bg-surface-container-low transition-colors cursor-pointer group"
              >
                <td className="py-2 px-3 font-code text-code text-secondary">
                  {patient.nomor_rm}
                </td>
                <td className="py-2 px-3 font-body-sm text-body-sm text-secondary">
                  {patient.nik}
                </td>
                <td className="py-2 px-3">
                  <div className="font-body-sm text-body-sm font-medium text-on-surface">
                    {patient.nama}
                  </div>
                  <div className="text-[11px] text-outline">
                    {patient.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"},{" "}
                    {calculateAge(patient.tanggal_lahir)} Thn
                  </div>
                </td>
                <td className="py-2 px-3 font-body-sm text-body-sm text-on-surface">
                  {patient.ruangan}
                </td>
                <td className="py-2 px-3 font-body-sm text-body-sm text-on-surface">
                  {patient.dpjp}
                </td>
                <td className="py-2 px-3 text-center">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${
                      patient.status === "Aktif"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : patient.status === "Kritis"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}
                  >
                    {patient.status}
                  </span>
                </td>
                <td className="py-2 px-3 font-body-sm text-body-sm text-on-surface text-right">
                  {new Date(patient.tanggal_masuk).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
