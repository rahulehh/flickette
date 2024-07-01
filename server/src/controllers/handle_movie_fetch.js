import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

let { OMDB_API } = process.env;

export const handleMovieFetch = async (req, res) => {
  const imdbId = req.query.im;

  try {
    const { data } = await axios.get(OMDB_API + `i=${imdbId}`);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    if (error.code === "ETIMEDOUT")
      res.status(504).json({ message: "Request to OMDB API timed out" });
    else res.status(400).json({ message: "An error occurred", error });
  }
};
