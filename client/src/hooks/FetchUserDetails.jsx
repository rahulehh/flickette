import axios from "axios";
import { useState } from "react";

const FetchProfileData = () => {
  const [fetchDataResponse, setFetchDataResponse] = useState();
  const [fetchLoading, setFetchLoading] = useState(true);

  const fetchData = async (username) => {
    try {
      const { data: response } = await axios.get(
        `/api/user_deatail?username=${username}`
      );
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

export default FetchProfileData;
