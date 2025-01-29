import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity("images")
export class Images {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column("varchar", { length: 255 })
  url!: string;

  @ManyToOne(() => Product, (product) => product.images)
  @JoinColumn({ name: "productID" })
  product: Product | undefined;
}
