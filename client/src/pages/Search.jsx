import React, { useEffect } from "react";
import { useSearchMovies } from "../hooks/movie";
import { useLocation } from "react-router-dom";
import { SearchMovieCard } from "../components/SearchCards";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Search = () => {
  const { searchResult, searchLoading, handleSearch } = useSearchMovies();

  let query = useQuery();

  useEffect(() => {
    handleSearch(query.get("s"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {searchLoading ? (
        <div className="mid-item">Loading</div>
      ) : (
        <>
          {searchResult.movies && searchResult.movies.length > 0 ? (
            searchResult.movies.map((movie) => (
              <SearchMovieCard
                key={movie.imdbID}
                imdbId={movie.imdbID}
                stype={movie.Type}
                title={movie.Title}
                year={movie.Year}
                posterUrl={movie.Poster}
              />
            ))
          ) : (
            <div className="mid-item">No movies found</div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
