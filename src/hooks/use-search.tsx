import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      // In a real app, you would make an API call here
      // For now, we'll just navigate to search results
      setTimeout(() => {
        navigate(`/search?q=${encodeURIComponent(query)}`);
        setIsSearching(false);
      }, 500);
    }
  }, [navigate]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setIsSearching(false);
  }, []);

  return {
    searchQuery,
    isSearching,
    handleSearch,
    clearSearch,
    setSearchQuery
  };
}
