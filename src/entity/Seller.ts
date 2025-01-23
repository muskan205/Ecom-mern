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
  
  @Column("varchar", { length: 255 })
  shopName?: string | undefined;

  @Column("varchar", { length: 255 })
  email?: string | undefined;

  @Column({ type: "varchar", length: 255 })
  password!: string;


  @Column({
    type: "enum",
    enum: ["admin", "seller", "user"],
    default: "seller",
  })
  role: "seller" | undefined;

  @OneToOne(() => User, (user) => user.seller)
  @JoinColumn()
  user: User | undefined;
}
