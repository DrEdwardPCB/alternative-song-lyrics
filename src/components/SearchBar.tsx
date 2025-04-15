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
      fetchSuggestions(field,debouncedValue)
        .then((e)=>{
          setSuggestions(e)})
        .catch(console.error);
    
  }, [debouncedValue, field]);

  return (
    <div className="relative w-full">
      <label className="block mb-1 text-sm font-medium text-slate-700">
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
        <ul className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm text-slate-500">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                onChange(suggestion);
                setIsOpen(false);
              }}
              className="relative py-2 pl-3 cursor-pointer select-none pr-9 hover:bg-indigo-50"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
