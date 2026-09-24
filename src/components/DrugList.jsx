import { Link } from 'react-router-dom';
import DrugCard from './DrugCard.jsx';

const DrugList = ({ drugs }) => {
  return (
    <div className="flex flex-col gap-6">
      {drugs.kelas_obat.map((kelas) => (
        <section id={kelas.id} key={kelas.id} className="w-full border-t-2 border-dashed border-text-muted scroll-mt-20 py-12 first:border-t-0 first:pt-0">
          <h2 className="text-label-lg font-black text-text-primary mb-2 text-center">
            {kelas.kelas}
          </h2>
          <div className="flex flex-wrap justify-center gap-3 w-full">
            {kelas.obat.map((o) => (
              <Link
                to={`${o.id}`}
                key={o.id}
                className="flex w-[calc(50%-6px)] md:w-[calc(25%-9px)] hover:shadow-md rounded-2xl shadow-accent-primary-hover transition-all duration-300 cursor-pointer"
              >
                <DrugCard
                  gambar={o.gambar}
                  nama={o.nama}
                  indikasi={o.indikasi?.join('; ')}
                />
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default DrugList;
