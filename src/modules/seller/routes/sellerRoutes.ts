import { Router } from "express";

import AuthorizeRoles from "../../../infra/utils/auth.middleware";
import {
  createCategory,
  createShop,
  deleteShop,
  getAllShops,
  getProductCategory,
  getShopByID,
  searchShops,
  updateShop,
} from "../controller/seller.Controller";
import upload from "../../../helpers/imageUpload";

const router = Router();

// router.get("/role", AuthorizeRoles("admin"));

// Shop  related routes
router.post("/create-shop",upload.single("logo_url"), createShop);
router.get("/get-all-shops", getAllShops);
router.get("/get-seller-byID", getShopByID);
router.get("/search-shop", searchShops);
router.delete("/delete-shop",deleteShop)
router.put('/update-shop',upload.single("logo_url"),updateShop)
//product related routes
router.post("/create-category", createCategory);
router.get("/get-category",getProductCategory)

export default router;
