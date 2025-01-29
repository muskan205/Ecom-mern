import { Router } from "express";
import {
  forgetPassword,
  getUserByID,
  getUsers,
  login,
  register,
  resetPassword,
  sellerLogin,
  verifyOtp,
} from "../controller/AuthController";
import AuthorizeRoles from "../../../infra/utils/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgetPAssword", forgetPassword);
// router.get("/role", AuthorizeRoles("admin"));
router.get("/get/users", AuthorizeRoles(["admin","seller"]), getUsers);
router.post("/seller/login", sellerLogin);
router.post("/resetpassword",resetPassword)
router.post("/verifyOtp",verifyOtp)
router.get("/get-user-by-Id",getUserByID)

export default router;
