import axios from "axios";
import { useState } from "react";

const HandleProfileUpdate = () => {
  const [updateProfileResponse, setUpdateProfileResponse] = useState();
  const [updateProfileStatus, setUpdateProfileStatus] = useState(false);

  const updateProfile = async ({ username, name, bio }) => {
    try {
      const { data } = await axios.patch(`/api/users/profile`, {
        username,
        name,
        bio,
      });
      setUpdateProfileResponse(data.message);
    } catch (error) {
      console.error(error);
      setUpdateProfileResponse("Error has occured");
    }
    setUpdateProfileStatus(true);
  };

  return {
    updateProfileResponse,
    updateProfileStatus,
    updateProfile,
  };
};

export default HandleProfileUpdate;
