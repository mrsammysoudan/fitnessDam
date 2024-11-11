import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { WorkoutPlan } from "./WorkoutPlan";

@Entity()
export class WorkoutLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.workoutLogs)
  user!: User;

  @ManyToOne(() => WorkoutPlan, (workoutPlan) => workoutPlan.workoutLogs)
  workoutPlan!: WorkoutPlan;

  @Column()
  date!: Date;

  @Column({ nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
