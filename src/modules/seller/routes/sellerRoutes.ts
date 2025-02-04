import { Router } from "express";

import AuthorizeRoles from "../../../infra/utils/auth.middleware";
import {
  createCategory,
  createShop,
  getAllShops,
  getProductCategory,
  getShopByID,
  searchShops,
} from "../controller/seller.Controller";

const router = Router();

// router.get("/role", AuthorizeRoles("admin"));

// Shop  related routes
router.post("/create-shop", createShop);
router.get("/get-all-shops", getAllShops);
router.get("/get-seller-byID", getShopByID);
router.get("/search-shop", searchShops);
//product related routes
router.post("/create-category", createCategory);
router.get("/get-category",getProductCategory)

export default router;
