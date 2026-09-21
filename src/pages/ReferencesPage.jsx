import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import DrugList from '../components/DrugList.jsx';
import ScrollToTopButton from '../components/ScrollToTopButton.jsx';

const ReferencesPage = () => {
  const [type, setType] = React.useState('antibiotik');

  const tabClass = (tab) =>
    `py-2 px-4 border-b-3 rounded-t-lg transition-colors duration-200 cursor-pointer ${
      type === tab
        ? 'font-semibold bg-accent-primary text-text-on-accent border-accent-primary'
        : '-mb-0.5 border-transparent hover:border-accent-primary'
    }`;

  return (
    <section className="w-full h-auto px-5 pt-3">
      <div className="hidden md:flex flex-row justify-start items-end w-full border-b-3 border-border-strong mb-10 text-text-primary text-body-lg">
        <button onhove className={tabClass('antibiotik')} onClick={() => setType('antibiotik')}>
          Antibiotik
        </button>
        <button className={tabClass('pencernaan')} onClick={() => setType('pencernaan')}>
          Pencernaan
        </button>
        <button className={tabClass('pernapasan')} onClick={() => setType('pernapasan')}>
          Pernapasan
        </button>
        <button className={tabClass('tulang')} onClick={() => setType('tulang')}>
          Tulang
        </button>
      </div>
      <div className="bg-surface md:hidden flex flex-row justify-center items-center w-full rounded-xl border border-border shadow-sm mb-10 text-text-primary">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-3 w-full text-center rounded-xl text-text-primary bg-surface"
        >
          <option value="antibiotik" className='text-text-primary bg-surface'>Antibiotik</option>
          <option value="pencernaan" className='text-text-primary bg-surface'>Pencernaan</option>
          <option value="pernapasan" className='text-text-primary bg-surface'>Pernapasan</option>
          <option value="tulang" className='text-text-primary bg-surface'>Tulang</option>
        </select>
      </div>
      <AnimatePresence mode='wait'>
        <motion.div
          key={type}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
        >
          <DrugList type={type} />
        </motion.div>
      </AnimatePresence>
      <ScrollToTopButton />
    </section>
  );
};

export default ReferencesPage;
