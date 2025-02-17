import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Product_Category } from "./category.entity";
import { Seller_Shop } from "../shop.entity";
import { Images } from "./image.entity";
import { Size } from "./size.entity";
import { SubCategory } from "./subcategory.entity";

@Entity("product")
export class Product {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column("text")
  name!: string | undefined;

  @Column("varchar", { length: 255 })
  description?: string | undefined;

  @Column("varchar", { length: 255 })
  price?: string | undefined;

  @Column({ type: "varchar", length: 255 })
  qunatity!: string;

  @ManyToOne(() => Seller_Shop, (shop) => shop.products)
  @JoinColumn({ name: "shopID" })
  shop!: Seller_Shop;

  @ManyToOne(() => Product_Category, (category) => category.products)
  @JoinColumn({ name: "categoryID" })
  category!: Product_Category;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.products)
  @JoinColumn({ name: "subCategoryID" })
  subCategory!: SubCategory;

  @Column({ type: "varchar", length: 255 })
  imageId!: string;

  @OneToMany(() => Images, (images) => images.product)
  images: Images[] | undefined;

  @ManyToOne(() => Size, (size) => size.products)
  @JoinColumn({ name: "sizeID" })
  size!: Size;
}
