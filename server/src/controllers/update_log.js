import db from "../configs/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

let { JWT_KEY } = process.env;

export const updateLog = async (req, res) => {
  const bodyData = {
    id: req.body.id,
    review: req.body.review,
  };

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
      const logDetails = await db.query("select * from logs where id=$1", [
        bodyData.id,
      ]);
      if (logDetails.rows[0].user_id == user_id) {
        await db.query("update logs set review=$1 where id=$2", [
          bodyData.review,
          bodyData.id,
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
