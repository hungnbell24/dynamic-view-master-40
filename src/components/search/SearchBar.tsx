
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onChange?: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search',
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="relative dashboard-card animate-slide-up opacity-0">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-dashboard-text-secondary" />
      </div>
      <input
        type="text"
        className="block w-full bg-transparent pl-10 pr-3 py-2.5 border-0 focus:ring-0 focus:outline-none text-dashboard-text placeholder-dashboard-text-secondary"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
