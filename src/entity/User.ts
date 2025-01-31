import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Seller } from "./Seller";
// import { Seller } from "./Seller";

@Entity("user1")
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column("text")
  username!: string | undefined;

  @Column("varchar", { unique: true, nullable: false })
  email!: string | undefined;

  @Column({ type: "enum", enum: ["admin", "seller", "user"] ,nullable:true})
  role?: "admin" | "seller" | "user" | undefined;

  @Column({ type: "boolean", nullable: false, default: true })
  active: boolean = true;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ type: "text", nullable: true })
  otp?: string | undefined;

  @Column({ type: "timestamp", nullable: true })
  otpExpires?: Date | undefined;

  @Column({ type: "timestamp", nullable: true })
  lastOtpSentAt?: Date | null | undefined;


  @Column({ type: "text", nullable: true })
  // passwordResetToken!: string;
  accessToken?: string | undefined;

  @Column({ type: "text", nullable: true })
  // passwordResetToken!: string;
  refreshToken?: string | undefined;

  //seller id act as a foregin key that refrend the seller table or entity
  @Column({ type: "int", nullable: true })
  sellerId: number | null | undefined;

  @OneToOne(() => Seller, (seller) => seller.user)
  @JoinColumn()
  seller: Seller | null | undefined;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
