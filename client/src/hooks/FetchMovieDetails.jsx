import { useState } from "react";
import axios from "axios";

const FetchMovieDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState({});

  const fetchMovieDetails = async (imdbId) => {
    setIsLoading(true);
    setMovieDetails({});

    try {
      const { data: response } = await axios.get(
        `/api/movies/${imdbId}`
      );
      setMovieDetails(response);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return { isLoading, movieDetails, fetchMovieDetails };
};

export default FetchMovieDetails;
