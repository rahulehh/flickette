import { useState } from "react";
import axios from "axios";

const useFetchMovieDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState({});

  const fetchMovieDetails = async (imdbId) => {
    setIsLoading(true);
    setMovieDetails({});

    try {
      const { data: response } = await axios.get(`/api/movies/${imdbId}`);
      setMovieDetails(response);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return { isLoading, movieDetails, fetchMovieDetails };
};

const useSearchMovies = () => {
  const [searchResult, setSearchResult] = useState({});
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async (searchKey) => {
    setSearchLoading(true);
    setSearchResult({});
    try {
      const { data } = await axios.get(`/api/movies/search?s=${searchKey}`);
      setSearchResult(data);
    } catch (error) {
      console.error("error has occurred");
      console.error(error);
    } finally {
      setSearchLoading(false);
    }
  };

  return {
    searchResult,
    searchLoading,
    handleSearch,
  };
};

export { useFetchMovieDetails, useSearchMovies };
