import db from "../configs/database.js";
import jwt from "jsonwebtoken";
import { generateUsername } from "unique-username-generator";
import dotenv from "dotenv";

dotenv.config();

let { JWT_KEY } = process.env;

export const handleSignIn = async (req, res) => {
  var data = {
    email: req.body.email,
    name: req.body.name,
    user_id: req.body.user_id,
    isNewUser: false,
  };

  let query;

  /*
  here is the logic:
  check if the uuid exists,
    if the google firebase instance is registestered in firebase
      if exists, check if the email is also correct
        login in to the user
      else(uuid doesn't exist)
        generate random username that is not in the table
        create new row, containing the values (user_id, email, name, username)
  */

  try {
    if (data.email && data.user_id) {
      query = await db.query(
        "select * from users where user_id=$1 and email=$2",
        [data.user_id, data.email]
      );

      if (query.rowCount == 0) {
        let username = generateUsername();

        while (true) {
          query = await db.query("select * from users where username=$1", [
            username,
          ]);
          if (query.rowCount == 0) {
            break;
          } else {
            username = generateUsername();
          }
        }
        await db.query(
          "insert into users(name, email, user_id, username) values ($1, $2, $3, $4)",
          [data.name, data.email, data.user_id, username]
        );
        data.isNewUser = true;
        data = { username: username, ...data };
      } else if (query.rowCount == 1) {
        data = {
          user_id: query.rows[0].user_id,
          email: query.rows[0].email,
          username: query.rows[0].username,
          isNewUser: false,
        };
      }

      let token = jwt.sign({ user_id: data.user_id }, JWT_KEY);

      res
        .cookie("jwt_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(data);
    }
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

export const hangleSignOut = async (req, res) => {
  res
    .clearCookie("jwt_token", { sameSite: "none", secure: true })
    .status(200)
    .json("User has been logged out");
};
