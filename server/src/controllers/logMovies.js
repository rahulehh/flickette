import db from "../configs/database.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

let { OMDB_API, JWT_KEY } = process.env;

export const handleMovieLog = (req, res) => {
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

    let message = "nothing";

    try {
      const imdbIdFoundInDB = await db.query(
        "select * from movies where imdb_id=$1",
        [bodyData.imdbId]
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
            ]
          );
        }
      }

      await db.query(
        "insert into logs(imdb_id, user_id, review, log_date) values ($1, $2, $3, $4)",
        [bodyData.imdbId, user_id, bodyData.review, bodyData.logDate]
      );

      message = "updated";
    } catch (error) {
      console.log(error);
      message = "error has occured in server side";
    }

    res.status(200).json(message);
  });
};
