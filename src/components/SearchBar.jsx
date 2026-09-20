import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, createSearchParams, Link } from 'react-router-dom';
import { getDrugByName } from '../data/drugs.js';

import useInput from '../hooks/useInput.js';

const SearchBar = ({ pathname, placeholder }) => {
  const navigate = useNavigate();

  const [search, setSearch] = useInput('');
  const [results, setResults] = useState({});
  const [resultFound, setResultFound] = useState(false);

  const submitSearch = (e) => {
    e.preventDefault();

    const query = search.trim();
    if (!query) return;

    navigate({
      pathname: '/search',
      search: createSearchParams({ q: query }).toString(),
    });
  };

  React.useEffect(() => {
    setSearch({ target: { value: '' } });
    setResults({});
    setResultFound(false);
  }, [pathname]);

  React.useEffect(() => {
    const query = search.trim();
    if (!query) {
      setResults({});
      setResultFound(false);
      return;
    }

    const searchResults = getDrugByName(query);

    if (!searchResults) {
      setResultFound(false);
      return;
    } else {
      setResults(searchResults);
      setResultFound(true);
      return;
    }
  }, [search]);

  return (
    <div className={`flex flex-col w-full h-auto shadow-xs ${
      resultFound
        ? 'rounded-t-xl rounded-b-md'
        : 'rounded-full'
    }`}>
      <form
        onSubmit={submitSearch}
        className={`flex flex-row w-full gap-0 border bg-surface border-border-strong text-text-primary p-1 ${
          resultFound
            ? 'rounded-t-xl'
            : 'rounded-full'
        }`}
      >
        <input
          type="text"
          value={search}
          onChange={setSearch}
          placeholder={placeholder}
          className="w-full rounded-l-lg px-2 focus:outline-none font-headline-md"
        />
        <button
          type='submit'
          className='relative top-0 right-0 text-accent-primary px-1 rounded-xs p-1'
        >
          <FaSearch />
        </button>
      </form>
      {resultFound && (
        <div className="flex flex-col items-center w-full h-auto max-h-31 scrollbar-none overflow-scroll border bg-surface border-border-strong text-text-primary rounded-b-md">
          {results.map((o) => (
            <Link
              to={`/references/${o.id}`}
              key={o.id}
              className='w-full h-auto hover:bg-accent-cta hover:text-text-on-cta py-2 px-1 text-center'
            >
              <p>{o.nama}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
