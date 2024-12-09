import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("muskan_new")
export class UserNew {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column("text")
  firstName!: string;

  @Column("text")
  lastName!: string;

  @Column({ type: "text", nullable: false })
  description: string | undefined;

  @Column({ type: "boolean", nullable: false, default: false })
  active: boolean = false;
}
