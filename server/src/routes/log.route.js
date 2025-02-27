import express from "express";
import {
  createLog,
  getUserLogs,
  deleteLog,
  updateLog,
} from "../controllers/logs.controller.js";

const router = express.Router();

router.post("/api/logs", createLog);
router.get("/api/users/:username/logs", getUserLogs);
router.delete("/api/logs/:id", deleteLog);
router.patch("/api/logs/:id", updateLog);

export default router;
