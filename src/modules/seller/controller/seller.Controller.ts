import { CreateShopDto } from "../dto/create.shop.dto";
import { SellerService } from "../service/seller.Service";
import { Request, Response } from "express";
import { CreateCategoryDto } from "../dto/create.category.dto";
import { CreateSubCategoryDto } from "../dto/create.subCategory.dto";
import { CreateProductDto } from "../dto/create.product.dto";

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
      .json({ message: "Product category created successfully", user,code:201 });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
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
    const updatedShop = await sellerService.updateShop(req.body, req);
    res
      .status(200)
      .json({ message: "Shop updated successfully", shop: updatedShop });
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
//product related controllers
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
export const getCategoryID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const seller = await sellerService.getProductCategoryById(id);
    res.status(200).json({ message: "Shops retrieved successfully", seller });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const result = await sellerService.deleteCategory(id); // No need for req, res

    res.status(200).json({
      status: 200,
      message: result.message,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createSubCategory = async (req: Request, res: Response) => {
  try {
    const shopDto: CreateSubCategoryDto = req.body;
    const user = await sellerService.createSubCategory(shopDto, req, res);
    res
      .status(201)
      .json({ message: "sub category created successfully", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const getProductSubCategory = async (req: Request, res: Response) => {
  try {
    const result = await sellerService.getProductSubCategory();
    res
      .status(result.status)
      .json({ message: "categories retrieved successfully", result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};




export const getSubCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const seller = await sellerService.getProductSubCategoryById(id);
    res.status(200).json({ message: "Shops retrieved successfully", seller });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const deleteSubCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const result = await sellerService.deleteSubCategory(id); // No need for req, res

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const shopDto: CreateProductDto = req.body;

    // Ensure this function doesn't take `res` as a parameter
    const newProduct = await sellerService.createProduct(shopDto, req);
    console.log("new product*****************",newProduct)
    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
