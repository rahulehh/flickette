import db from "../configs/database.js";

export const getProfileLogs = async (req, res) => {
  const username = req.query.u;
  try {
    const query = await db.query(
      "SELECT logs.id as log_id, logs.imdb_id as imdb_id, logs.review as review, logs.log_date as log_date, movies.poster_url as poster_url, movies.title as title, movies.year as year FROM logs JOIN users ON logs.user_id = users.user_id JOIN movies ON logs.imdb_id = movies.imdb_id WHERE users.username = $1 ORDER BY logs.log_date DESC",
      [username]
    );
    res.status(200).json({ message: "fetched", data: query.rows });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "An error occurred" });
  }
};
