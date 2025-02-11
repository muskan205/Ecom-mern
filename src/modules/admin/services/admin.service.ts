import { Request, Response } from "express";
const { AppDataSource } = require("../../../infra/db/data-source");

import { UpdateSellerDto } from "../dto/update.seller.dto";
import { ILike } from "typeorm";
import { paginate } from "../../../infra/utils/pagination";
import { Account } from "../../../entity/Account.entity";
import { test_Seller } from "../../../entity/test-seller";
const dotenv = require("dotenv");
dotenv.config();

export class AdminService {
  private sellerRepository = AppDataSource.getRepository(test_Seller);
  private accountRepository = AppDataSource.getRepository(Account);

  async updateSeller(
    updateSellerDto: UpdateSellerDto,
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const { id:sellerId, username, email, shopName } = updateSellerDto;

     // Find the account by `accountId`, not `id`
     const account = await this.accountRepository.findOne({
      where: { id:sellerId},
      relations: ["seller"],
      cache: false,
    });

      if (!account) {
        return res
          .status(404)
          .json({ message: `Account not found with id ` });
      }

      if (!account.seller) {
        return res
          .status(404)
          .json({ message: `Seller not found for account id ` });
      }

      account.email = email;
      account.seller.username = username;
      account.seller.shopName = shopName;
      await this.sellerRepository.save(account.seller);
      await this.accountRepository.save(account);

      return res.status(200).json({
        message: "Seller updated successfully",
        account,
        seller: account.seller,
      });
    } catch (error: any) {
      console.error("Error updating seller:", error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  async getSellerById(id: string, req: Request, res: Response): Promise<any> {
    try {
      const sellerId = id; // Ensure ID is treated as a string
      console.log("Requested Seller ID:", sellerId);

      // Find the account by `accountId`, not `id`
      const user = await this.accountRepository.findOne({
        where: { id: sellerId },
        relations: ["seller"],
        cache: false,
      });

      console.log("Seller Data:", user);
      return {
        seller: user.seller,
        email: user.email,
        shopName: user.shopName,
        role: user.role,
      };
    } catch (error: any) {
      console.error("Error fetching seller:", error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  async getAllSeller(req: Request, res: Response): Promise<any> {
    try {
      const users = await this.accountRepository.find({
        relations: ["seller"],
        select: {
          seller: {
            id: true,

            username: true,
            shopName: true,
            accountId: true,
            shopId: true,
            createdAt: true,
          },
        },
      });

      console.log("users", users);

      // Map and filter sellers
      const sellers = users
        .map((user: any) => ({
          email: user.email,
          seller: user.seller,
        }))
        .filter(
          (seller: any) => seller.seller !== null && seller.seller.id !== null
        );

      // res.status(200).json(sellers);
      return sellers;
    } catch (error: any) {
      console.error("Error fetching seller:", error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
  async deleteSeller(id: string, req: Request, res: Response): Promise<any> {
    try {
      const seller = await this.accountRepository.findOne({
        where: { id },
        relations: ["seller"],
      });

      if (!seller) {
        return res
          .status(404)
          .json({ message: `Seller not found with id ${id}` });
      }

      // Delete the seller entity
      // await this.sellerRepository.delete({ accountId: id });

      // Delete the account entity
      await this.accountRepository.delete(id);

      return res.status(200).json({ message: "Seller deleted successfully" });
    } catch (error: any) {
      console.error("Error deleting seller:", error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  async searchSeller(req: Request, res: Response): Promise<any> {
    try {
      const { query, username, shopName } = req.query;

      if (!query && !username && !shopName) {
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
