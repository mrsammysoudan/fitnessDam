import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { WorkoutLog } from "../entities/WorkoutLog";
import { WorkoutPlan } from "../entities/WorkoutPlan";

export const getWorkoutLogs = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = (req as any).user.id;

  try {
    const workoutLogRepository = AppDataSource.getRepository(WorkoutLog);
    const workoutLogs = await workoutLogRepository.find({
      where: { user: { id: userId } },
      relations: [
        "workoutPlan",
        "workoutPlan.workoutExercises",
        "workoutPlan.workoutExercises.exercise",
      ],
      order: { date: "DESC" },
    });

    res.status(200).json(workoutLogs);
  } catch (error) {
    console.error("Error fetching workout logs:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching workout logs." });
  }
};

export const createWorkoutLog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = (req as any).user.id;
  const { workoutPlanId, date, notes } = req.body;

  if (!workoutPlanId || !date) {
    res.status(400).json({ message: "Please provide workoutPlanId and date." });
    return;
  }

  try {
    const workoutPlanRepository = AppDataSource.getRepository(WorkoutPlan);
    const workoutPlan = await workoutPlanRepository.findOne({
      where: { id: workoutPlanId, user: { id: userId } },
    });

    if (!workoutPlan) {
      res.status(404).json({ message: "Workout plan not found." });
      return;
    }

    const workoutLogRepository = AppDataSource.getRepository(WorkoutLog);
    const workoutLog = workoutLogRepository.create({
      user: { id: userId },
      workoutPlan,
      date: new Date(date),
      notes,
    });

    await workoutLogRepository.save(workoutLog);

    res
      .status(201)
      .json({ message: "Workout log created successfully.", workoutLog });
  } catch (error) {
    console.error("Error creating workout log:", error);
    res
      .status(500)
      .json({ message: "Server error while creating workout log." });
  }
};
