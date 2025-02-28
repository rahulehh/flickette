import axios from "axios";
import { useState } from "react";

const useFetchUserDetails = () => {
  const [fetchDataResponse, setFetchDataResponse] = useState();
  const [fetchLoading, setFetchLoading] = useState(true);

  const fetchData = async (username) => {
    try {
      const { data: response } = await axios.get(`/api/users/${username}`);
      setFetchDataResponse(response[0]);
    } catch (error) {
      console.error(error);
    }
    setFetchLoading(false);
  };

  return {
    fetchDataResponse,
    fetchLoading,
    fetchData,
  };
};

const useUpdateUserDetails = () => {
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

export { useFetchUserDetails, useUpdateUserDetails };
