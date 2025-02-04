import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity("seller")
export class Seller {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column("text")
  username!: string | undefined;
  
  @Column({
    type: "varchar",
    length: 255,
    nullable: true
  })
  shopName?: string;

  @Column("varchar", { length: 255,nullable: true })
  email: string | undefined;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true
  })
  password?: string;


  @Column({
    type: "enum",
    enum: ["admin", "seller", "user"],
    default: "seller",
  })
  role: "seller" | undefined;

  @OneToOne(() => User, (user) => user.seller)
  @JoinColumn()
  user: User | undefined;

  @Column({ type: "text", nullable: true })
  // passwordResetToken!: string;
  accessToken?: string | undefined;

  @Column({ type: "text", nullable: true })
  // passwordResetToken!: string;
  refreshToken?: string | undefined;
}
