import { useParams } from "react-router-dom";
import { useFetchMovieDetails } from "../hooks/movie";
import { useEffect } from "react";
import { LogNew } from "../components/Modals";
import MovieReviews from "../components/MovieReviews";

const Movie = () => {
  const { isLoading, movieDetails, fetchMovieDetails } = useFetchMovieDetails();
  const { imdbId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      fetchMovieDetails(imdbId);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <>Loading {imdbId}</>
      ) : (
        <>
          <div className="movie-outercontainer">
            <div className="movie-innercontainer">
              <img
                src={movieDetails.Poster}
                alt="Movie Poster"
                className="poster"
                style={{
                  height: "24rem",
                  width: "16rem",
                }}
              />
              <div>
                <h1>
                  {movieDetails.Title} · {movieDetails.Year}
                </h1>
                <h2>directed by: {movieDetails.Director}</h2>
                <h3>{movieDetails.Type}</h3>
                <p>{movieDetails.Plot}</p>
                <LogNew
                  movieData={{
                    stype: movieDetails.Type,
                    title: movieDetails.Title,
                    year: movieDetails.Year,
                    posterUrl: movieDetails.Poster,
                    imdbId: movieDetails.imdbID,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="movie-review-container">
            <MovieReviews imdbId={movieDetails.imdbID} />
          </div>
        </>
      )}
    </>
  );
};

export default Movie;
