import PropTypes from "prop-types";
import { ProfileLogCard } from "./ProfileLogCard";

const ProfileLogSection = ({ data, showControls }) => {
  return (
    <div className="profile-log-section">
      {data.message == "fetched" &&
        data.data.map((item) => (
          <ProfileLogCard
            key={item.log_id}
            data={item}
            showControls={showControls}
          />
        ))}
    </div>
  );
};

ProfileLogSection.propTypes = {
  data: PropTypes.shape({
    message: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        log_id: PropTypes.number.isRequired,
        imdb_id: PropTypes.string.isRequired,
        review: PropTypes.string.isRequired,
        log_date: PropTypes.string.isRequired,
        poster_url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  showControls: PropTypes.bool.isRequired,
};

export default ProfileLogSection;
