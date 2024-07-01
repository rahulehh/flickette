import PropTypes from "prop-types";
import { EditProfileModal } from "./Modals";

const ProfileSection = (props) => {
  const userData = props.data;

  return (
    <>
      <div className="profile">
        <div className="profile-content">
          <ul>
            <li id="p-un-jon">
              {userData.username} · joined in:{" "}
              {new Date(userData.created_at).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </li>
            <li id="p-name">{userData.name}</li>
            <li id="p-bio">{userData.bio}</li>
          </ul>
          {userData.showEditButton && (
            <>
              <EditProfileModal userData={userData} />
            </>
          )}
        </div>
      </div>
      <hr id="p-hr" />
    </>
  );
};

ProfileSection.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    showEditButton: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ProfileSection;
