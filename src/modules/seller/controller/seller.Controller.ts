
import { CreateShopDto } from "../dto/create.shop.dto";
import { SellerService } from "../service/seller.Service";
import { Request, Response } from "express";
import { CreateCategoryDto } from "../dto/create.category.dto";

const sellerService = new SellerService();

export const createShop = async (req: Request, res: Response) => {
  try {
    const shopDto: CreateShopDto = req.body;
    const user = await sellerService.createShop(shopDto, req, res);
    res.status(201).json({ message: "shop created successfully", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllShops = async (req: Request, res: Response) => {
  try {
    const result = await sellerService.getAllShops();
    res
      .status(result.status)
      .json({ message: "Shops retrieved successfully", result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getShopByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const seller = await sellerService.getShopById(id);
    res.status(200).json({ message: "Shops retrieved successfully", seller });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const shopDto: CreateCategoryDto = req.body;
    const user = await sellerService.createCategory(shopDto, req, res);
    res
      .status(201)
      .json({ message: "Product category created successfully", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const searchShops = async (req: Request, res: Response) => {
  try {
    const shopName = req.body;
    const shops = await sellerService.searchShops();
    res.status(200).json(shops);
  } catch (error) {
    console.error("Error searching shops:", error);
    res.status(500).json({ message: "Error searching shops", error: "" });
  }
};

export const getProductCategory = async (req: Request, res: Response) => {
  try {
    const result = await sellerService.getProductCategory();
    res
      .status(result.status)
      .json({ message: "categories retrieved successfully", result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteShop = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await sellerService.deleteshop(id); // No need for req, res

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const updateShop = async (req: Request, res: Response) => {
  try {
 
    const updatedShop = await sellerService.updateShop( req.body, req);
    res.status(200).json({ message: "Shop updated successfully", shop: updatedShop });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
