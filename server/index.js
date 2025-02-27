import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import user from "./src/routes/user.route.js";
import movie from "./src/routes/movie.route.js";
import log from "./src/routes/log.route.js";
import corsMiddleware from "./src/middlewares/cors.js";
import db from "./src/configs/database.js";

const app = express();
const port = 44545;

dotenv.config();
db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(corsMiddleware);

app.use(user);
app.use(movie);
app.use(log);

app.listen(port, () => {
  console.log(
    `*****\nListening at ${port}\nVisit: http://127.0.0.1:${port}\n*****`,
  );
});
