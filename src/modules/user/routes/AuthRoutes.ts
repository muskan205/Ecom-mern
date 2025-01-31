import { Router } from "express";
import {
  forgetPassword,
  getUserByID,
  getUsers,
  login,
  register,
  resetPassword,
  test_login,
  test_register,
  verifyOtp,
} from "../controller/AuthController";
import AuthorizeRoles from "../../../infra/utils/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgetPAssword", forgetPassword);

// router.get("/get/users", AuthorizeRoles(["user", "seller"]), getUsers);
router.get("/get/users", getUsers);
router.post("/resetpassword", resetPassword);
router.post("/verifyOtp", verifyOtp);
router.get("/get-user-by-Id", getUserByID);

router.post("/test-register", test_register);
router.post("/test-login", test_login);

export default router;
