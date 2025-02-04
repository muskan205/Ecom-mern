import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Account } from "./Account.entity";
import { Seller_Shop } from "../modules/seller/entity/shop.entity";

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
  @JoinColumn({ name: "sellerAccount" })
  account: Account | undefined;

  @OneToOne(() => Seller_Shop, (shop) => shop.seller, { nullable: true })
  shop: Seller_Shop[] | undefined;

  @Column({ type: "integer", nullable: true })
  shopId: number | undefined;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
