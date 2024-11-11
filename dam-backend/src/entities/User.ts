import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { WorkoutPlan } from "./WorkoutPlan";
import { WorkoutLog } from "./WorkoutLog";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  profilePictureUrl?: string;

  @OneToMany(() => WorkoutPlan, (workoutPlan) => workoutPlan.user)
  workoutPlans!: WorkoutPlan[];

  @OneToMany(() => WorkoutLog, (workoutLog) => workoutLog.user)
  workoutLogs!: WorkoutLog[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
