import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./product.entity";

@Entity("subcategory")
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column("text")
  subCategoryName!: string | undefined;

  @OneToMany(() => Product, (product) => product.subCategory)
  products: Product[] | undefined;
}
