import { useEffect } from "react";
import FetchProfileData from "../hooks/FetchUserDetails";
import ProfileSection from "../components/ProfileSection";
import ProfileLogSection from "../components/ProfileLogSection";
import FetchProfileLogs from "../hooks/FetchProfileLogs";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const Profile = ({ isOwner }) => {
  const { fetchDataResponse, fetchLoading, fetchData } = FetchProfileData();
  const { fetchLogsResult, fetchLogLoading, fetchLogs } = FetchProfileLogs();
  const { pusername } = useParams();

  // sorry you are seeing this

  useEffect(() => {
    setTimeout(() => {
      let username = JSON.parse(localStorage.getItem("user")).username;
      if (!isOwner) username = pusername;
      fetchData(username);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      let username = JSON.parse(localStorage.getItem("user")).username;
      if (!isOwner) username = pusername;
      fetchLogs(username);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {fetchLoading && <div>Loading</div>}
      {!fetchLoading && (
        <>
          <ProfileSection
            data={{ ...fetchDataResponse, showEditButton: isOwner }}
          />
          {!fetchLogLoading && (
            <>
              <ProfileLogSection
                data={fetchLogsResult}
                showControls={isOwner}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

Profile.propTypes = {
  isOwner: PropTypes.bool.isRequired,
};

export default Profile;
