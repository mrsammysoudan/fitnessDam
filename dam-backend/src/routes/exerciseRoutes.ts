// src/routes/exerciseRoutes.ts

import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
} from "../controllers/exerciseController";

const router = express.Router();

router.get("/", authMiddleware, getExercises);
router.get("/:id", authMiddleware, getExerciseById);

router.post("/", authMiddleware, createExercise);
router.put("/:id", authMiddleware, updateExercise);
router.delete("/:id", authMiddleware, deleteExercise);

export default router;
