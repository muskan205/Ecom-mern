import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";



@Entity("seller_analytics")
export class Seller_Analytics {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column("varchar", { length: 255, nullable: true })
  totalShops?: string | undefined;

  @Column("varchar", { length: 255, nullable: true })
  totalCategories?: string | undefined;

  @Column("varchar", { length: 255, nullable: true })
  totalSubcategories?: string | undefined;
  
  @Column("varchar", { length: 255, nullable: true })
  totalProducts?: string | undefined;
  

}
