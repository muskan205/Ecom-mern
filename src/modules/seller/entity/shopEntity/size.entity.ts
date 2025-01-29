import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity("size")
export class Size {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column("varchar", { length: 255 })
  sizeName?: string | undefined;

  @OneToMany(() => Product, (product) => product.size)
  products?: Product[] | undefined;
}
