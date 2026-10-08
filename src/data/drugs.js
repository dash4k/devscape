import anestesi from './drugs/obat-obatan-anestesi.json';
import antibiotik from './drugs/obat-obatan-antibiotik.json';
import antijamur from './drugs/obat-obatan-antijamur.json';
import antineoplastik from './drugs/obat-obatan-antineoplastik.json';
import antiparasit from './drugs/obat-obatan-antiparasit.json';
import antivirus from './drugs/obat-obatan-antivirus.json';
import darah from './drugs/obat-obatan-darah.json';
import endokrin from './drugs/obat-obatan-endokrin.json';
import flu from './drugs/obat-obatan-batuk-pilek-flu.json';
import ginjal from './drugs/obat-obatan-ginjal.json';
import hematologi from './drugs/obat-obatan-hematologi-antitrombotik-lain.json';
import kardiovaskular from './drugs/obat-obatan-kardiovaskular.json';
import laksatif from './drugs/obat-obatan-laksatif-antidiare-hepatobilier.json';
import mediakontras from './drugs/obat-obatan-media-kontras-diagnostik.json';
import muskuloskeletal from './drugs/obat-obatan-muskuloskeletal.json';
import nutrisi from './drugs/obat-obatan-cairan-infus-nutrisi.json';
import pencernaan from './drugs/obat-obatan-pencernaan.json';
import pernapasan from './drugs/obat-obatan-pernapasan.json';
import psikiatri from './drugs/obat-obatan-psikiatri.json';
import reproduksi from './drugs/obat-obatan-hormon-reproduksi.json';
import salep from './drugs/obat-obatan-salep.json';
import saraf from './drugs/obat-obatan-saraf.json';
import suplemen from './drugs/obat-obatan-suplemen-nutrisi.json';
import topikal from './drugs/obat-obatan-topikal.json';
import tulang from './drugs/obat-obatan-tulang.json';
import vaksin from './drugs/obat-obatan-vaksin.json';
import lainnya from './drugs/obat-obatan-khusus-lainnya.json';

export const rawDrugs = {
  anestesi,
  antibiotik,
  antijamur,
  antineoplastik,
  antiparasit,
  antivirus,
  darah,
  endokrin,
  flu,
  ginjal,
  hematologi,
  kardiovaskular,
  laksatif,
  mediakontras,
  muskuloskeletal,
  nutrisi,
  pencernaan,
  pernapasan,
  psikiatri,
  reproduksi,
  salep,
  saraf,
  suplemen,
  topikal,
  tulang,
  vaksin,
  lainnya,
};

export const drugClasses = [
  'anestesi',
  'antibiotik',
  'antijamur',
  'antineoplastik',
  'antiparasit',
  'antivirus',
  'darah',
  'endokrin',
  'flu',
  'ginjal',
  'hematologi',
  'kardiovaskular',
  'laksatif',
  'mediakontras',
  'muskuloskeletal',
  'nutrisi',
  'pencernaan',
  'pernapasan',
  'psikiatri',
  'reproduksi',
  'salep',
  'saraf',
  'suplemen',
  'topikal',
  'tulang',
  'vaksin',
  'lainnya',
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
