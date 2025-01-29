"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByID = exports.verifyOtp = exports.resetPassword = exports.getUsers = exports.forgetPassword = exports.sellerLogin = exports.login = exports.register = void 0;
const AuthService_1 = require("../services/AuthService");
const authService = new AuthService_1.AuthService();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registerDto = req.body;
        const user = yield authService.register(registerDto, req, res);
        res.status(201).json({ message: "User registered successfully", user });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginDto = req.body;
        const user = yield authService.login(loginDto, req, res);
        // res.status(201).json({ message: "User  successfully logged in", user });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.login = login;
const sellerLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginDto = req.body;
        const user = yield authService.sellerLogin(loginDto, req, res);
        res.status(201).json({ message: "Seller successfully logged in", user });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.sellerLogin = sellerLogin;
const forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forgetPasswordDto = req.body;
        const user = yield authService.forgetPassword(forgetPasswordDto, req, res);
        res
            .status(201)
            .json({
            message: "OTP sent successfully. It will expire in 5 minutes",
            user,
        });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.forgetPassword = forgetPassword;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield authService.getUsers(req, res);
        // res.status(201).json({ message: "Forget password link", user });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.getUsers = getUsers;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield authService.resetPassword(req, res);
        // res.status(201).json({ message: "Password Reset", user });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.resetPassword = resetPassword;
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verifyOtpDto = req.body;
        const user = yield authService.verifyOtp(verifyOtpDto, req, res);
        // res.status(201).json({ message: "Forget password link sent", user });
    }
    catch (error) {
        res.status(400).json({ mesage: "Otp not found" });
    }
});
exports.verifyOtp = verifyOtp;
const getUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const seller = yield authService.getUserByID(id, req, res);
        res.status(200).json({ message: "Seller retrieved successfully", seller });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getUserByID = getUserByID;
