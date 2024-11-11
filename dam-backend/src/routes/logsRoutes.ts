import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  getWorkoutLogs,
  createWorkoutLog,
} from "../controllers/logsController";

const router = express.Router();

// GET /api/logs - Retrieve all workout logs for the authenticated user
router.get("/", authMiddleware, getWorkoutLogs);

// POST /api/logs - Create a new workout log
router.post("/", authMiddleware, createWorkoutLog);

export default router;
