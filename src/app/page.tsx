"use client";

import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import Link from "next/link";
import { useState } from "react";
import { usePatients } from "@/hooks/usePatients";
import { DashboardStats } from "@/components/DashboardStats";
import { FilterDropdown } from "@/components/FilterDropdown";
import { PatientTable } from "@/components/PatientTable";
import { Pagination } from "@/components/Pagination";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const {
    loading,
    error,
    searchQuery,
    setSearchQuery,
    sortConfig,
    handleSort,
    currentPage,
    setCurrentPage,
    filters,
    setFilters,
    uniqueRuangan,
    uniqueDPJP,
    activeFiltersCount,
    stats,
    paginatedPatients,
    filteredAndSortedPatients,
    totalPages,
    itemsPerPage,
  } = usePatients();

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

  return (
    <div className="bg-background text-on-background flex h-screen overflow-hidden">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main className="flex-1 flex flex-col ml-0 md:ml-60 h-screen overflow-hidden bg-surface-container-low transition-all duration-300">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-container-padding">
          <div className="max-w-7xl mx-auto space-y-stack-md">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md mb-1">
                  <span>SIM RS</span>
                  <span className="material-symbols-outlined text-[16px]">
                    chevron_right
                  </span>
                  <span className="text-secondary tracking-wider">
                    RAWAT INAP
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

            {error ? (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
                {error}
              </div>
            ) : (
              <>
                {/* KPI Strip */}
                <DashboardStats stats={stats} loading={loading} />

                {/* Toolbar & Table Card */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col relative">
                  {/* Toolbar */}
                  <div className="p-3 border-b border-outline-variant bg-surface-bright flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-t-xl">
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
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <FilterDropdown
                        filters={filters}
                        setFilters={setFilters}
                        uniqueRuangan={uniqueRuangan}
                        uniqueDPJP={uniqueDPJP}
                        activeFiltersCount={activeFiltersCount}
                        isFilterMenuOpen={isFilterMenuOpen}
                        setIsFilterMenuOpen={setIsFilterMenuOpen}
                        onFilterChange={() => setCurrentPage(1)}
                      />
                    </div>
                  </div>

                  {/* Table */}
                  <PatientTable
                    patients={paginatedPatients}
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                    activeFiltersCount={activeFiltersCount}
                    searchQuery={searchQuery}
                    setFilters={setFilters}
                    setSearchQuery={setSearchQuery}
                    calculateAge={calculateAge}
                  />

                  {/* Pagination */}
                  {!loading && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      totalItems={filteredAndSortedPatients.length}
                      itemsPerPage={itemsPerPage}
                      onPageChange={setCurrentPage}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
