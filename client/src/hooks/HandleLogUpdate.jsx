import axios from "axios";

const HandleLogUpdate = () => {
  const updateLog = async ({ id, review }) => {
    try {
      const response = await axios.post(`/api/update_log`, { id, review });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return { updateLog };
};

export default HandleLogUpdate;
