import db from "../configs/database.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

let { OMDB_API } = process.env;

export const searchMovies = async (req, res) => {
  const searchTerm = req.query.s;
  try {
    const query = await db.query(
      "select username, name, bio from users where (username ilike $1 or name ilike $1)",
      [searchTerm + "%"],
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

export const getMovieDetails = async (req, res) => {
  const imdbId = req.params.id;

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

export const getMovieReviews = async (req, res) => {
  const imdbId = req.params.id;

  try {
    const query = await db.query(
      "SELECT logs.id as id, users.username as username, users.name as name, logs.imdb_id as imdb_id, logs.review as review, logs.log_date as log_date FROM users JOIN logs ON users.user_id = logs.user_id WHERE logs.imdb_id = $1",
      [imdbId],
    );
    res.status(200).json({ message: "fetched", data: query.rows });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "An error occurred" });
  }
};
