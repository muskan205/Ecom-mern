import { CreateShopDto } from "../dto/create.shop.dto";
import { Seller_Shop } from "../entity/shop.entity";

import { test_Seller } from "../../../entity/test-seller";
import { CreateCategoryDto } from "../dto/create.category.dto";
import { Product_Category } from "../entity/shopEntity/category.entity";
import { CreateSubCategoryDto } from "../dto/create.subCategory.dto";
import { SubCategory } from "../entity/shopEntity/subcategory.entity";
import { In } from "typeorm";
import { CreateProductDto } from "../dto/create.product.dto";
import { Product } from "../entity/shopEntity/product.entity";

const { AppDataSource } = require("../../../infra/db/data-source");

export class SellerService {
  private shopRepository = AppDataSource.getRepository(Seller_Shop);
  private sellerRepository = AppDataSource.getRepository(test_Seller);
  private categoryRepository = AppDataSource.getRepository(Product_Category);
  private subCategoryRpo = AppDataSource.getRepository(SubCategory);
  private productRepository = AppDataSource.getRepository(Product);
  shopRepo: any;
  // accountRepository: any;
  //shop api
  async createShop(
    shopDto: CreateShopDto,
    req: any,
    res: unknown
  ): Promise<any> {
    const {
      shopName,
      shopDescription,
      location,
      status,
      logo_url,
      sellerId,
      categoryId,
    } = shopDto;

    // const trimmedShopName = shopName.trim().toLowerCase();

    let logoUrl = "";
    if (req.file) {
      const fullUrl = `${req.protocol}://${req.get("host")}`;
      logoUrl = `${fullUrl}/uploads/${req.file.filename}`;
    }

    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    const seller = await this.sellerRepository.findOneBy({ id: sellerId });
    if (!seller) {
      throw new Error("Seller not found");
    }
    if (!category) {
      throw new Error("Category not found with this id");
    }

    const sellerShop = this.shopRepository.create({
      shopName,
      shopDescription,
      location,
      logo_url: logoUrl,
      status,
      seller,
      category,
    });
    const savedShop = await this.shopRepository.save(sellerShop);

    // Update the seller's shop name and add the new shop to their list of shops
    seller.shopName = shopName;
    seller.shopId = savedShop.id;
    if (!seller.shops) {
      seller.shops = [];
    }
    seller.shops.push(savedShop);
    await this.sellerRepository.save(seller);

    return savedShop;
  }

  async deleteshop(id: string): Promise<{ message: string }> {
    try {
      const seller = await this.shopRepository.findOneBy({ id });

      if (!seller) {
        throw new Error("Shop not found");
      }

      await this.shopRepository.delete(id);

      return { message: "Shop deleted successfully" }; // Return confirmation
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete shop");
    }
  }
  async updateShop(id: string, req?: any, res?: unknown): Promise<any> {
    try {
      const { id, categoryId, shopName, shopDescription, location, status } =
        req.body;
      const categoryName = await this.categoryRepository.findOneBy({
        id: categoryId,
      });
      console.log("categoryname", categoryName);
      const shop = await this.shopRepository.findOneBy({ id });
      if (!shop) {
        throw new Error("Shop not found");
      }

      // Update logo if a new file is uploaded
      if (req.file) {
        const fullUrl = `${req.protocol}://${req.get("host")}`;
        shop.logo_url = `${fullUrl}/uploads/${req.file.filename}`;
      }

      // Update category if provided
      if (categoryId) {
        const category = await this.categoryRepository.findOneBy({
          id: categoryId,
        });
        if (!category) {
          throw new Error("Category not found");
        }
        shop.category = category;
      }

      // Update fields if provided

      if (shopName) shop.shopName = shopName;
      if (location) shop.location = location;
      if (shopDescription) shop.shopDescription = shopDescription;
      if (status) shop.status = status;

      // Save updated shop
      const updatedShop = await this.shopRepository.save(shop);

      // console.log("Updated Shop Data:", shop);
      return {
        status: 200,
        message: "Shop updated successfully",
        data: {
          id: updatedShop.id,
          shopName: updatedShop.shopName,
          shopDescription: updatedShop.shopDescription,
          location: updatedShop.location,
          logo_url: updatedShop.logo_url,
          status: updatedShop.status,
          categoryId: updatedShop.category?.id || null,
          categoryName: updatedShop.category?.categoryName || null, // Send category name directly
        },
      };
    } catch (error: any) {
      console.error("Error updating shop:", error);
      return {
        status: 500,
        message: "Failed to update shop",
        error: error.message,
      };
    }
  }

