import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { test_Seller } from "./test-seller";
import { test_User } from "./test-user";

@Entity("account")
export class Account {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column("varchar", { unique: true, nullable: true })
  email!: string | undefined;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ type: "enum", enum: ["admin", "seller", "user"], default: "user" })
  role?: "admin" | "seller" | "user" | undefined;

  @Column({ type: "text", nullable: true })
  accessToken?: string | undefined;

  @Column({ type: "text", nullable: true })
  refreshToken?: string | undefined;

  @Column({ type: "text", nullable: true })
  otp?: string | undefined;

  @Column({ type: "timestamp", nullable: true })
  otpExpires?: Date | undefined;

  @Column({ type: "timestamp", nullable: true })
  lastOtpSentAt?: Date | null | undefined;

  @Column({ type: "boolean", nullable: true, default: true })
  active: boolean = true;

  @OneToOne(() => test_Seller, (seller) => seller.account, {
    nullable: true,
  })
  @JoinColumn({ name: "sellerAccount", referencedColumnName: "id" })
  seller?: test_Seller;

  @OneToOne(() => test_User, (user) => user.account, {
    nullable: true,
  })
  @JoinColumn({ name: "accountId", referencedColumnName: "id" })
  user?: test_User;


  
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}