import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { WorkoutExercise } from "./WorkoutExercise";
import { WorkoutLog } from "./WorkoutLog";

@Entity()
export class WorkoutPlan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => User, (user) => user.workoutPlans)
  user!: User;

  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise) => workoutExercise.workoutPlan,
    { cascade: true }
  )
  workoutExercises!: WorkoutExercise[];

  @OneToMany(() => WorkoutLog, (workoutLog) => workoutLog.workoutPlan)
  workoutLogs!: WorkoutLog[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
