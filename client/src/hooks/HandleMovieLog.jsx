import axios from "axios";
import { useState } from "react";

const HandleMovieLog = () => {
  const [logMovieStatus, setLogMovieStatus] = useState("");

  const logMovie = async ({ imdbId, review }) => {
    setLogMovieStatus("");

    try {
      let logDate = new Date(Date.now()).toUTCString();
      await axios.post(`/api/logs`, {
        imdbId,
        review,
        logDate,
      });
      setLogMovieStatus("logged");
    } catch (error) {
      console.error(error);
      setLogMovieStatus("error");
    }
  };

  return {
    logMovieStatus,
    logMovie,
  };
};

export default HandleMovieLog;
