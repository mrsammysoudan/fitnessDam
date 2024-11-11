import express from "express";
import multer from "multer";
import { uploadFile, listAssets } from "../controllers/uploadController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", authMiddleware, upload.single("file"), uploadFile);

router.get("/", authMiddleware, listAssets);

export default router;
