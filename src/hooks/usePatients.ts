import { useState, useEffect, useMemo } from "react";
import { getPatients } from "@/lib/mock-data";
import { Patient } from "@/types/patient";

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Patient;
    direction: "asc" | "desc";
  }>({
    key: "tanggal_masuk",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "All",
    ruangan: "All",
    jenis_kelamin: "All",
    dpjp: "All",
  });
  const itemsPerPage = 5;

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPatients();
        setPatients(data);
      } catch (err) {
        setError("Gagal memuat data pasien. Silakan coba lagi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSort = (key: keyof Patient) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const uniqueRuangan = useMemo(() => {
    const values = patients.map(p => p.ruangan.split(' - ')[0]);
    return ["All", ...Array.from(new Set(values))];
  }, [patients]);

  const uniqueDPJP = useMemo(() => {
    const values = patients.map(p => p.dpjp);
    return ["All", ...Array.from(new Set(values))];
  }, [patients]);

  const activeFiltersCount = Object.values(filters).filter(v => v !== "All").length;

  const stats = useMemo(() => {
    const totalRooms = new Set(patients.map(p => p.ruangan)).size;
    const icuCount = patients.filter(p => p.ruangan.toLowerCase().includes('icu')).length;
    const activeCount = patients.filter(p => p.status === 'Aktif' || p.status === 'Kritis').length;
    const avgLOS = patients.length > 0 
      ? (patients.reduce((sum, p) => sum + p.durasi_inap, 0) / patients.length).toFixed(1)
      : "0";

    return { totalRooms, icuCount, activeCount, avgLOS };
  }, [patients]);

  const filteredAndSortedPatients = useMemo(() => {
    return patients
      .filter((p) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = (
          p.nama.toLowerCase().includes(query) ||
          p.nik.includes(query) ||
          p.nomor_rm.toLowerCase().includes(query)
        );
        const matchesStatus = filters.status === "All" || p.status === filters.status;
        const matchesRuangan = filters.ruangan === "All" || p.ruangan.includes(filters.ruangan);
        const matchesJK = filters.jenis_kelamin === "All" || p.jenis_kelamin === filters.jenis_kelamin;
        const matchesDPJP = filters.dpjp === "All" || p.dpjp === filters.dpjp;

        return matchesSearch && matchesStatus && matchesRuangan && matchesJK && matchesDPJP;
      })
      .sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
  }, [patients, searchQuery, sortConfig, filters]);

  const totalPages = Math.ceil(filteredAndSortedPatients.length / itemsPerPage);
  const paginatedPatients = filteredAndSortedPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    patients,
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
    itemsPerPage
  };
}
