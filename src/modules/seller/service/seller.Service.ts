import { CreateShopDto } from "../dto/create.shop.dto";
import { Seller_Shop } from "../entity/shop.entity";
import { Seller } from "../../../entity/Seller";
const { AppDataSource } = require("../../../infra/db/data-source");

export class SellerService {
  private shopRepository = AppDataSource.getRepository(Seller_Shop);
  private sellerRepository = AppDataSource.getRepository(Seller);

  async createShop(
shopDto: CreateShopDto, req: unknown, res: unknown,
   
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

    const seller = this.sellerRepository.create({ username, email ,shopName});
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
}
