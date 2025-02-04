import { Router } from "express";
import {
  forgetPassword,
  getUserByID,
  getUsers,
  resetPassword,
  login,
  registration,
  verifyOtp,
} from "../controller/AuthController";
import AuthorizeRoles from "../../../infra/utils/auth.middleware";

const router = Router();

router.post("/forgetPAssword", forgetPassword);

router.get("/get/users", AuthorizeRoles(["admin"]), getUsers);
router.post("/resetpassword", resetPassword);
router.post("/verifyOtp", verifyOtp);
router.get("/get-user-by-Id", AuthorizeRoles(["admin"]), getUserByID);

router.post("/register", registration);
router.post("/login", login);

export default router;
