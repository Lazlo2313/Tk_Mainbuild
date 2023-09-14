import React from 'react';
import { useState, ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  onReset: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onReset }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    if (!newSearchTerm.trim()) {
      onReset();
    } else {
      onSearch(newSearchTerm);
    }
  };

  return (
    <div className='container mx-auto bg-white flex items-center mt-5 mb-5 p-4 rounded'>
      <h1 className='pr-3'>Search</h1>
      <input className='bg-gray-100 rounded p-3 w-96'
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Order Number"
      />
    </div>
  );
};

export default SearchBar;
