import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { fetchSuggestions } from '../api/songs';
import type { SearchParams } from '../types/Song';

interface SearchBarProps {
  label: string;
  field: keyof SearchParams;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onCancel?: () => void;
}

export function SearchBar({ label, field, value, onChange, placeholder, onCancel }: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedValue = useDebounce(value, 300);
  useEffect(() => {
    console.log(field)
      fetchSuggestions(field,debouncedValue)
        .then((e)=>{
          console.log(field,e)
          setSuggestions(e)})
        .catch(console.error);
    
  }, [debouncedValue, field]);

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {value.length > 0 && <button onClick={()=>{
          onCancel?.();
          setIsOpen(false);
        }} className="absolute top-[4px] right-0 p-1 mx-2">X</button>}
      </div>
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm text-slate-500">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                onChange(suggestion);
                setIsOpen(false);
              }}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
