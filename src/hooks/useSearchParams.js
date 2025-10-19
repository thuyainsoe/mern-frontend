import { useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Custom hook for managing search parameters with debouncing
 * @param {Object} defaultParams - Default values for parameters
 * @param {number} debounceDelay - Delay in ms for debouncing (default: 500)
 * @returns {Object} - { queryParams, searchInput, handleSearchChange, handlePageChange, handlePageSizeChange }
 */
export const useSearchParamsWithDebounce = (
  defaultParams = {
    page: 1,
    perPage: 10,
    search: "",
  },
  debounceDelay = 500
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || defaultParams.search || ""
  );
  const debounceTimerRef = useRef(null);

  // Memoize query params
  const queryParams = useMemo(() => {
    return {
      page: parseInt(searchParams.get("page")) || defaultParams.page || 1,
      perPage:
        parseInt(searchParams.get("perPage")) || defaultParams.perPage || 10,
      search: searchParams.get("search") || defaultParams.search || "",
    };
  }, [searchParams, defaultParams]);

  const { page, perPage, search } = queryParams;

  // Debounced search handler
  const handleSearchChange = (value) => {
    setSearchInput(value);

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      setSearchParams({
        page: "1",
        perPage: perPage.toString(),
        search: value,
      });
    }, debounceDelay);
  };

  // Page change handler
  const handlePageChange = (newPage) => {
    setSearchParams({
      page: newPage.toString(),
      perPage: perPage.toString(),
      search: search,
    });
  };

  // Page size change handler
  const handlePageSizeChange = (newSize) => {
    setSearchParams({
      page: "1",
      perPage: newSize.toString(),
      search: search,
    });
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    queryParams,
    searchInput,
    handleSearchChange,
    handlePageChange,
    handlePageSizeChange,
  };
};
