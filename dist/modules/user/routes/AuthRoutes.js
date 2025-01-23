"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controller/AuthController");
const auth_middleware_1 = __importDefault(require("../../../infra/utils/auth.middleware"));
const router = (0, express_1.Router)();
router.post("/register", AuthController_1.register);
router.post("/login", AuthController_1.login);
router.post("/forgetPAssword", AuthController_1.forgetPassword);
// router.get("/role", AuthorizeRoles("admin"));
router.get("/get/users", (0, auth_middleware_1.default)(["admin", "seller"]), AuthController_1.getUsers);
router.post("/seller/login", AuthController_1.sellerLogin);
router.post("/resetpassword", AuthController_1.resetPassword);
router.post("/verifyOtp", AuthController_1.verifyOtp);
exports.default = router;
