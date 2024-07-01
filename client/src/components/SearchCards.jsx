import PropTypes from "prop-types";
import { LogNew } from "./Modals";
import { Link } from "react-router-dom";

export const UserCard = ({ username, name, bio }) => {
  return (
    <div className="user-card">
      <h2>{username}</h2>
      <p>Name: {name}</p>
      <p>Bio: {bio}</p>
      <hr />
    </div>
  );
};

export const SearchMovieCard = ({ stype, title, year, posterUrl, imdbId }) => {
  return (
    <div className="movie-card">
      <Link to={`/m/${imdbId}`}>
        <img
          src={posterUrl == "N/A" ? "/src/assets/No_Picture.jpg" : posterUrl}
          alt={title}
          className="poster"
        />
      </Link>
      <div>
        <h2>
          {title} · {year}
        </h2>
        <p> {stype}</p>
        <LogNew movieData={{ stype, title, year, posterUrl, imdbId }} />
      </div>
    </div>
  );
};

UserCard.propTypes = {
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
};

SearchMovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  stype: PropTypes.string.isRequired,
  posterUrl: PropTypes.string.isRequired,
  imdbId: PropTypes.string.isRequired,
};
