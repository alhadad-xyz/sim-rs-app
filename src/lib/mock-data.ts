
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

let MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    nomor_rm: 'RM-09211',
    nik: '3201010101010001',
    nama: 'Budi Santoso',
    diagnosa: 'Dyspepsia',
    tanggal_masuk: '2026-04-25',
    jam_masuk: '08:00',
    ruangan: 'Mawar - Bed 3',
    dpjp: 'dr. Andi Suryawan, Sp.PD',
    status: 'Aktif',
    jenis_kelamin: 'L',
    tanggal_lahir: '1980-05-15',
    durasi_inap: 3,
  },
  {
    id: '2',
    nomor_rm: 'RM-09215',
    nik: '3201010101010002',
    nama: 'Siti Aminah',
    diagnosa: 'Gastroenteritis',
    tanggal_masuk: '2026-04-27',
    jam_masuk: '10:30',
    ruangan: 'Melati - Bed 1',
    dpjp: 'dr. Budi Santoso, Sp.B',
    status: 'Aktif',
    jenis_kelamin: 'P',
    tanggal_lahir: '1992-08-20',
    durasi_inap: 1,
  },
  {
    id: '3',
    nomor_rm: 'RM-09198',
    nik: '3201010101010003',
    nama: 'Ahmad Dahlan',
    diagnosa: 'STEMI',
    tanggal_masuk: '2026-04-21',
    jam_masuk: '23:15',
    ruangan: 'ICU - Bed 2',
    dpjp: 'dr. Citra Kirana, Sp.A',
    status: 'Kritis',
    jenis_kelamin: 'L',
    tanggal_lahir: '1965-01-10',
    durasi_inap: 7,
  },
  {
    id: '4',
    nomor_rm: 'RM-09205',
    nik: '3201010101010004',
    nama: 'Rina Purnamasari',
    diagnosa: 'Appendicitis',
    tanggal_masuk: '2026-04-24',
    jam_masuk: '14:20',
    ruangan: 'Anggrek - Bed 5',
    dpjp: 'dr. Budi Santoso, Sp.B',
    status: 'Aktif',
    jenis_kelamin: 'P',
    tanggal_lahir: '1998-11-30',
    durasi_inap: 4,
  },
];

export const getPatients = async (): Promise<Patient[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...MOCK_PATIENTS];
};

export const savePatient = async (patient: Omit<Patient, 'id' | 'status' | 'durasi_inap'>): Promise<Patient> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newPatient: Patient = {
    ...patient,
    id: Math.random().toString(36).substr(2, 9),
    status: 'Aktif',
    durasi_inap: 0,
  };
  MOCK_PATIENTS = [newPatient, ...MOCK_PATIENTS];
  return newPatient;
};
