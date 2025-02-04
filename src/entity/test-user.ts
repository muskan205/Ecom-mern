import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Account } from "./Account.entity";

@Entity("user-test")
export class test_User {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column("text")
  username!: string | undefined;

  @OneToOne(() => Account, (account) => account.user, { nullable: true })
  @JoinColumn({ name: "accountId" }) 
  account?: Account | undefined;

  @Column({ type: "integer", nullable: true })
  accountId: number | undefined;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
