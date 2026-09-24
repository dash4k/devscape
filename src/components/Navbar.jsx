import React from 'react';

import { Link, matchPath, useLocation } from 'react-router-dom';
import { FaMoon, FaRegSun, FaAlignJustify, FaSearch } from 'react-icons/fa';

import ThemeContext from '../contexts/ThemeContext.js';

import Logo from './Logo.jsx';
import SearchBar from './SearchBar.jsx';
import NavbarLink from './NavbarLink.jsx';

const NavBar = ({ onValidRoutes }) => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  const location = useLocation();
  const isActive = (path) =>
    !!matchPath({ path, end: path === '/' }, location.pathname);

  const containerRef = React.useRef(null);

  const [mobileNav, setMobileNav] = React.useState(false);
  const [searchBar, setSearchBar] = React.useState(false);

  const toggleSearchBar = () => {
    setSearchBar((prev) => !prev);
    setMobileNav(false);
  };

  const toggleMobileNav = () => {
    setMobileNav((prev) => !prev);
    setSearchBar(false);
  };

  React.useEffect(() => {
    setMobileNav(false);
    setSearchBar(false);
  }, [location.pathname]);

  React.useEffect(() => {
    if (!mobileNav && !searchBar) return;

    const handlePointerDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setMobileNav(false);
        setSearchBar(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [mobileNav, searchBar]);

  if (!onValidRoutes) return;

  return (
    <div ref={containerRef}>
      <header className={`w-3/4 max-w-300 fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-surface border-b border-border-strong shadow-2xs shadow-accent-primary ${
        mobileNav ? 'rounded-4xl' : 'rounded-full'
      }`}>
        <nav className="w-full h-auto flex flex-col items-center justify-center">
          <div className="flex justify-between items-center h-16 w-full mx-auto px-container-margin">
            <Link to="/"><Logo /></Link>
            <div className="hidden md:flex flex-row items-center justify-center">
              <NavbarLink to='/' isActive={isActive('/')}>Home</NavbarLink>
              <NavbarLink to='/news' isActive={isActive('/news')}>News & Perspective</NavbarLink>
              <NavbarLink to='/references' isActive={isActive('/references')}>References</NavbarLink>
            </div>
            <div className="flex pr-5 gap-3 text-xl pt-1">
              <button
                className={`cursor-pointer ${
                  searchBar
                    ? 'text-text-muted'
                    : 'text-accent-primary'
                }`}
                onClick={toggleSearchBar}
              >
                <FaSearch />
              </button>
              <button
                className="text-text-muted cursor-pointer"
                onClick={toggleTheme}
              >
                { theme === 'light' ? <FaRegSun /> : <FaMoon />}
              </button>
              <button
                onClick={toggleMobileNav}
                className="md:hidden text-text-muted cursor-pointer"
              >
                <FaAlignJustify />
              </button>
            </div>
          </div>
          <div
            className={`w-full flex flex-col items-center justify-center overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
              mobileNav ? 'max-h-40 pb-5 translate-y-0' : 'max-h-0 pb-0 -translate-y-2'
            }`}
          >
            <NavbarLink to='/' isActive={isActive('/')}>Home</NavbarLink>
            <NavbarLink to='/news' isActive={isActive('/news')}>News & Perspective</NavbarLink>
            <NavbarLink to='/references' isActive={isActive('/references/')}>References</NavbarLink>
          </div>
        </nav>
      </header>
      <div
        className={`w-3/4 fixed top-25 left-1/2 -translate-x-1/2 overflow-hidden transition-all duration-300 ease-in-out ${
          (searchBar)
            ? 'max-h-40 translate-y-0'
            : 'max-h-0 -translate-y-2'
        }`}
      >
        <div className="w-full max-w-1/2 h-auto mx-auto pb-5">
          <SearchBar pathname={location.pathname} placeholder={'Search'} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
