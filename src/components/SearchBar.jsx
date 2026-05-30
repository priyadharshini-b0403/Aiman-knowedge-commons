import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = "Search knowledge claims..." }) {
  return (
    <div className="relative w-full flex items-center">
      <Search className="absolute left-3 h-4 w-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg outline-none transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-transparent"
      />
      {value && (
        <button 
          onClick={() => onChange('')}
          className="absolute right-2.5 p-1 rounded-md text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
          title="Clear search"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}