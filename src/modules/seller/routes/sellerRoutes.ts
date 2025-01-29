import { Router } from "express";

import AuthorizeRoles from "../../../infra/utils/auth.middleware";
import { createShop } from "../controller/seller.Controller";

const router = Router();


// router.get("/role", AuthorizeRoles("admin"));
router.post("/create-shop", createShop);


export default router;