  async getAllShops(): Promise<any> {
    try {
      const rawQuery = ` SELECT 
  ss.*,
  c."categoryName" 
FROM 
  seller_shop ss
  JOIN category c ON ss."categoryId" = c.id`;

      const shops = await this.shopRepository.manager.query(rawQuery);
      console.log("shops", shops);
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

  async searchShops(
    shopName?: string
  ): Promise<{ status: number; message?: string; shops?: any[] }> {
    try {
      // If shopName is provided, search for shops with matching names
      const shops = shopName
        ? await this.shopRepository.find({ where: { shopName } })
        : [];

      if (shops.length === 0) {
        return { status: 404, message: "No shops found" };
      }

      return { status: 200, shops };
    } catch (error) {
      console.error("Error searching shops:", error);
      return { status: 500, message: "Something went wrong" };
    }
  }
  //search shop api
  //productrelated api's

  //category AND subcategories
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
  SELECT * FROM category WHERE "isDeleted" = false

    `;

      const shops = await this.shopRepository.manager.query(rawQuery);
      console.log("shops", shops);
      if (!shops.length) {
        return { status: 404, message: "No sellers found" };
      }
      return { status: 200, shops };
    } catch (error: any) {
      throw new Error("Something went wrong");
    }
  }
  async getProductCategoryById(id: string): Promise<any> {
    try {
      const categories = await this.categoryRepository.findOneBy({ id });
      if (!categories) {
        return { status: 404, message: "No shops found" };
      }
      return { status: 200, categories };
    } catch (error: any) {
      throw new Error("Something went wrong");
    }
  }

  async deleteCategory(id: string): Promise<{ message: string }> {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });
      console.log("category", category);

      if (!category) {
        throw new Error("Category not found");
      }

      // Soft delete all related shops
      const shop = await this.shopRepository.update(
        { category: { id } },
        { isDeleted: true }
      );
      // console.log("shop", shop);
      // Soft delete all related subcategories
      const sell = await this.subCategoryRpo.update(
        { category: { id } },
        { isDeleted: true }
      );
      console.log("sell", sell);
      // Soft delete the category
      await this.categoryRepository.update(id, { isDeleted: true });

      return {
        message:
          "Category and its related subcategories and shops marked as deleted",
      };
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete category");
    }
  }

  async createSubCategory(
    categoryDto: CreateSubCategoryDto,
    req: unknown,
    res: unknown
  ): Promise<any> {
    let { categoryId, subCategoryName } = categoryDto;

    console.log("category******* subcaetgory", categoryId, subCategoryName);
    const existingSubCategory = await this.subCategoryRpo.findOneBy({
      subCategoryName,
    });

    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    console.log(category.id, "*****************");
    // if (existingSubCategory) {
    //   throw new Error("Category already exists");
    // }

    const Subcategory = this.subCategoryRpo.create({
      category,
      subCategoryName,
    });

    return this.subCategoryRpo.save(Subcategory);
  }

  async getProductSubCategory(): Promise<any> {
    try {
      const rawQuery = `
   select * from subcategory WHERE "isDeleted" = false

    `;

      const shops = await this.subCategoryRpo.manager.query(rawQuery);
      console.log("subCatgeoreis", shops);
      if (!shops.length) {
        return { status: 404, message: "No sellers found" };
      }
      return { status: 200, shops };
    } catch (error: any) {
      throw new Error("Something went wrong");
    }
  }
  async getProductSubCategoryById(id: string): Promise<any> {
    try {
      const subCategory = await this.subCategoryRpo
        .createQueryBuilder("subCategory")
        .leftJoinAndSelect("subCategory.category", "category")
        .where("subCategory.id = :id", { id })
        .getOne();

      if (!subCategory) {
        return { status: 404, message: "No sellers found" };
      }
      return { status: 200, subCategory };
    } catch (error: any) {
      return { status: 404, message: "No sellers found" };
    }
  }
  async deleteSubCategory(id: string): Promise<{ message: string }> {
    try {
      const subcategory = await this.subCategoryRpo.findOneBy({ id });

      if (!subcategory) {
        throw new Error("SubCategory not found");
      }

      await this.subCategoryRpo.delete(id);

      return { message: "Shop deleted successfully" }; // Return confirmation
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete shop");
    }
  }
  async createProduct(
    shopDto: CreateProductDto,
    req: any
  ): Promise<any> {
    const {
      name,
      description,
      imageId,
      shopID,
      sizeID,
      subCategoryID,
      categoryID,
      qunatity, // Fixed typo
      price,
    } = shopDto;
  
    try {
      const newProduct = this.productRepository.create({
        name,
        description,
        imageId,
        shopID,
        sizeID,
        subCategoryID,
        categoryID,
        qunatity,
        price,
      });
      console.log("avedProduct*************",newProduct)
      const savedProduct = await this.productRepository.save(newProduct);
  console.log("avedProduct*************",savedProduct)
      return savedProduct;
    } catch (error) {
      throw new Error(`Failed to create product`);
    }
  }
  
}
//product related api's
