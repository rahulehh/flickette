import express from "express";
import {
  signInUser,
  signOutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/users.controller.js";

const router = express.Router();

router.post("/api/auth/signin", signInUser);
router.post("/api/auth/signout", signOutUser);

router.get("/api/users/:username/", getUserProfile); 
router.patch("/api/users/profile", updateUserProfile); 

export default router;
