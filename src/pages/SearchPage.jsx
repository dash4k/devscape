import { getDrugByQuery } from '../data/drugs.js';
import { Link, useSearchParams } from 'react-router-dom';

import DrugCard from '../components/DrugCard.jsx';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const drugs = getDrugByQuery(query);
  return (
    <div className="w-full h-auto px-5 pt-3">
      <section className="w-full flex flex-col items-start">
        <h2 className="text-label-lg font-black text-text-primary mb-2 text-center">Obat</h2>
        <div className="flex flex-wrap justify-between gap-x-1 gap-y-3 w-full">
          {drugs.length > 0 ? (drugs.map((o) => (
            <Link
              to={`/references/${o.id}`}
              key={o.id}
              className="flex w-[calc(50%-6px)] md:w-[calc(20%-9px)] max-w-100 hover:shadow-md rounded-2xl shadow-accent-primary-hover transition-all duration-300 cursor-pointer"
            >
              <DrugCard
                gambar={o.gambar}
                nama={o.nama}
                indikasi={o.indikasi?.join('; ')}
              />
            </Link>
          ))) : <p>Tidak ada obat</p> }
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
