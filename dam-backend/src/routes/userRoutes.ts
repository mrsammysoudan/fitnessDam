import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  getUserData,
  getProfilePicture,
  uploadProfilePicture,
  updateUserProfile,
} from "../controllers/userController";

const router = express.Router();

router.get("/me", authMiddleware, getUserData);
router.get("/profile-picture", authMiddleware, getProfilePicture);
router.post("/upload-profile-picture", authMiddleware, uploadProfilePicture);
router.put("/me", authMiddleware, updateUserProfile);

export default router;
