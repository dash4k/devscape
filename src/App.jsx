import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import NavBar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import {
  getThemeState,
  putThemeState
} from './utils/localStorage.js';

import ReferencesPage from './pages/ReferencesPage.jsx';
import DrugDetailPage from './pages/DrugDetailPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import NewsPage from './pages/NewsPage.jsx';
import NewsDetailPage from './pages/NewsDetailPage.jsx';
import HomePage from './pages/HomePage.jsx';

import ThemeContext from './contexts/ThemeContext.js';

function App() {
  const location = useLocation();

  const [theme, setTheme] = React.useState(getThemeState() || 'light');
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    putThemeState(newTheme);
  };

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <NavBar theme={theme} setTheme={toggleTheme} />
      <main className="mt-25 w-4/5 mx-auto">
        <AnimatePresence mode='wait'>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >

            <Routes location={location}>
              <Route
                path='/'
                element={<HomePage />}
              />
              <Route
                path='/news'
                element={<NewsPage />}
              />
              <Route
                path='/news/:slug'
                element={<NewsDetailPage />}
              />
              <Route
                path='/references'
                element={<ReferencesPage />}
              />
              <Route
                path='/references/:drugId'
                element={<DrugDetailPage />}
              />
              <Route
                path='/search'
                element={<SearchPage />}
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </ThemeContext.Provider>
  );
}

export default App;
