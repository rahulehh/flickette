import axios from "axios";
import { useState } from "react";

const HandleLogDeletion = () => {
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

export default HandleLogDeletion;
