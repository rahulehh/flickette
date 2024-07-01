import db from "../configs/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

let { JWT_KEY } = process.env;

export const deleteLog = async (req, res) => {
  const id = req.query.id;

  const token = req.cookies.jwt_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, JWT_KEY, async (err, decoded) => {
    if (err)
      res
        .status(401)
        .json("Something has went wrong while verifing access token");

    let message = "nothing";

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
