import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./product.entity";
import { Seller_Shop } from "../shop.entity";

@Entity("category")
export class Product_Category {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column("varchar", { length: 255 })
  categoryName: string | undefined;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[] | undefined;

  @OneToMany(() => Seller_Shop, (shop) => shop.category)
  shops: Seller_Shop[] | undefined;

}
