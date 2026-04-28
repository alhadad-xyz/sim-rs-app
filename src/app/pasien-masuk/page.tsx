"use client";

import { FormHeader } from "@/components/FormHeader";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { savePatient } from "@/lib/mock-data";

export default function PasienMasuk() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    nomor_rm: "",
    nik: "",
    tanggal_lahir: "",
    jenis_kelamin: "" as 'L' | 'P',
    tanggal_masuk: new Date().toISOString().split('T')[0],
    jam_masuk: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }).replace('.', ':'),
    ruangan: "",
    dpjp: "",
    diagnosa: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nama) newErrors.nama = "Nama lengkap wajib diisi";
    if (!formData.nomor_rm) newErrors.nomor_rm = "Nomor RM wajib diisi";
    if (!formData.nik) {
      newErrors.nik = "NIK wajib diisi";
    } else if (formData.nik.length !== 16) {
      newErrors.nik = "NIK harus 16 digit";
    }
    if (!formData.tanggal_lahir) newErrors.tanggal_lahir = "Tanggal lahir wajib diisi";
    if (!formData.jenis_kelamin) newErrors.jenis_kelamin = "Jenis kelamin wajib dipilih";
    if (!formData.ruangan) newErrors.ruangan = "Ruangan wajib dipilih";
    if (!formData.dpjp) newErrors.dpjp = "Dokter DPJP wajib dipilih";
    if (!formData.diagnosa) newErrors.diagnosa = "Diagnosa masuk wajib diisi";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await savePatient(formData);
      router.push("/");
    } catch (error) {
      console.error("Failed to save patient:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md min-h-screen flex flex-col">
      <FormHeader />
      <main className="flex-1 p-container-padding overflow-y-auto flex justify-center">
        <div className="w-full max-w-4xl flex flex-col gap-stack-md">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
            <Link className="hover:text-primary transition-colors" href="/">
              SIM RS
            </Link>
            <span className="material-symbols-outlined text-[16px]">
              chevron_right
            </span>
            <Link className="hover:text-primary transition-colors" href="/">
              Rawat Inap
            </Link>
            <span className="material-symbols-outlined text-[16px]">
              chevron_right
            </span>
            <span className="text-on-surface">Pasien Masuk</span>
          </nav>

          {/* Page Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary-container/10 text-primary p-2 rounded-lg flex items-center justify-center">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                person_add
              </span>
            </div>
            <h1 className="font-h1 text-h1 text-on-surface">
              Pendaftaran Pasien Baru
            </h1>
          </div>

          {/* Form Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05)] relative">
            {loading && (
              <div className="absolute inset-0 bg-surface/50 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-lg">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-body-sm font-medium text-primary">Menyimpan data...</span>
                </div>
              </div>
            )}
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {/* Grid Section: Identitas Pasien */}
              <div className="flex flex-col gap-4">
                <h2 className="font-h3 text-h3 text-on-surface border-b border-surface-variant pb-2">
                  Identitas Pasien
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {/* Nama Lengkap */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5"
                      htmlFor="nama"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        person
                      </span>
                      Nama Lengkap
                    </label>
                    <input
                      className={`w-full bg-surface-container-lowest border rounded focus:ring-1 focus:outline-none p-inset-squish font-body-sm text-body-sm text-on-surface transition-colors ${
                        errors.nama ? 'border-error focus:ring-error' : 'border-outline-variant focus:border-primary focus:ring-primary'
                      }`}
                      id="nama"
                      name="nama"
                      placeholder="Masukkan nama lengkap pasien"
                      type="text"
                      value={formData.nama}
                      onChange={handleChange}
                    />
                    {errors.nama && <span className="text-error text-[11px] font-medium">{errors.nama}</span>}
                  </div>

                  {/* NIK */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5"
                      htmlFor="nik"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        fingerprint
                      </span>
                      NIK (KTP)
                    </label>
                    <input
                      className={`w-full bg-surface-container-lowest border rounded focus:ring-1 focus:outline-none p-inset-squish font-body-sm text-body-sm text-on-surface transition-colors ${
                        errors.nik ? 'border-error focus:ring-error' : 'border-outline-variant focus:border-primary focus:ring-primary'
                      }`}
                      id="nik"
                      name="nik"
                      placeholder="16 Digit NIK"
                      type="text"
                      maxLength={16}
                      value={formData.nik}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setFormData(prev => ({ ...prev, nik: val }));
                      }}
                    />
                    {errors.nik && <span className="text-error text-[11px] font-medium">{errors.nik}</span>}
                  </div>

                  {/* Nomor RM */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5"
                      htmlFor="nomor_rm"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        id_card
                      </span>
                      Nomor Rekam Medis (RM)
                    </label>
                    <input
                      className={`w-full bg-surface-container-lowest border rounded focus:ring-1 focus:outline-none p-inset-squish font-body-sm text-body-sm text-on-surface transition-colors ${
                        errors.nomor_rm ? 'border-error focus:ring-error' : 'border-outline-variant focus:border-primary focus:ring-primary'
                      }`}
                      id="nomor_rm"
                      name="nomor_rm"
                      placeholder="Contoh: RM-123456"
                      type="text"
                      value={formData.nomor_rm}
                      onChange={handleChange}
                    />
                    {errors.nomor_rm && <span className="text-error text-[11px] font-medium">{errors.nomor_rm}</span>}
                  </div>

                  {/* Tanggal Lahir */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5"
                      htmlFor="tanggal_lahir"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        calendar_today
                      </span>
                      Tanggal Lahir
                    </label>
                    <input
                      className={`w-full bg-surface-container-lowest border rounded focus:ring-1 focus:outline-none p-inset-squish font-body-sm text-body-sm text-on-surface transition-colors ${
                        errors.tanggal_lahir ? 'border-error focus:ring-error' : 'border-outline-variant focus:border-primary focus:ring-primary'
                      }`}
                      id="tanggal_lahir"
                      name="tanggal_lahir"
                      type="date"
                      value={formData.tanggal_lahir}
                      onChange={handleChange}
                    />
                    {errors.tanggal_lahir && <span className="text-error text-[11px] font-medium">{errors.tanggal_lahir}</span>}
                  </div>

                  {/* Jenis Kelamin */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5"
                      htmlFor="jenis_kelamin"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        wc
                      </span>
                      Jenis Kelamin
                    </label>
                    <div className="relative">
                      <select
                        className={`w-full bg-surface-container-lowest border rounded focus:ring-1 focus:outline-none p-inset-squish pr-8 font-body-sm text-body-sm text-on-surface appearance-none transition-colors ${
                          errors.jenis_kelamin ? 'border-error focus:ring-error' : 'border-outline-variant focus:border-primary focus:ring-primary'
                        }`}
                        id="jenis_kelamin"
                        name="jenis_kelamin"
                        value={formData.jenis_kelamin}
                        onChange={handleChange}
                      >
                        <option value="">Pilih jenis kelamin</option>
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">
                        arrow_drop_down
                      </span>
                    </div>
                    {errors.jenis_kelamin && <span className="text-error text-[11px] font-medium">{errors.jenis_kelamin}</span>}
                  </div>
                </div>
              </div>

              {/* Grid Section: Data Admisi */}
              <div className="flex flex-col gap-4 mt-2">
                <h2 className="font-h3 text-h3 text-on-surface border-b border-surface-variant pb-2">
                  Data Admisi Rawat Inap
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {/* Tanggal Masuk */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5"
                      htmlFor="tanggal_masuk"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        login
                      </span>
                      Tanggal Masuk
                    </label>
                    <input
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none p-inset-squish font-body-sm text-body-sm text-on-surface transition-colors"
                      id="tanggal_masuk"
                      name="tanggal_masuk"
                      type="date"
                      value={formData.tanggal_masuk}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Jam Masuk */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5"
                      htmlFor="jam_masuk"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        schedule
                      </span>
                      Jam Masuk
                    </label>
                    <input
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none p-inset-squish font-body-sm text-body-sm text-on-surface transition-colors"
                      id="jam_masuk"
                      name="jam_masuk"
                      type="time"
                      value={formData.jam_masuk}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Ruangan/Bangsal */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5"
                      htmlFor="ruangan"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        meeting_room
                      </span>
                      Ruangan / Bangsal
                    </label>
                    <div className="relative">
                      <select
                        className={`w-full bg-surface-container-lowest border rounded focus:ring-1 focus:outline-none p-inset-squish pr-8 font-body-sm text-body-sm text-on-surface appearance-none transition-colors ${
                          errors.ruangan ? 'border-error focus:ring-error' : 'border-outline-variant focus:border-primary focus:ring-primary'
                        }`}
                        id="ruangan"
                        name="ruangan"
                        value={formData.ruangan}
                        onChange={handleChange}
                      >
                        <option value="">Pilih ruangan...</option>
                        <option value="Melati 1 (Kelas I)">Melati 1 (Kelas I)</option>
                        <option value="Melati 2 (Kelas II)">Melati 2 (Kelas II)</option>
                        <option value="Anggrek (VIP)">Anggrek (VIP)</option>
                        <option value="ICU">ICU</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">
                        arrow_drop_down
                      </span>
                    </div>
                    {errors.ruangan && <span className="text-error text-[11px] font-medium">{errors.ruangan}</span>}
                  </div>

                  {/* Dokter DPJP */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5"
                      htmlFor="dpjp"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        stethoscope
                      </span>
                      Dokter Penanggung Jawab (DPJP)
                    </label>
                    <div className="relative">
                      <select
                        className={`w-full bg-surface-container-lowest border rounded focus:ring-1 focus:outline-none p-inset-squish pr-8 font-body-sm text-body-sm text-on-surface appearance-none transition-colors ${
                          errors.dpjp ? 'border-error focus:ring-error' : 'border-outline-variant focus:border-primary focus:ring-primary'
                        }`}
                        id="dpjp"
                        name="dpjp"
                        value={formData.dpjp}
                        onChange={handleChange}
                      >
                        <option value="">Pilih dokter...</option>
                        <option value="dr. Andi Suryawan, Sp.PD">dr. Andi Suryawan, Sp.PD</option>
                        <option value="dr. Budi Santoso, Sp.B">dr. Budi Santoso, Sp.B</option>
                        <option value="dr. Citra Kirana, Sp.A">dr. Citra Kirana, Sp.A</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">
                        arrow_drop_down
                      </span>
                    </div>
                    {errors.dpjp && <span className="text-error text-[11px] font-medium">{errors.dpjp}</span>}
                  </div>

                  {/* Diagnosa Masuk */}
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label
                      className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5"
                      htmlFor="diagnosa"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        medical_information
                      </span>
                      Diagnosa Masuk
                    </label>
                    <textarea
                      className={`w-full bg-surface-container-lowest border rounded focus:ring-1 focus:outline-none p-inset-squish font-body-sm text-body-sm text-on-surface transition-colors min-h-[100px] resize-y ${
                        errors.diagnosa ? 'border-error focus:ring-error' : 'border-outline-variant focus:border-primary focus:ring-primary'
                      }`}
                      id="diagnosa"
                      name="diagnosa"
                      placeholder="Masukkan diagnosa awal pasien..."
                      value={formData.diagnosa}
                      onChange={handleChange}
                    />
                    {errors.diagnosa && <span className="text-error text-[11px] font-medium">{errors.diagnosa}</span>}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-between pt-6 mt-4 border-t border-surface-variant">
                <Link
                  href="/"
                  className="px-4 py-2 border border-outline-variant bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded hover:bg-surface-container hover:border-outline transition-all duration-150 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_back
                  </span>
                  Kembali ke Daftar
                </Link>
                <button
                  className="px-6 py-2 bg-primary text-on-primary font-label-md text-label-md rounded hover:bg-on-primary-fixed-variant transition-all duration-150 flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={loading}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    save
                  </span>
                  {loading ? "Menyimpan..." : "Simpan & Masuk"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
