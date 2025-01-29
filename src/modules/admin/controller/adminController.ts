import { Request, Response } from "express";
import { AdminService } from "../services/admin.service";
import { UpdateSellerDto } from "../dto/update.seller.dto";

const authService = new AdminService();

export const updateSeller = async (req: Request, res: Response) => {
  try {
    const updateSeller: UpdateSellerDto = req.body;
    const user = await authService.updateSeller(updateSeller, req, res);
    // res.status(201).json({ message: "User registered successfully", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const getSellers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const seller = await authService.getSeller(id, req, res);
    res.status(200).json({ message: "Seller retrieved successfully", seller });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteSeller = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const seller = await authService.deleteSeller(id, req, res);
    res.status(200).json({ message: "Seller deleted successfully", seller });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const getAllSeller = async (req: Request, res: Response) => {
  try {
    const seller = await authService.getAllSeller(req, res);
    res.status(200).json({ message: "Seller retrieved successfully", seller });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const searchSeller = async (req: Request, res: Response) => {
  try {
    const seller = await authService.searchSeller(req, res);
    res.status(200).json({ message: "Seller fetched successfully", seller });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};