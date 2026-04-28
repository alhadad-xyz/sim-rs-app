"use client";

import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { getPatients, Patient } from "@/lib/mock-data";

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Patient;
    direction: "asc" | "desc";
  }>({
    key: "tanggal_masuk",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchPatients = async () => {
    setLoading(true);
    const data = await getPatients();
    setPatients(data);
    setLoading(false);
  };

  useEffect(() => {
    const load = async () => {
      const data = await getPatients();
      setPatients(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleSort = (key: keyof Patient) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const filteredAndSortedPatients = useMemo(() => {
    return patients
      .filter((p) => {
        const query = searchQuery.toLowerCase();
        return (
          p.nama.toLowerCase().includes(query) ||
          p.nik.includes(query) ||
          p.nomor_rm.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
  }, [patients, searchQuery, sortConfig]);

  const totalPages = Math.ceil(filteredAndSortedPatients.length / itemsPerPage);
  const paginatedPatients = filteredAndSortedPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-background text-on-background flex h-screen overflow-hidden">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <main className="flex-1 flex flex-col ml-0 md:ml-60 h-screen overflow-hidden bg-surface-container-low transition-all duration-300">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-container-padding">
          <div className="max-w-7xl mx-auto space-y-stack-md">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider">
                    SIM RS
                  </span>
                  <span className="material-symbols-outlined text-[14px]">
                    chevron_right
                  </span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider">
                    Rawat Inap
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[24px]">
                      bed
                    </span>
                  </div>
                  <h2 className="font-h1 text-h1 text-on-surface">
                    Daftar Pasien Rawat Inap
                  </h2>
                </div>
              </div>

              <Link
                href="/pasien-masuk"
                className="bg-primary text-on-primary font-label-md text-label-md py-2 px-6 rounded-lg hover:bg-on-primary-fixed-variant transition-all duration-150 flex items-center justify-center gap-2 shadow-sm w-full md:w-auto"
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  person_add
                </span>
                Pasien Masuk
              </Link>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-inset-stretch">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                    Total Ruangan
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-outline">
                    meeting_room
                  </span>
                </div>
                <div className="font-h1 text-h1 text-on-surface">42</div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-inset-stretch">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                    ICU
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-outline">
                    monitor_heart
                  </span>
                </div>
                <div className="font-h1 text-h1 text-on-surface">5</div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-inset-stretch">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                    Pasien Aktif
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    personal_injury
                  </span>
                </div>
                <div className="font-h1 text-h1 text-primary">{loading ? "..." : patients.length}</div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-inset-stretch">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                    Rata-rata LOS
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-outline">
                    schedule
                  </span>
                </div>
                <div className="font-h1 text-h1 text-on-surface">
                  4.2 <span className="text-body-sm font-normal text-secondary">hari</span>
                </div>
              </div>
            </div>

            {/* Toolbar & Table Card */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col">
              {/* Toolbar */}
              <div className="p-3 border-b border-outline-variant bg-surface-bright flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 w-full md:max-w-md">
                  <div className="relative w-full">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-outline">
                      search
                    </span>
                    <input
                      className="w-full pl-9 pr-3 py-1.5 border border-outline-variant rounded focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-shadow font-body-sm text-body-sm text-on-surface"
                      placeholder="Cari Nama, NIK atau No. RM..."
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                  <button
                    onClick={fetchPatients}
                    className="p-1.5 rounded border border-outline-variant text-secondary hover:bg-surface-container transition-colors flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      refresh
                    </span>
                  </button>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button className="flex-1 md:flex-none p-1.5 rounded border border-outline-variant text-secondary hover:bg-surface-container transition-colors flex items-center justify-center gap-1 text-label-md font-medium">
                    <span className="material-symbols-outlined text-[18px]">
                      filter_list
                    </span>
                    Filter
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant">
                      <th
                        className="py-2 px-3 font-label-md text-label-md text-secondary w-24 cursor-pointer hover:text-primary transition-colors"
                        onClick={() => handleSort('nomor_rm')}
                      >
                        <div className="flex items-center gap-1">
                          No. RM
                          {sortConfig.key === 'nomor_rm' && (
                            <span className="material-symbols-outlined text-[14px]">
                              {sortConfig.direction === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th
                        className="py-2 px-3 font-label-md text-label-md text-secondary cursor-pointer hover:text-primary transition-colors"
                        onClick={() => handleSort('nama')}
                      >
                        <div className="flex items-center gap-1">
                          Nama Pasien
                          {sortConfig.key === 'nama' && (
                            <span className="material-symbols-outlined text-[14px]">
                              {sortConfig.direction === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="py-2 px-3 font-label-md text-label-md text-secondary">
                        Ruangan / Bed
                      </th>
                      <th className="py-2 px-3 font-label-md text-label-md text-secondary">
                        Dokter DPJP
                      </th>
                      <th className="py-2 px-3 font-label-md text-label-md text-secondary w-28 text-center">
                        Status
                      </th>
                      <th
                        className="py-2 px-3 font-label-md text-label-md text-secondary w-32 text-right cursor-pointer hover:text-primary transition-colors"
                        onClick={() => handleSort('tanggal_masuk')}
                      >
                        <div className="flex items-center justify-end gap-1">
                          Tgl. Masuk
                          {sortConfig.key === 'tanggal_masuk' && (
                            <span className="material-symbols-outlined text-[14px]">
                              {sortConfig.direction === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                            </span>
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="py-10 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-body-sm text-secondary font-medium">Memuat data pasien...</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredAndSortedPatients.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center">
                          <div className="flex flex-col items-center gap-2 text-outline">
                            <span className="material-symbols-outlined text-[48px]">person_off</span>
                            <p className="text-body-sm font-medium">Tidak ada pasien ditemukan</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      paginatedPatients.map((patient) => (
                        <tr
                          key={patient.id}
                          className="hover:bg-surface-container-low transition-colors cursor-pointer group"
                        >
                          <td className="py-2 px-3 font-code text-code text-secondary">
                            {patient.nomor_rm}
                          </td>
                          <td className="py-2 px-3">
                            <div className="font-body-sm text-body-sm font-medium text-on-surface">
                              {patient.nama}
                            </div>
                            <div className="text-[11px] text-outline">
                              {patient.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}, {calculateAge(patient.tanggal_lahir)} Thn
                            </div>
                          </td>
                          <td className="py-2 px-3 font-body-sm text-body-sm text-on-surface">
                            {patient.ruangan}
                          </td>
                          <td className="py-2 px-3 font-body-sm text-body-sm text-on-surface">
                            {patient.dpjp}
                          </td>
                          <td className="py-2 px-3 text-center">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${patient.status === 'Aktif' ? 'bg-green-50 text-green-700 border-green-200' :
                                patient.status === 'Kritis' ? 'bg-red-50 text-red-700 border-red-200' :
                                  'bg-blue-50 text-blue-700 border-blue-200'
                              }`}>
                              {patient.status}
                            </span>
                          </td>
                          <td className="py-2 px-3 font-body-sm text-body-sm text-on-surface text-right">
                            {new Date(patient.tanggal_masuk).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {!loading && filteredAndSortedPatients.length > 0 && (
                <div className="p-3 border-t border-outline-variant flex items-center justify-between bg-surface-container-lowest">
                  <div className="font-body-sm text-body-sm text-secondary">
                    Menampilkan {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredAndSortedPatients.length)} dari {filteredAndSortedPatients.length} pasien
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-1 rounded text-secondary hover:bg-surface-container disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                    </button>

                    <div className="flex items-center">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-label-md transition-colors ${currentPage === page
                              ? 'bg-primary text-on-primary'
                              : 'text-secondary hover:bg-surface-container'
                            }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-1 rounded text-secondary hover:bg-surface-container disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
