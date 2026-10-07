import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { drugClasses, rawDrugs } from '../data/drugs.js';
import { toTitleCase } from '../utils/utils.js';

import DrugList from '../components/DrugList.jsx';
import ScrollToTopButton from '../components/ScrollToTopButton.jsx';
import TableOfContents from '../components/TableOfContents.jsx';

const ReferencesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category');
  const category = drugClasses.includes(urlCategory) ? urlCategory : 'anestesi';
  const setCategory = (category) => {
    setSearchParams({ category: category });
  };
  const tabClass = (tab) =>
    `py-2 px-4 border-b-3 rounded-t-lg transition-colors duration-200 cursor-pointer ${
      category === tab
        ? 'font-semibold bg-accent-primary text-text-on-accent border-accent-primary'
        : '-mb-0.5 border-transparent hover:bg-accent-cta hover:text-text-on-cta'
    }`;

  return (
    <section className="w-full h-auto px-5 pt-3">
      <div className="hidden md:flex flex-row justify-between items-end flex-nowrap overflow-x-auto scrollbar-none w-full border-b-3 border-border-strong mb-10 text-text-primary text-body-lg">
        {drugClasses.map((dc) => (
          <button key={dc} className={tabClass(dc)} onClick={() => setCategory(dc)}>{toTitleCase(dc)}</button>
        ))}
      </div>
      <div className="bg-surface md:hidden flex flex-row justify-center items-center w-full rounded-xl border border-border shadow-sm mb-10 text-text-primary">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 w-full text-center rounded-xl text-text-primary bg-surface"
        >
          {drugClasses.map((dc) => (
            <option key={dc} value={dc} className='text-text-primary bg-surface'>{toTitleCase(dc)}</option>
          ))}
        </select>
      </div>
      <AnimatePresence mode='wait'>
        <motion.div
          key={category}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
        >
          <DrugList drugs={rawDrugs[category]} />
        </motion.div>
      </AnimatePresence>
      <ScrollToTopButton />
      <TableOfContents contents={rawDrugs[category].kelas_obat.map((kelas) => (kelas.id))} />
    </section>
  );
};

export default ReferencesPage;
