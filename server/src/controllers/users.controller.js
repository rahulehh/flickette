import db from "../configs/database.js";
import jwt from "jsonwebtoken";
import { generateUsername } from "unique-username-generator";
import dotenv from "dotenv";

dotenv.config();

let { JWT_KEY } = process.env;

export const signInUser = async (req, res) => {
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
        [data.user_id, data.email],
      );
      console.log({ query_rows: query.rows });

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
          [data.name, data.email, data.user_id, username],
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
        console.log(data);
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

export const signOutUser = async (_req, res) => {
  res
    .clearCookie("jwt_token", { sameSite: "none", secure: true })
    .status(200)
    .json("User has been logged out");
};

export const updateUserProfile = async (req, res) => {
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

    let message = "";

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
            [bodyData.username, bodyData.name, bodyData.bio, user_id],
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
        [bodyData.username, bodyData.name, bodyData.bio, user_id],
      );
      message = "Profile has been updated";
    }
    res.status(200).json({ message: message });
  });
};

export const getUserProfile = async (req, res) => {
  const username = req.params.username;

  console.log(username);

  try {
    const response = await db.query(
      "select name, username, bio, created_at from users where username=$1",
      [username],
    );
    console.log(response.rows);
    res.status(200).json(response.rows);
  } catch (error) {
    res.send(error);
  }
};
