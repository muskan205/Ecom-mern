import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Product } from "./shopEntity/product.entity";
import { Product_Category } from "./shopEntity/category.entity";
import { Seller } from "../../../entity/Seller";
import { test_Seller } from "../../../entity/test-seller";

@Entity("seller_shop")
export class Seller_Shop {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column("varchar", { length: 255 })
  shopName?: string | undefined;

  @Column("varchar", { length: 255 })
  shopDescription?: string | undefined;

  @Column("varchar", { length: 255 })
  location?: string | undefined;

  @Column("varchar", { length: 255 })
  logo_url?: string | undefined;

  @Column({ type: "enum", enum: ["Active", "Inactive"], default: "Active" })
  status: "Active" | "Inactive" | undefined;

  @ManyToOne(() => Product_Category, (category) => category.shops)
  @JoinColumn({ name: "categoryId" })
  category: Product_Category | undefined;

  @OneToOne(() => test_Seller, (seller) => seller.shop,{nullable:true})
  @JoinColumn({name:"sellerId"})
  seller: test_Seller | undefined;

  @OneToMany(() => Product, (product) => product.shop)
  products?: Product[] | undefined;
}
