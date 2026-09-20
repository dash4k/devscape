import obatAntibiotik from './obat-obatan-antibiotik.json';
import obatPencernaan from './obat-obatan-pencernaan.json';
import obatPernapasan from './obat-obatan-pernapasan.json';
import obatTulang from './obat-obatan-tulang.json';

const allDrugsAntibiotik = obatAntibiotik.kelas_obat.flatMap((kelas) =>
  kelas.obat.map((o) => ({
    ...o,
    kelasId: kelas.id,
    kelas: kelas.kelas,
    kelasMekanisme: kelas.mekanisme,
  }))
);

const allDrugsPencernaan = obatPencernaan.kelas_obat.flatMap((kelas) =>
  kelas.obat.map((o) => ({
    ...o,
    kelasId: kelas.id,
    kelas: kelas.kelas,
    kelasMekanisme: kelas.mekanisme,
  }))
);

const allDrugsPernapasan = obatPernapasan.kelas_obat.flatMap((kelas) =>
  kelas.obat.map((o) => ({
    ...o,
    kelasId: kelas.id,
    kelas: kelas.kelas,
    kelasMekanisme: kelas.mekanisme,
  }))
);

const allDrugsTulang = obatTulang.kelas_obat.flatMap((kelas) =>
  kelas.obat.map((o) => ({
    ...o,
    kelasId: kelas.id,
    kelas: kelas.kelas,
    kelasMekanisme: kelas.mekanisme,
  }))
);

export const allDrugs = [
  ...allDrugsAntibiotik,
  ...allDrugsPencernaan,
  ...allDrugsPernapasan,
  ...allDrugsTulang
];

export const getDrugById = (id) => allDrugs.find((d) => d.id === id);

export const getDrugByName = (drugName) => allDrugs.filter((d) => d.id.includes(drugName.toLowerCase()));

export const getDrugByQuery = (query) => allDrugs.filter((d) => (
  d.id.includes(query.toLowerCase())
  || d.kelasId.includes(query.toLowerCase())
  || d.kelasMekanisme.toLowerCase().includes(query.toLowerCase())
));
