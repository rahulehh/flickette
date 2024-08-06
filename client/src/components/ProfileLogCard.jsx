import PropTypes from "prop-types";
import HandleLogDeletion from "../hooks/HandleLogDeletion";
import { useEffect, useState } from "react";
import { LogEditModal } from "./Modals";
import { DeleteButton } from "./Buttons";
import { Link } from "react-router-dom";

export const ProfileLogCard = ({ data, showControls }) => {
  const { deleteLog } = HandleLogDeletion();
  const [reviewText, setReviewText] = useState("");

  const handleDelete = async () => {
    await deleteLog(data.log_id);
    window.location.reload();
  };

  useEffect(() => {
    setReviewText(data.review);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="movie-card profile-card">
      <div className="pmc-txt-cont">
        <Link to={`/m/${data.imdb_id}`}>
          <img
            src={
              data.poster_url == "N/A"
                ? "/src/assets/No_Picture.jpg"
                : data.poster_url
            }
            alt={data.title}
            className="poster"
          />
        </Link>
        <div>
          <h2>
            {data.title} · {data.year}
          </h2>
          <p>
            Watched on:{" "}
            {new Date(data.log_date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          {!(data.review == "") && <p>Review: {data.review}</p>}
        </div>
      </div>
      {showControls && (
        <ul>
          <li>
            <DeleteButton type="button" onClick={handleDelete}>
              delete
            </DeleteButton>
          </li>
          <li>
            <LogEditModal logData={data} rt={reviewText} />
          </li>
        </ul>
      )}
    </div>
  );
};

ProfileLogCard.propTypes = {
  data: PropTypes.shape({
    log_id: PropTypes.number.isRequired,
    imdb_id: PropTypes.string.isRequired,
    review: PropTypes.string.isRequired,
    log_date: PropTypes.string.isRequired,
    poster_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }).isRequired,
  showControls: PropTypes.bool.isRequired,
};
