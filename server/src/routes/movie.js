import express from "express";
import { handleSearch } from "../controllers/search.js";
import { handleMovieFetch } from "../controllers/handle_movie_fetch.js";
import { fetchMovieReviews } from "../controllers/fetch_movie_reviews.js";

const router = express.Router();

router.get("/api/search", handleSearch);
router.get("/api/fetch_movie_details", handleMovieFetch);
router.get("/api/fetch_movie_reviews", fetchMovieReviews);

export default router;
