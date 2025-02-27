import axios from "axios";

const HandleLogUpdate = () => {
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

export default HandleLogUpdate;
