import db from "../configs/database.js";

export const fetchMovieReviews = async (req, res) => {
  const imdbId = req.query.im;

  try {
    const query = await db.query(
      "SELECT logs.id as id, users.username as username, users.name as name, logs.imdb_id as imdb_id, logs.review as review, logs.log_date as log_date FROM users JOIN logs ON users.user_id = logs.user_id WHERE logs.imdb_id = $1",
      [imdbId]
    );
    res.status(200).json({ message: "fetched", data: query.rows });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "An error occurred" });
  }
};
