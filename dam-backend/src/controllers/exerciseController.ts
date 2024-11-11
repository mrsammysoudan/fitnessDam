import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Exercise } from "../entities/Exercise";

export const getExercises = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const exerciseRepository = getRepository(Exercise);
    const exercises = await exerciseRepository.find();
    res.json(exercises);
  } catch (error) {
    console.error("Error fetching exercises:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getExerciseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);

  try {
    const exerciseRepository = getRepository(Exercise);
    const exercise = await exerciseRepository.findOne({ where: { id } });

    if (!exercise) {
      res.status(404).json({ message: "Exercise not found" });
      return;
    }

    res.json(exercise);
  } catch (error) {
    console.error("Error fetching exercise:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createExercise = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, imageUrl, equipment, difficulty } = req.body;

  try {
    const exerciseRepository = getRepository(Exercise);
    const newExercise = exerciseRepository.create({
      name,
      description,
      imageUrl,
      equipment,
      difficulty,
    });

    await exerciseRepository.save(newExercise);

    res
      .status(201)
      .json({ message: "Exercise created", exercise: newExercise });
  } catch (error) {
    console.error("Error creating exercise:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateExercise = async (
  req: Request,
  res: Response
): Promise<void> => {};

export const deleteExercise = async (
  req: Request,
  res: Response
): Promise<void> => {};
