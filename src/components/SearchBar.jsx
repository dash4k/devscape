import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

import useInput from '../hooks/useInput.js';

const SearchBar = ({ placeholder }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useInput(searchParams.get('q') || '');

  const submitSearch = () => {
    setSearchParams({ q: search });
  };

  return (
    <form
      onSubmit={submitSearch}
      className="flex flex-row w-full gap-0 border shadow-xs shadow-accent-primary-hover bg-surface border-border-strong text-text-primary rounded-full p-1"
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
  );
};

export default SearchBar;
