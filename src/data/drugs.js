import obat from './obat-obatan.json';

export const allDrugs = obat.kelas_obat.flatMap((kelas) =>
  kelas.obat.map((o) => ({
    ...o,
    kelasId: kelas.id,
    kelas: kelas.kelas,
    kelasMekanisme: kelas.mekanisme,
  }))
);

export const getDrugById = (id) => allDrugs.find((d) => d.id === id);
