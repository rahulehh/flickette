import db from "../configs/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

let { JWT_KEY } = process.env;

export const handleProfileUpdate = async (req, res) => {
  const bodyData = {
    username: req.body.username,
    name: req.body.name,
    bio: req.body.bio,
  };
  const token = req.cookies.jwt_token;
  if (!token) return res.status(401).json("Not authenticated!");

  /*
  Verify the token and get the value of user_id
  select the details of user from the user_id 
  if rows[0] == null, there is no user with the user_id
  else
    if bodyData.username != username:
      check if the user name already exists
        if exists, send the reponse that the username that it already exists
    update the details
    send the response that the details has been updated
  */

  jwt.verify(token, JWT_KEY, async (err, decoded) => {
    if (err)
      res
        .status(401)
        .json("Something has went wrong while verifing access token");

    const user_id = decoded.user_id;

    const query = await db.query("select * from users where user_id=$1", [
      user_id,
    ]);

    let message = "nothing";

    if (bodyData.username != query.rows[0].username) {
      try {
        const query2 = await db.query("select * from users where username=$1", [
          bodyData.username,
        ]);
        if (!query2.rows) {
          message = "username already exist! try using another username";
        } else {
          await db.query(
            "update users set username=$1, name=$2, bio=$3 where user_id=$4",
            [bodyData.username, bodyData.name, bodyData.bio, user_id]
          );
          message = "Profile has been updated";
        }
      } catch (error) {
        console.log(error);
        message = "some error has occured";
      }
    } else {
      await db.query(
        "update users set username=$1, name=$2, bio=$3 where user_id=$4",
        [bodyData.username, bodyData.name, bodyData.bio, user_id]
      );
      message = "Profile has been updated";
    }
    res.status(200).json({ message: message });
  });
};
