import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { WorkoutPlan } from "./WorkoutPlan";
import { Exercise } from "./Exercise";

@Entity()
export class WorkoutExercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => WorkoutPlan, (workoutPlan) => workoutPlan.workoutExercises)
  workoutPlan!: WorkoutPlan;

  @ManyToOne(() => Exercise)
  exercise!: Exercise;

  @Column()
  sets!: number;

  @Column()
  reps!: number;
}
