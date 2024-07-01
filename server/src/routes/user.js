import express from "express";
import {
  handleSignIn,
  hangleSignOut,
} from "../controllers/user_authentication.js";
import { sendUserDetail } from "../controllers/user_details.js";
import { handleProfileUpdate } from "../controllers/profile_updataion.js";

const router = express.Router();

router.post("/api/signin", handleSignIn);
router.post("/api/signout", hangleSignOut);

router.post("/api/profile_update", handleProfileUpdate);

router.get("/api/user_deatail", sendUserDetail);

export default router;
