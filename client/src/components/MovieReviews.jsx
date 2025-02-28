import PropTypes from "prop-types";
import { useFetchLogsByMovieId } from "../hooks/log";
import { useEffect } from "react";
import ReviewCard from "./ReviewCard";

const MovieReviews = ({ imdbId }) => {
  const { fetchReviewLoading, fetchReviewResult, fetchMovieReviews } =
    useFetchLogsByMovieId();

  useEffect(() => {
    fetchMovieReviews(imdbId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="movie-review-container-inner">
      <h2>Review</h2>
      {fetchReviewLoading ? (
        <>Loading</>
      ) : (
        <>
          {fetchReviewResult.data.map((review) => (
            <ReviewCard
              key={review.id}
              username={review.username}
              logDate={review.log_date}
              review={review.review}
            />
          ))}
        </>
      )}
    </div>
  );
};

MovieReviews.propTypes = {
  imdbId: PropTypes.string.isRequired,
};

export default MovieReviews;
