import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Account } from "./Account.entity";

@Entity("test-seller1")
export class test_Seller {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column("text")
  username!: string | undefined;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  shopName?: string;

  @Column({ type: "integer", nullable: true })
  accountId: number | undefined;

  @OneToOne(() => Account, (account) => account.seller, { nullable: true })
  @JoinColumn({ name: "accountId" })
  account: Account | undefined;
}
