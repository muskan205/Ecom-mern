import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./OrderEntity";

@Entity()
export class Customers {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ type: "text", nullable: false })
  name!: string;

  @Column({ nullable: false })
  city!: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[] | undefined;
}
