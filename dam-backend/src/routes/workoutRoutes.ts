import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createWorkoutPlan,
  getWorkoutPlans,
  getWorkoutPlanById,
  updateWorkoutPlan,
  deleteWorkoutPlan,
} from "../controllers/workoutController";

const router = express.Router();

router.post("/", authMiddleware, createWorkoutPlan);
router.get("/", authMiddleware, getWorkoutPlans);
router.get("/:id", authMiddleware, getWorkoutPlanById);
router.put("/:id", authMiddleware, updateWorkoutPlan);
router.delete("/:id", authMiddleware, deleteWorkoutPlan);

export default router;
