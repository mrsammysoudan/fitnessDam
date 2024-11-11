import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { WorkoutPlan } from "./entities/WorkoutPlan";
import { WorkoutLog } from "./entities/WorkoutLog";
import { Exercise } from "./entities/Exercise";
import { WorkoutExercise } from "./entities/WorkoutExercise";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_NAME || "dam_app",
  entities: [User, WorkoutPlan, WorkoutLog, Exercise, WorkoutExercise],
  migrations: ["src/migrations/**/*.ts"],
  synchronize: false,
  logging: false,
});
