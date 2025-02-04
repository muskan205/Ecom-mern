import { Any } from "typeorm";
import { CreateShopDto } from "../dto/create.shop.dto";
import { SellerService } from "../service/seller.Service";
import { Request, Response } from "express";

const sellerService=new SellerService()


export const createShop = async (req: Request, res: Response) => {
  try {
    const shopDto: CreateShopDto = req.body;
    const user = await sellerService.createShop(shopDto,req,res);
    res.status(201).json({ message: "shop created successfully", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const getAllShops = async (req: Request, res: Response) => {
  try {
    const result = await sellerService.getAllShops();
    res.status(result.status).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export const getShopByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const seller = await sellerService.getShopById( id);
    res.status(200).json({ message: "Seller retrieved successfully", seller });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


