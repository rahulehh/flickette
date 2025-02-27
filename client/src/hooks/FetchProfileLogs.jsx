import { useState } from "react";
import axios from "axios";

const FetchProfileLogs = () => {
  const [fetchLogsResult, setFetchLogsResult] = useState({});
  const [fetchLogLoading, setFetchLogLoading] = useState(true);

  const fetchLogs = async (username) => {
    setFetchLogLoading(true);
    setFetchLogsResult({});
    try {
      const { data: response } = await axios.get(`/api/users/${username}/logs`);
      setFetchLogsResult(response);
    } catch (error) {
      console.error(error);
      fetchLogsResult("Error has occured");
    }
    setFetchLogLoading(false);
  };

  return {
    fetchLogLoading,
    fetchLogsResult,
    fetchLogs,
  };
};

export default FetchProfileLogs;
