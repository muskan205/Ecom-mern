import { Router } from "express";
import AuthorizeRoles from "../../../infra/utils/auth.middleware";
import { deleteSeller, getAllSeller,getSellerByID,searchSeller, updateSeller } from "../controller/adminController";


const router = Router();


router.put("/update-seller", updateSeller);
// router.get("/get-sellers",getSellerByID)
router.get("/get-sellers/:id", getSellerByID);
router.delete("/delete-sellers/:id",deleteSeller)
console.log("inside route");
router.get('/get-all-seller',getAllSeller)
router.get('/search-seller',searchSeller)

export default router;
