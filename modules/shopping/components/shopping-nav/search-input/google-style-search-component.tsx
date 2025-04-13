import React, { useState, useRef, useEffect } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GoogleStyleSearchProps {
  onClose?: () => void;
}

const GoogleStyleSearch: React.FC<GoogleStyleSearchProps> = ({ onClose }) => {
  // Indian handicraft items as placeholders
  const placeholders = [
    "Pashmina Shawl",
    "Bidriware Vase",
    "Channapatna Wooden Toys",
    "Madhubani Painting",
    "Brass Dhokra Figurine",
  ];
  
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const resultContainerRef = useRef<HTMLDivElement | null>(null);
  
  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchResults]);

  // Handle clicking outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultContainerRef.current && !resultContainerRef.current.contains(event.target as Node)) {
        setSearchResults([]);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Store input reference for future use
    if (!inputRef.current) {
      inputRef.current = e.target;
    }
    
    // Clear results if input is empty
    if (!e.target.value) {
      setSearchResults([]);
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }
  };
  
  const handleDebouncedSearch = (value: string) => {
    // Filter search results based on input
    if (value) {
      const filteredResults = placeholders.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent) => {
    // Skip if no results or different target
    if (searchResults.length === 0 || e.target !== inputRef.current) return;
    
    // Handle arrow navigation
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < searchResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      
      // Set input value manually since component doesn't support value prop
      if (inputRef.current) {
        inputRef.current.value = searchResults[selectedIndex];
        // Trigger native input event to update internal state
        const event = new Event('input', { bubbles: true });
        inputRef.current.dispatchEvent(event);
      }
      
      setSearchResults([]);
    } else if (e.key === "Escape") {
      setSearchResults([]);
      if (onClose) onClose();
    }
  };
  
  // Add keydown event listener to document
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchResults, selectedIndex, onClose]);

  const highlightMatch = (text: string) => {
    if (!inputRef.current?.value) return text;
    
    const inputValue = inputRef.current.value;
    const regex = new RegExp(`(${inputValue})`, 'gi');
    const parts = text.split(regex);
    
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === inputValue.toLowerCase() ? 
            <span key={i} className="font-bold text-blue-600 dark:text-blue-400">{part}</span> : 
            <span key={i}>{part}</span>
        )}
      </>
    );
  };
  
  const handleSelectResult = (result: string) => {
    if (inputRef.current) {
      inputRef.current.value = result;
      // Trigger native input event to update internal state
      const event = new Event('input', { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }
    setSearchResults([]);
  };
  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Let the PlaceholdersAndVanishInput handle submission animations
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    setSearchResults([]);
    setIsSearching(false);
    
    // Close dialog if onClose prop is provided
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 w-full relative">
      <div className="relative w-full">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onDebouncedChange={handleDebouncedSearch}
          onSubmit={onSubmit}
          debounceMs={300}
        />
        <Button 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          outline
          type="submit"
          aria-label="Search"
          onClick={() => {
            if (inputRef.current?.form) {
              inputRef.current.form.requestSubmit();
            }
          }}
        >
          <SearchIcon size={18} className="text-muted-foreground hover:text-foreground transition-colors" />
        </Button>
      </div>
      
      {/* Search status indicator */}
      {isSearching && searchResults.length === 0 && (
        <div className="text-sm text-muted-foreground mt-2 text-center">
          No matching products found
        </div>
      )}
      
      {/* Google-style search suggestions */}
      {searchResults.length > 0 && (
        <div 
          ref={resultContainerRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-zinc-800 rounded-lg shadow-lg z-10 overflow-hidden border border-gray-200 dark:border-zinc-700"
        >
          <ul className="divide-y divide-gray-100 dark:divide-zinc-700 max-h-64 overflow-y-auto">
            {searchResults.map((result, index) => (
              <li 
                key={index} 
                className={`px-4 py-2.5 cursor-pointer flex items-center hover:bg-gray-50 dark:hover:bg-zinc-700/70 transition-colors ${
                  index === selectedIndex ? "bg-gray-100 dark:bg-zinc-700" : ""
                }`}
                onClick={() => handleSelectResult(result)}
              >
                <SearchIcon className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                <span className="truncate">{highlightMatch(result)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GoogleStyleSearch;