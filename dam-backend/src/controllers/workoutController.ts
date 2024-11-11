import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { WorkoutPlan } from "../entities/WorkoutPlan";
import { WorkoutExercise } from "../entities/WorkoutExercise";
import { Exercise } from "../entities/Exercise";
import { User } from "../entities/User";
import { In } from "typeorm";

export const createWorkoutPlan = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = (req as any).user.id;
  const { fitnessLevel, goals, equipment, workoutDays, name } = req.body;

  console.log("Received workout plan creation request:", req.body);

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Validate required fields
    if (!fitnessLevel || !goals || !equipment || !workoutDays) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    // Generate workout plan logic
    const exerciseRepository = AppDataSource.getRepository(Exercise);

    console.log(
      "Finding exercises with equipment:",
      equipment,
      "and difficulty:",
      fitnessLevel
    );

    const exercises = await exerciseRepository.find({
      where: {
        equipment: In(equipment),
        difficulty: fitnessLevel,
      },
    });

    if (exercises.length === 0) {
      res.status(400).json({ message: "No exercises found matching criteria" });
      return;
    }

    const workoutPlanRepository = AppDataSource.getRepository(WorkoutPlan);
    const workoutPlan = workoutPlanRepository.create({
      user,
      name: name || `Workout Plan ${new Date().toLocaleDateString()}`,
    });
    await workoutPlanRepository.save(workoutPlan);

    const workoutExerciseRepository =
      AppDataSource.getRepository(WorkoutExercise);
    for (const exercise of exercises) {
      const workoutExercise = workoutExerciseRepository.create({
        workoutPlan,
        exercise,
        sets: 3,
        reps: 10,
      });
      await workoutExerciseRepository.save(workoutExercise);
    }

    res
      .status(201)
      .json({ message: "Workout plan created", workoutPlanId: workoutPlan.id });
  } catch (error) {
    console.error("Error creating workout plan:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getWorkoutPlans = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = (req as any).user.id;

  try {
    const workoutPlanRepository = AppDataSource.getRepository(WorkoutPlan);
    const workoutPlans = await workoutPlanRepository.find({
      where: { user: { id: userId } },
      relations: ["workoutExercises", "workoutExercises.exercise"],
    });

    res.json(workoutPlans);
  } catch (error) {
    console.error("Error fetching workout plans:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getWorkoutPlanById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = (req as any).user.id;
  const id = Number(req.params.id);

  try {
    const workoutPlanRepository = AppDataSource.getRepository(WorkoutPlan);
    const workoutPlan = await workoutPlanRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ["workoutExercises", "workoutExercises.exercise"],
    });

    if (!workoutPlan) {
      res.status(404).json({ message: "Workout plan not found" });
      return;
    }

    res.json(workoutPlan);
  } catch (error) {
    console.error("Error fetching workout plan:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateWorkoutPlan = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = (req as any).user.id;
  const id = Number(req.params.id);
  const { name } = req.body;

  try {
    const workoutPlanRepository = AppDataSource.getRepository(WorkoutPlan);
    const workoutPlan = await workoutPlanRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!workoutPlan) {
      res.status(404).json({ message: "Workout plan not found" });
      return;
    }

    if (name) {
      workoutPlan.name = name;
    }
    await workoutPlanRepository.save(workoutPlan);

    res.json({ message: "Workout plan updated", workoutPlan });
  } catch (error) {
    console.error("Error updating workout plan:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteWorkoutPlan = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = (req as any).user.id;
  const id = Number(req.params.id);

  try {
    const workoutPlanRepository = AppDataSource.getRepository(WorkoutPlan);
    const result = await workoutPlanRepository.delete({
      id,
      user: { id: userId },
    });

    if (result.affected === 0) {
      res
        .status(404)
        .json({ message: "Workout plan not found or unauthorized" });
      return;
    }

    res.json({ message: "Workout plan deleted" });
  } catch (error) {
    console.error("Error deleting workout plan:", error);
    res.status(500).json({ message: "Server error" });
  }
};
