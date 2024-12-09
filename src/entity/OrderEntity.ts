import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customers } from "./CustomerEntity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number | undefined;

  @Column({ type: "text", nullable: false })
  order_name!: string;

  @Column({ type: Date })
  order_date: Date | undefined;

  @OneToMany(() => Customers, (customer) => customer.orders)
  @JoinColumn({ name: "customer_id" })
  customer!: Customers;
}
