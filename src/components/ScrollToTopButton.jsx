import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowAltCircleUp } from 'react-icons/fa';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary text-3xl text-surface shadow-sm shadow-accent-primary hover:bg-accent-primary-hover cursor-pointer transition-colors duration-300"
        >
          <FaArrowAltCircleUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
