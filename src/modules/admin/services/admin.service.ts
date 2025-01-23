import { Request, Response } from "express";
const { AppDataSource } = require("../../../infra/db/data-source");

import { Seller } from "../../../entity/Seller";
import { UpdateSellerDto } from "../dto/update.seller.dto";
const dotenv = require("dotenv");
dotenv.config();

export class AuthService {
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

      return res.status(200).json({
        message: "Seller updated successfully",
        seller,
      });
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

      return res.status(200).json({
        message: "Seller retrieved successfully",
        seller,
      });
    } catch (error: any) {
      console.error("Error fetching seller:", error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  async getAllSeller(req: Request, res: Response): Promise<any> {
    try {
      const seller = await this.sellerRepository.find();

      if (!seller) {
        return res.status(404).json({ message: `Seller not found with id ` });
      }

      return res.status(200).json({
        message: "Sellers retrieved successfully",
        seller,                                   
      });
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

      return res.status(200).json({
        message: "Seller deleted successfully",
        seller,
      });
    } catch (error: any) {
      console.error("Error fetching seller:", error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}
