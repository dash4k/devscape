import { Link } from 'react-router-dom';
import { PAGE_NOT_FOUND } from '../utils/constants';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <section className="flex flex-col items-center gap-3 h-full w-full justify-center py-2 text-center">
      <div className="flex flex-col justify-center w-full items-center gap-3 py-5 text-center">
        <img
          src={PAGE_NOT_FOUND}
          alt="Tidak ada hasil"
          className='w-40 h-40 rounded-xl p-1 border border-border-strong'
        />
        <div className="w-3/4 md:w-1/2 flex flex-col justify-center items-center gap-1">
          <h1 className="text-display text-accent-primary-hover">404:</h1>
          <h3 className="text-label-md text-lg text-text-primary">Halaman tidak ditemukan</h3>
          <p className="text-body-sm text-text-primary/70">Halaman yang Anda cari tidak dapat kami temukan, Alamat yang Anda tuju tidak tersedia atau sudah dipindahkan. Kemungkinan terjadi kesalahan penulisan nama halaman. Silakan cek kembali ejaan atau jelajahi daftar lengkap halaman yang tersedia.</p>
          <Link to="/" className="w-auto flex flex-row items-center justify-evenly gap-1.5 text-text-on-cta mt-4 bg-accent-cta hover:bg-accent-cta-hover p-2 rounded-xl text-headline-lg text-base transition-colors duration-300">
            <FaRegArrowAltCircleLeft className='mb-0.5'/> Kembali ke beranda
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
