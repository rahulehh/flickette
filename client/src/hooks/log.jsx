import { useState } from "react";
import axios from "axios";

const useCreateLog = () => {
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

const useFetchLogsByUsername = () => {
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

const useDeleteLog = () => {
  const [logDeletionStatus, setLogDeletionStatus] = useState("");

  const deleteLog = async (id) => {
    setLogDeletionStatus("");
    try {
      const response = await axios.delete(`/api/logs/${id}`);
      setLogDeletionStatus("deleted");
      return response;
    } catch (error) {
      console.error(error);
      setLogDeletionStatus("error");
      throw error;
    }
  };

  return { logDeletionStatus, deleteLog };
};

const useFetchLogsByMovieId = () => {
  const [fetchReviewLoading, setFetchReviewLoading] = useState(true);
  const [fetchReviewResult, setFetchReviewResult] = useState({});

  const fetchMovieReviews = async (imdbId) => {
    setFetchReviewLoading(true);
    setFetchReviewResult({});

    try {
      const { data: response } = await axios.get(
        `/api/movies/${imdbId}/reviews`,
      );
      setFetchReviewResult(response);
    } catch (error) {
      console.error(error);
    }
    setFetchReviewLoading(false);
  };

  return { fetchReviewLoading, fetchReviewResult, fetchMovieReviews };
};

const useUpdateLog = () => {
  const updateLog = async ({ id, review }) => {
    try {
      const response = await axios.patch(`/api/logs/${id}`, { review });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return { updateLog };
};

export {
  useCreateLog,
  useFetchLogsByUsername,
  useDeleteLog,
  useFetchLogsByMovieId,
  useUpdateLog,
};
