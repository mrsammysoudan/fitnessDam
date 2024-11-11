import "reflect-metadata";
import { AppDataSource } from "../data-source";
import { Exercise } from "../entities/Exercise";

const seedExercises = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established for seeding.");

    const exerciseRepository = AppDataSource.getRepository(Exercise);

    const exercisesData = [
      {
        name: "Push-up",
        description: "A bodyweight exercise that targets the chest.",
        imageUrl: "https://example.com/push-up.jpg",
        equipment: "bodyweight",
        difficulty: "beginner",
      },
      {
        name: "Squat",
        description:
          "A lower-body exercise that targets the thighs and glutes.",
        imageUrl: "https://example.com/squat.jpg",
        equipment: "bodyweight",
        difficulty: "beginner",
      },
      {
        name: "Barbell Deadlift",
        description: "A compound exercise that targets the back and legs.",
        imageUrl: "https://example.com/deadlift.jpg",
        equipment: "barbell",
        difficulty: "intermediate",
      },

      {
        name: "Intermediate Push-up",
        description: "A bodyweight exercise for intermediate level.",
        imageUrl: "https://example.com/push-up.jpg",
        equipment: "bodyweight",
        difficulty: "intermediate",
      },
      {
        name: "Intermediate Squat",
        description: "A bodyweight exercise for intermediate level.",
        imageUrl: "https://example.com/squat.jpg",
        equipment: "bodyweight",
        difficulty: "intermediate",
      },
    ];

    for (const exerciseData of exercisesData) {
      const existingExercise = await exerciseRepository.findOne({
        where: { name: exerciseData.name },
      });

      if (!existingExercise) {
        const exercise = exerciseRepository.create(exerciseData);
        await exerciseRepository.save(exercise);
        console.log(`Seeded exercise: ${exercise.name}`);
      } else {
        console.log(`Exercise already exists: ${existingExercise.name}`);
      }
    }

    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding exercises:", error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
  }
};

seedExercises();
