import { Request, Response } from "express";
const { AppDataSource } = require("../../../infra/db/data-source");

import { Seller } from "../../../entity/Seller";
import { UpdateSellerDto } from "../dto/update.seller.dto";
import { ILike } from "typeorm";
import { paginate } from "../../../infra/utils/pagination";
const dotenv = require("dotenv");
dotenv.config();

export class AdminService {
  private sellerRepository = AppDataSource.getRepository(Seller);

  async updateSeller(
    updateSellerDto: UpdateSellerDto,
    req: Request,
    res: Response
  ): Promise<any> {
    const { id, username, email, shopName } = req.body;

    try {
      const seller = await this.sellerRepository.findOne({ where: { id } });

      if (!seller) {
        return res
          .status(404)
          .json({ message: `User not found with id ${id}` });
      }

      seller.email = email;
      seller.shopName = shopName;
      seller.username = username; // Update the username field

      await this.sellerRepository.save(seller);

      return seller;
    } catch (error: any) {
      console.error("Error updating seller:", error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  async getSeller(id: string, req: Request, res: Response): Promise<any> {
    try {
      const seller = await this.sellerRepository.findOne({ where: { id } });

      if (!seller) {
        return res
          .status(404)
          .json({ message: `Seller not found with id ${id}` });
      }

      return seller;
    } catch (error: any) {
      console.error("Error fetching seller:", error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  async getAllSeller(req: Request, res: Response): Promise<any> {
    try {
      const page = parseInt(req.query.page as string) || 1; 
      const limit = parseInt(req.query.limit as string) || 2; 

      const { data: sellers, total, totalPages } = await paginate<Seller>({
        page,
        limit,
        repository: this.sellerRepository, // Your seller repository
      });
  
      if (sellers.length === 0) {
        return res.status(404).json({ message: 'No sellers found' });
      }

      return {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        sellers
      };
    } catch (error: any) {
      console.error("Error fetching seller:", error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  async deleteSeller(id: string, req: Request, res: Response): Promise<any> {
    try {
      const seller = await this.sellerRepository
        .createQueryBuilder("seller")
        .delete()
        .where("seller.id = :id", { id })
        .execute();

      if (!seller) {
        return res
          .status(404)
          .json({ message: `Seller not found with id ${id}` });
      }

      return seller;
    } catch (error: any) {
      console.error("Error fetching seller:", error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  async searchSeller(req: Request, res: Response): Promise<any> {
    try {
      const { query, username, email, shopName } = req.query;

      if (!query && !username && !email && !shopName) {
        return res
          .status(400)
          .json({ message: "At least one search parameter is required" });
      }

      const whereConditions: any = [];

      if (query) {
        whereConditions.push(
          { username: ILike(`%${query}%`) },
          { email: ILike(`%${query}%`) },
          { shopName: ILike(`%${query}%`) }
        );
      } else {
        // handling for sigle query
        if (username)
          whereConditions.push({ username: ILike(`%${username}%`) });
        if (email) whereConditions.push({ email: ILike(`%${email}%`) });
        if (shopName)
          whereConditions.push({ shopName: ILike(`%${shopName}%`) });
      }

      const sellers = await this.sellerRepository.find({
        where: whereConditions,
      });

      return sellers;
    } catch (error: any) {
      console.error("Error searching seller:", error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}
