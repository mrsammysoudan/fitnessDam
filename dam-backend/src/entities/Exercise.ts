import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  imageUrl!: string; // S3 URL for the profile image

  @Column()
  equipment!: string;

  @Column()
  difficulty!: string;
}
