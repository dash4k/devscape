import antibiotik from './drugs/obat-obatan-antibiotik.json';
import darah from './drugs/obat-obatan-darah.json';
import endokrin from './drugs/obat-obatan-endokrin.json';
import ginjal from './drugs/obat-obatan-ginjal.json';
import kardiovaskular from './drugs/obat-obatan-kardiovaskular.json';
import muskuloskeletal from './drugs/obat-obatan-muskuloskeletal.json';
import pencernaan from './drugs/obat-obatan-pencernaan.json';
import pernapasan from './drugs/obat-obatan-pernapasan.json';
import psikiatri from './drugs/obat-obatan-psikiatri.json';
import saraf from './drugs/obat-obatan-saraf.json';
import tulang from './drugs/obat-obatan-tulang.json';

export const rawDrugs = {
  antibiotik,
  darah,
  endokrin,
  ginjal,
  kardiovaskular,
  muskuloskeletal,
  pencernaan,
  pernapasan,
  psikiatri,
  saraf,
  tulang,
};

export const drugClasses = [
  'antibiotik',
  'darah',
  'endokrin',
  'ginjal',
  'kardiovaskular',
  'muskuloskeletal',
  'pencernaan',
  'pernapasan',
  'psikiatri',
  'saraf',
  'tulang'
];

export const allDrugs = Object.values(rawDrugs).flatMap((kelas) =>
  kelas.kelas_obat.flatMap((kelas) =>
    kelas.obat.map((o) => ({
      ...o,
      kelasId: kelas.id,
      kelas: kelas.kelas,
      kelasMekanisme: kelas.mekanisme,
    }))
  )
);

export const getDrugById = (id) => allDrugs.find((d) => d.id === id);

export const getDrugByName = (drugName) => allDrugs.filter((d) => d.id.includes(drugName.toLowerCase()));

export const getDrugByQuery = (query) => allDrugs.filter((d) => (
  d.id.includes(query.toLowerCase())
  || d.kelasId.includes(query.toLowerCase())
  || d.kelasMekanisme.toLowerCase().includes(query.toLowerCase())
  || d.merek?.some((m) => m.toLowerCase().includes(query.toLowerCase()))
));
