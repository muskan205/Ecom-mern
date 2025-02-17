import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Product } from "./product.entity";
import { Product_Category } from "./category.entity";

@Entity("subcategory")
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column("text")
  subCategoryName!: string | undefined;

  @OneToMany(() => Product, (product) => product.subCategory)
  products: Product[] | undefined;

  @ManyToOne(() => Product_Category, (category) => category.subCategory)
  @JoinColumn({ name: "product_category_Id" })
  category: Product_Category | undefined;

  @Column({ type: "boolean", default: false })
  isDeleted: boolean | undefined;
}
