import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  fileUrl!: string;

  @Column()
  fileName!: string;
}
