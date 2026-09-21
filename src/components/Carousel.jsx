import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';

const variants = {
  enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%' }),
  center: { x: 0 },
  exit: (direction) => ({ x: direction > 0 ? '-100%' : '100%' }),
};

const buttonClass = (direction) => `
    absolute top-0 ${direction === 'left' ? 'left-0' : 'right-0'} z-10 h-full px-4
    text-accent-cta hover:text-accent-cta-hover cursor-pointer
    transition-all duration-300
`;

const Carousel = ({ items }) => {
  const navigate = useNavigate();

  const [[index, direction], setPage] = React.useState([0, 0]);

  const paginate = (dir) => setPage(
    ([i]) => [(i + dir + items.length) % items.length, dir]
  );

  return (
    <div className="relative w-full overflow-hidden rounded-lg h-56 md:h-96 border border-border-strong">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          onClick={() => navigate(`/news/${items[index].slug}`)}
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-end justify-end bg-cover bg-center cursor-pointer"
          style={{ backgroundImage: `url(${items[index].gambar})` }}
        >
          <div className="max-w-3/4 h-auto flex flex-col items-end px-5 pb-5">
            <h2 className="text-deep-space-blue text-label-bold text-xl bg-white p-1 line-clamp-1">{items[index].title}</h2>
            <p className="text-white bg-black text-body-md px-1">{items[index].date}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => paginate(-1)}
        className={buttonClass('left')}
        aria-label="Previous"
      >
        <FaChevronCircleLeft />
      </button>
      <button
        onClick={() => paginate(1)}
        className={buttonClass('right')}
        aria-label="Previous"
      >
        <FaChevronCircleRight />
      </button>
    </div>
  );
};

export default Carousel;
