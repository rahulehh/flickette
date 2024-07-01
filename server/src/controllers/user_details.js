import db from "../configs/database.js";

export const sendUserDetail = async (req, res) => {
  const username = req.query.username;

  try {
    const response = await db.query(
      "select name, username, bio, created_at from users where username=$1",
      [username]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res.send(error);
  }
};
