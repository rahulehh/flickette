import express from "express";
import {
  searchMovies,
  getMovieDetails,
  getMovieReviews,
} from "../controllers/movies.controller.js";

const router = express.Router();

router.get("/api/movies/search", searchMovies); // perform search and get the movies
router.get("/api/movies/:id", getMovieDetails); // get movie details by movie id
router.get("/api/movies/:id/reviews", getMovieReviews); // get all movie reviews by movie id

export default router;
