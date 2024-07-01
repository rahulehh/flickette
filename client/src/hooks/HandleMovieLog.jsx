import axios from "axios";
import { useState } from "react";

const HandleMovieLog = () => {
  const [logMovieStatus, setLogMovieStatus] = useState("");

  const logMovie = async ({ imdbId, review }) => {
    setLogMovieStatus("");

    try {
      let logDate = new Date(Date.now()).toUTCString();
      const { data } = await axios.post(`/api/log_movie`, {
        imdbId,
        review,
        logDate,
      });
      console.log({ label: "Handle Movie Log", reponse: data });
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
