import axios from "axios";
import { useState } from "react";

const FetchMovieReviews = () => {
  const [fetchReviewLoading, setFetchReviewLoading] = useState(true);
  const [fetchReviewResult, setFetchReviewResult] = useState({});

  const fetchMovieReviews = async (imdbId) => {
    setFetchReviewLoading(true);
    setFetchReviewResult({});

    try {
      const { data: response } = await axios.get(
        `/api/fetch_movie_reviews?im=${imdbId}`
      );
      setFetchReviewResult(response);
    } catch (error) {
      console.error(error);
    }
    setFetchReviewLoading(false);
  };

  return { fetchReviewLoading, fetchReviewResult, fetchMovieReviews };
};

export default FetchMovieReviews;
