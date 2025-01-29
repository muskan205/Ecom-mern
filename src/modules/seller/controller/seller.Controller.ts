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

