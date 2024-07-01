import express from "express";
import { handleMovieLog } from "../controllers/logMovies.js";
import { getProfileLogs } from "../controllers/profile_logs.js";
import { deleteLog } from "../controllers/delete_log.js";
import { updateLog } from "../controllers/update_log.js";

const router = express.Router();

router.post("/api/log_movie", handleMovieLog);
router.get("/api/fetch_user_logs", getProfileLogs);
router.post("/api/delete_log", deleteLog);
router.post("/api/update_log", updateLog);

export default router;
