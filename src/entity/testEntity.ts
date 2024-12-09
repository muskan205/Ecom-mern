import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("muskan_test88")
export class UserNew {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column("text")
  firstName!: string;
}
