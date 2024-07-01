import PropTypes from "prop-types";

const ReviewCard = ({ username, logDate, review }) => {
  return (
    <>
      {!(review == "") && (
        <div
          className="movie-card"
          style={{ marginInline: "0", marginBlock: "2em" }}
        >
          <div>
            <>
              <h2>
                {username +
                  " · " +
                  new Date(logDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
              </h2>
              <p>{review}</p>
            </>
          </div>
        </div>
      )}
    </>
  );
};

ReviewCard.propTypes = {
  username: PropTypes.string.isRequired,
  logDate: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
};

export default ReviewCard;
