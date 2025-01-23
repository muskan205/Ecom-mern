import { Router } from "express";
import AuthorizeRoles from "../../../infra/utils/auth.middleware";
import { deleteSeller, getAllSeller, getSellers, updateSeller } from "../controller/adminController";


const router = Router();


router.put("/update-seller", updateSeller);
router.get("/get-seller",AuthorizeRoles(['admin']),getSellers)
router.delete("/delete-seller",deleteSeller)
router.get('/get-all-seller',getAllSeller)

export default router;
