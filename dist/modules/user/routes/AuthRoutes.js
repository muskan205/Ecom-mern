"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controller/AuthController");
const auth_middleware_1 = __importDefault(require("../../../infra/utils/auth.middleware"));
const router = (0, express_1.Router)();
router.post("/forgetPAssword", AuthController_1.forgetPassword);
router.get("/get/users", (0, auth_middleware_1.default)(["admin"]), AuthController_1.getUsers);
router.post("/resetpassword", AuthController_1.resetPassword);
router.post("/verifyOtp", AuthController_1.verifyOtp);
router.get("/get-user-by-Id", (0, auth_middleware_1.default)(["admin"]), AuthController_1.getUserByID);
router.post("/register", AuthController_1.registration);
router.post("/login", AuthController_1.login);
exports.default = router;
