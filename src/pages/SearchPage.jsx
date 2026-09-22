import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { getDrugByQuery } from '../data/drugs.js';
import { getArticleByQuery } from '../data/articles.js';

import DrugCard from '../components/DrugCard.jsx';
import ArticleCard from '../components/ArticleCard.jsx';
import Pagination from '../components/Pagination.jsx';

import { DRUG_NOT_FOUND, ARTICLE_NOT_FOUND } from '../utils/constants.js';

const DRUGS_PER_PAGE = 10;

const SearchPage = () => {
  const [articleHovered, setArticleHovered] = React.useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const drugs = getDrugByQuery(query);
  const articles = getArticleByQuery(query);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(drugs.length / DRUGS_PER_PAGE));
  const rawPage = parseInt(searchParams.get('page'), 10);
  const currentPage = Number.isNaN(rawPage)
    ? 1
    : Math.min(Math.max(rawPage, 1), totalPages);

  const paginatedDrugs = drugs.slice(
    (currentPage - 1) * DRUGS_PER_PAGE,
    currentPage * DRUGS_PER_PAGE
  );

  const goToPage = (page) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (page === 1) next.delete('page');
      else next.set('page', page);
      return next;
    });
  };

  const NOT_FOUND_IMAGE_CLASS = 'w-40 h-40 rounded-xl p-1 border border-border-strong';
  return (
    <div className="w-full h-auto px-5 pt-3 flex flex-col gap-10 text-text-primary">
      <section className="w-full flex flex-col items-center pb-10 border-b border-dashed border-border-strong">
        <h2 className="text-label-lg font-black text-text-primary mb-2 self-start">Obat</h2>
        <AnimatePresence mode='wait'>
          <motion.div
            key={`${currentPage}-${searchParams}`}
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.25 }}
            className='w-full'
          >
            <div
              className={`flex flex-wrap gap-x-1 gap-y-3 w-full ${
                paginatedDrugs.length > 0
                  ? 'justify-start'
                  : 'justify-center'
              }`}
            >
              {paginatedDrugs.length > 0 ? (paginatedDrugs.map((o) => (
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
              ))) : <div className="flex flex-col justify-center w-full items-center gap-3 py-5 text-center">
                <img
                  src={DRUG_NOT_FOUND}
                  alt="Tidak ada hasil"
                  className={NOT_FOUND_IMAGE_CLASS}
                />
                <div className="w-full flex flex-col justify-center items-center gap-1">
                  <h3 className="text-label-md text-base text-text-primary">Obat tidak ditemukan</h3>
                  <p className="text-body-sm text-text-primary">Coba kata kunci lain.</p>
                </div>
              </div>
              }
            </div>
          </motion.div>
        </AnimatePresence>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </section>
      <section className="w-full flex flex-col items-start">
        <h2 className="text-label-lg font-black text-text-primary mb-2 text-center">Artikel</h2>
        <AnimatePresence mode='wait'>
          <motion.div
            key={searchParams}
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.25 }}
            className='w-full'
          >
            <article
              className={`${
                articles.length > 0
                  ? 'w-full grid grid-cols-2 gap-5'
                  : 'w-full'
              }`}
            >
              {articles.length > 0 ? (articles.map((a) => (
                <Link
                  to={`/news/${a.slug}`}
                  key={a.slug}
                  className="block min-w-0"
                  onMouseEnter={() => setArticleHovered(a.slug)}
                  onMouseLeave={() => setArticleHovered(null)}
                >
                  <ArticleCard article={a} hovered={articleHovered} />
                </Link>
              ))) : <div className="flex flex-col justify-center w-full items-center gap-3 py-5 text-center">
                <img
                  src={ARTICLE_NOT_FOUND}
                  alt="Tidak ada hasil"
                  className={NOT_FOUND_IMAGE_CLASS}
                />
                <div className="w-full flex flex-col justify-center items-center gap-1">
                  <h3 className="text-label-md text-base text-text-primary">Artikel tidak ditemukan</h3>
                  <p className="text-body-sm text-text-primary">Coba kata kunci lain.</p>
                </div>
              </div>
              }
            </article>
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
};

export default SearchPage;
