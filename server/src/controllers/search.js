import db from "../configs/database.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

let { OMDB_API } = process.env;

export const handleSearch = async (req, res) => {
  const searchTerm = req.query.s;
  try {
    const query = await db.query(
      "select username, name, bio from users where (username ilike $1 or name ilike $1)",
      [searchTerm + "%"]
    );

    const apiResponse = await axios.get(OMDB_API + `s=${searchTerm}`, {
      timeout: 10000,
    });

    res
      .status(200)
      .json({ users: query.rows, movies: apiResponse.data.Search });
  } catch (error) {
    console.log(error);
    if (error.code === "ETIMEDOUT") {
      res.status(504).json({ message: "Request to OMDB API timed out" });
    } else {
      res.status(400).json({ message: "An error occurred", error });
    }
  }
};
