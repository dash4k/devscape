import React from 'react';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';

import { DRUG_IMAGE_PLACEHOLDER, DRUG_NOT_FOUND } from '../utils/constants.js';
import { useParams, Link } from 'react-router-dom';
import { getDrugById } from '../data/drugs.js';

import InfoSection from '../components/InfoSection.jsx';

const DrugDetailPage = () => {
  const { drugId } = useParams();
  const drug = getDrugById(drugId);

  const [imageError, setImageError] = React.useState(false);

  if (!drug) {
    return (
      <section className="flex flex-col items-center gap-2 py-10">
        <div className="flex flex-col justify-center w-full items-center gap-3 py-5 text-center">
          <img
            src={DRUG_NOT_FOUND}
            alt="Tidak ada hasil"
            className='w-40 h-40 rounded-xl p-1 border border-border-strong'
          />
          <div className="w-3/4 md:w-1/2 flex flex-col justify-center items-center gap-1">
            <h3 className="text-label-md text-lg text-text-primary">Obat tidak ditemukan</h3>
            <p className="text-body-sm text-text-primary/70">Obat yang Anda cari tidak dapat kami temukan. Kemungkinan terjadi kesalahan penulisan nama obat atau obat tersebut belum terdaftar dalam sistem kami. Silakan cek kembali ejaan atau jelajahi daftar lengkap obat yang tersedia.</p>
            <Link to="/references" className="w-auto flex flex-row items-center justify-evenly gap-1.5 text-text-on-cta mt-2 bg-accent-cta hover:bg-accent-cta-hover p-2 rounded-xl text-headline-lg text-base transition-colors duration-300">
              <FaRegArrowAltCircleLeft className='mb-0.5'/> Kembali
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const mekanisme = drug.mekanisme ?? drug.kelasMekanisme;

  return (
    <article className="w-full px-5 pt-3 flex flex-col md:flex-row justify-start items-center md:items-start">
      <figure className="m-5 p-5 rounded-2xl border-3 border-text-inverse-primary">
        {(drug.gambar || DRUG_IMAGE_PLACEHOLDER) && (
          <img
            className="rounded-xl max-w-75 max-h-75"
            src={drug.gambar || DRUG_IMAGE_PLACEHOLDER}
            alt={`Struktur kimia ${drug.nama}`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = DRUG_IMAGE_PLACEHOLDER;
              setImageError(true);
            }}
          />
        )}
        <figcaption className="mt-2 text-center text-body-sm text-text-muted">
          {imageError ? 'Ilustrasi obat' : `Struktur kimia ${drug.nama}`}
        </figcaption>
      </figure>

      <div className="flex-1 p-5 flex flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h1 className="text-label-xl font-black text-text-primary">
            {drug.nama}
          </h1>
          <p className="text-body-md text-text-muted">{drug.kelas}</p>
        </header>

        {mekanisme && (
          <section aria-labelledby="mekanisme" className="flex flex-col gap-2">
            <h2 id="mekanisme" className="text-label-lg font-black text-text-primary">
              Mekanisme
            </h2>
            <p className="text-body-md text-text-primary">{mekanisme}</p>
          </section>
        )}

        <InfoSection id="merek" title="Merek Dagang" items={drug.merek} />
        <InfoSection id="indikasi" title="Indikasi" items={drug.indikasi} />
        <InfoSection id="sediaan" title="Sediaan" items={drug.sediaan} />
        <InfoSection id="tatalaksana" title="Tatalaksana / Dosis" items={drug.tatalaksana} />
        <InfoSection id="efek-samping" title="Efek Samping" items={drug.efek_samping} />
        <InfoSection id="monitoring" title="Monitoring" items={drug.monitoring} />
        <InfoSection id="interaksi" title="Interaksi" items={drug.interaksi} />

        {drug.catatan && (
          <aside
            aria-labelledby="catatan"
            className="p-4 rounded-2xl border border-border-strong flex flex-col gap-1"
          >
            <h2 id="catatan" className="text-label-md font-black text-text-primary">
              Catatan
            </h2>
            <p className="text-body-md text-text-primary">{drug.catatan}</p>
          </aside>
        )}
      </div>
    </article>
  );
};

export default DrugDetailPage;
