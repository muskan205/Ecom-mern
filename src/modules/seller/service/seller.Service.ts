import { CreateShopDto } from "../dto/create.shop.dto";
import { Seller_Shop } from "../entity/shop.entity";
import { Seller } from "../../../entity/Seller";
import { paginate } from "../../../infra/utils/pagination";
const { AppDataSource } = require("../../../infra/db/data-source");

export class SellerService {
  private shopRepository = AppDataSource.getRepository(Seller_Shop);
  private sellerRepository = AppDataSource.getRepository(Seller);

  async createShop(
    shopDto: CreateShopDto,
    req: unknown,
    res: unknown
  ): Promise<any> {
    const {
      shopName,
      shopDescription,
      category,
      location,
      logo_url,
      status,
      username,
      email,
    } = shopDto;

    const seller = this.sellerRepository.create({ username, email, shopName });
    await this.sellerRepository.save(seller);

    const sellerShop = this.shopRepository.create({
      shopName,
      shopDescription,
      location,
      category,
      logo_url,
      status,
      seller,
    });

    return this.shopRepository.save(sellerShop);
  }

  async getAllShops(): Promise<any> {
    try {
      const rawQuery = `
     SELECT s.*
FROM seller_shop s
JOIN seller ON seller.id = s."ownerId";

    `;

      const shops = await this.shopRepository.manager.query(rawQuery);
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
      if (!shops.length) {
        return { status: 404, message: "No sellers found" };
      }
      return { status: 200, shops };
    } catch (error: any) {
      throw new Error("Something went wrong");
    }
  }
}
