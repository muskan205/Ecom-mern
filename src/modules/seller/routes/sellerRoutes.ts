import { Router } from "express";

import AuthorizeRoles from "../../../infra/utils/auth.middleware";
import { createShop, getAllShops, getShopByID } from "../controller/seller.Controller";

const router = Router();


// router.get("/role", AuthorizeRoles("admin"));
router.post("/create-shop", AuthorizeRoles(["seller"]),createShop);
router.get('/get-all-shops',getAllShops)
router.get('/get-seller-byID',getShopByID)


export default router;
