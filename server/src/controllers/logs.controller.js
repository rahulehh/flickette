import db from "../configs/database.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

let { OMDB_API, JWT_KEY } = process.env;

export const createLog = (req, res) => {
  const bodyData = {
    imdbId: req.body.imdbId,
    review: req.body.review,
    logDate: req.body.logDate,
  };

  const token = req.cookies.jwt_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, JWT_KEY, async (err, decoded) => {
    if (err)
      res
        .status(401)
        .json("Something has went wrong while verifing access token");

    const user_id = decoded.user_id;

    let message = "";

    try {
      const imdbIdFoundInDB = await db.query(
        "select * from movies where imdb_id=$1",
        [bodyData.imdbId],
      );

      if (imdbIdFoundInDB.rows.length == 0) {
        const apiResponse = await axios.get(OMDB_API + `i=${bodyData.imdbId}`);

        if (apiResponse.data.Response === "True") {
          await db.query(
            "insert into movies(imdb_id, title, year, poster_url) values ($1, $2, $3, $4)",
            [
              bodyData.imdbId,
              apiResponse.data.Title,
              apiResponse.data.Year,
              apiResponse.data.Poster,
            ],
          );
        }
      }

      await db.query(
        "insert into logs(imdb_id, user_id, review, log_date) values ($1, $2, $3, $4)",
        [bodyData.imdbId, user_id, bodyData.review, bodyData.logDate],
      );

      message = "updated";
    } catch (error) {
      console.error(error);
      message = "error has occured in server side";
    }

    res.status(200).json(message);
  });
};

export const deleteLog = async (req, res) => {
  const id = req.params.id;

  const token = req.cookies.jwt_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, JWT_KEY, async (err, decoded) => {
    if (err)
      res
        .status(401)
        .json("Something has went wrong while verifing access token");

    let message = "";

    const user_id = decoded.user_id;

    try {
      const logDetails = await db.query("select * from logs where id=$1", [id]);
      if (logDetails.rows[0].user_id == user_id) {
        await db.query("delete from logs where id=$1", [id]);
        message = "deleted";
      } else {
        message = "not authorized";
      }
    } catch (error) {
      console.error(error);
      message = "error";
    }

    res.status(200).json(message);
  });
};

export const getUserLogs = async (req, res) => {
  const username = req.params.username;
  try {
    const query = await db.query(
      "SELECT logs.id as log_id, logs.imdb_id as imdb_id, logs.review as review, logs.log_date as log_date, movies.poster_url as poster_url, movies.title as title, movies.year as year FROM logs JOIN users ON logs.user_id = users.user_id JOIN movies ON logs.imdb_id = movies.imdb_id WHERE users.username = $1 ORDER BY logs.log_date DESC",
      [username],
    );
    res.status(200).json({ message: "fetched", data: query.rows });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "An error occurred" });
  }
};

export const updateLog = async (req, res) => {
  const id = req.params.id;
  const bodyData = {
    review: req.body.review,
  };

  const token = req.cookies.jwt_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, JWT_KEY, async (err, decoded) => {
    if (err)
      res
        .status(401)
        .json("Something has went wrong while verifing access token");

    let message = "";

    const user_id = decoded.user_id;

    try {
      const logDetails = await db.query("select * from logs where id=$1", [id]);
      if (logDetails.rows[0].user_id == user_id) {
        await db.query("update logs set review=$1 where id=$2", [
          bodyData.review,
          id,
        ]);
        message = "updated";
      } else {
        message = "not authorized";
      }
    } catch (error) {
      console.error(error);
      message = "error";
    }
    res.status(200).json(message);
  });
};
