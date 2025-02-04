import { CreateShopDto } from "../dto/create.shop.dto";
import { Seller_Shop } from "../entity/shop.entity";
import { Seller } from "../../../entity/Seller";
import { paginate } from "../../../infra/utils/pagination";
import { test_Seller } from "../../../entity/test-seller";
import { CreateCategoryDto } from "../dto/create.category.dto";
import { Product_Category } from "../entity/shopEntity/category.entity";
import { FindOptionsWhere, Like } from "typeorm";
const { AppDataSource } = require("../../../infra/db/data-source");

export class SellerService {
  private shopRepository = AppDataSource.getRepository(Seller_Shop);
  private sellerRepository = AppDataSource.getRepository(test_Seller);
  private categoryRepository = AppDataSource.getRepository(Product_Category);

  async createShop(
    shopDto: CreateShopDto,
    req: unknown,
    res: unknown
  ): Promise<any> {
    const {
      shopName,
      shopDescription,
      location,
      logo_url,
      status,
      sellerId,
      categoryId,
    } = shopDto;

    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    const seller = await this.sellerRepository.findOneBy({ id: sellerId });
    if (!seller) {
      throw new Error("Seller not found");
    }
    if (!category) {
      throw new Error("category not found with this id");
    }

    const sellerShop = this.shopRepository.create({
      shopName,
      shopDescription,
      location,
      logo_url,
      status,
      seller,
      category,
    });
    const savedShop = await this.shopRepository.save(sellerShop);

    //here im saving the shopname in seller table
seller.id

    seller.shopName = shopName; // Update the shopName field
    if (!seller.shops) {
      seller.shops = [];
    }

    seller.shops.push(savedShop);
    await this.sellerRepository.save(seller);

    return savedShop;
  }

  async getAllShops(): Promise<any> {
    try {
      const rawQuery = `
     SELECT s.*
FROM seller_shop s
JOIN seller ON seller.id = s."sellerId";

    `;

      const shops = await this.shopRepository.manager.query(rawQuery);
      console.log("shops",shops)
      if (!shops.length) {
        return { status: 404, message: "No sellers found" };
      }
      return { status: 200, shops };
    } catch (error: any) {
      throw new Error("Something went wrong");
    }
  }

  async getShopById(id: string): Promise<any> {
    try {
      const shops = await this.shopRepository.findOneBy({ id });
      if (!shops) {
        return { status: 404, message: "No shops found" };
      }
      return { status: 200, shops };
    } catch (error: any) {
      throw new Error("Something went wrong");
    }
  }

  async createCategory(
    categoryDto: CreateCategoryDto,
    req: unknown,
    res: unknown
  ): Promise<any> {
    const { categoryName } = categoryDto;

    const existingCategory = await this.categoryRepository.findOneBy({
      categoryName,
    });

    if (existingCategory) {
      throw new Error("Category already exists");
    }

    const category = this.categoryRepository.create({
      categoryName,
    });

    return this.categoryRepository.save(category);
  }
  async getProductCategory(): Promise<any> {
    try {
      const rawQuery = `
   select * from category

    `;

      const shops = await this.shopRepository.manager.query(rawQuery);
      console.log("shops",shops)
      if (!shops.length) {
        return { status: 404, message: "No sellers found" };
      }
      return { status: 200, shops };
    } catch (error: any) {
      throw new Error("Something went wrong");
    }
  }

  async searchShops(shopName?: string): Promise<{ status: number; message?: string; shops?: any[] }> {
    try {
      // If shopName is provided, search for shops with matching names
      const shops = shopName
        ? await this.shopRepository.find({ where: { shopName } })
        : [];

      if (shops.length === 0) {
        return { status: 404, message: 'No shops found' };
      }

      return { status: 200, shops };
    } catch (error) {
      console.error('Error searching shops:', error);
      return { status: 500, message: 'Something went wrong' };
    }
  }
  //search shop api

}
