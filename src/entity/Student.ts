import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("student")
export class Student {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  name!: string;

  @Column()
  roll_no!: string;
}
