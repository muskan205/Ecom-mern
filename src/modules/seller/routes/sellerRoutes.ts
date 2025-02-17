import { Router } from "express";

import AuthorizeRoles from "../../../infra/utils/auth.middleware";
import {
  createCategory,
  createProduct,
  createShop,
  createSubCategory,
  deleteCategory,
  deleteShop,
  deleteSubCategory,
  getAllShops,
  getCategoryID,
  getProductCategory,
  getProductSubCategory,
  getShopByID,
  getSubCategoryById,
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
router.delete("/delete-shop/:id",deleteShop)
router.put('/update-shop',upload.single("logo_url"),updateShop)
//product related routes
router.post("/create-category", createCategory);
router.get("/get-category",getProductCategory)
router.post("/create-subCategory",createSubCategory)
router.get("/get-subcategory",getProductSubCategory)
router.get("/get-category-by-id/:id",getCategoryID)
router.get("/get-subcategory-by-id/:id",getSubCategoryById)
router.delete('/delete-subCategory',deleteSubCategory)
router.delete("/delete-category-id",deleteCategory)
//product route
router.post("/create-product",createProduct)
export default router;
