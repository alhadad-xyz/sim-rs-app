export interface Patient {
  id: string;
  nomor_rm: string;
  nik: string;
  nama: string;
  diagnosa: string;
  tanggal_masuk: string;
  jam_masuk: string;
  ruangan: string;
  dpjp: string;
  status: 'Aktif' | 'Kritis' | 'Sembuh';
  jenis_kelamin: 'L' | 'P';
  tanggal_lahir: string;
  durasi_inap: number; // in days
}
