"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.AuthService = void 0;
const { AppDataSource } = require("../../../infra/db/data-source");
const User_1 = require("../../../entity/User");
const hash_utils_1 = require("../../../infra/utils/hash.utils");
const TokenUtil_1 = require("../../../infra/utils/TokenUtil");
const sendMail_1 = require("../../../infra/utils/sendMail");
const Seller_1 = require("../../../entity/Seller");
const bcrypt = __importStar(require("bcrypt"));
const Account_entity_1 = require("../../../entity/Account.entity");
const test_seller_1 = require("../../../entity/test-seller");
const test_user_1 = require("../../../entity/test-user");
const dotenv = require("dotenv");
dotenv.config();
class AuthService {
    constructor() {
        this.userRepository = AppDataSource.getRepository(User_1.User);
        this.sellerRepository = AppDataSource.getRepository(Seller_1.Seller);
        this.accountRepository = AppDataSource.getRepository(Account_entity_1.Account);
        this.testSellerRepo = AppDataSource.getRepository(test_seller_1.test_Seller);
        this.testUserRepo = AppDataSource.getRepository(test_user_1.test_User);
        this.tokenService = new TokenUtil_1.TokenService();
    }
    register(registerDto, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, role = "user", shopName, sellerId, } = registerDto;
            if (role === "seller") {
                const hashedPassword = yield (0, hash_utils_1.hashPassword)(password);
                const seller = this.sellerRepository.create({
                    role,
                    username,
                    shopName,
                    email,
                    password: hashedPassword,
                });
                yield this.sellerRepository.save(seller);
                res.status(200).json({ seller });
                const { accessToken, refreshToken } = this.tokenService.generateToken({
                    userId: seller.id,
                    role: role,
                    username: seller.username,
                    email: seller.email,
                });
                seller.accessToken = accessToken;
                seller.refreshToken = refreshToken;
                yield this.userRepository.save(seller);
                res.setHeader("Authorization", `Bearer ${accessToken}`);
                res.setHeader("X-Refresh-Token", refreshToken);
                res.status(201).json(seller);
            }
            if (role === "user") {
                const hashedPassword = yield (0, hash_utils_1.hashPassword)(password);
                const user = this.userRepository.create({
                    username,
                    email,
                    password: hashedPassword,
                    role,
                    sellerId,
                });
                const { accessToken, refreshToken } = this.tokenService.generateToken({
                    userId: user.id,
                    username: user.username,
                    role: user.role,
                    email: user.email,
                });
                user.accessToken = accessToken;
                user.refreshToken = refreshToken;
                user.passwordResetToken = null; // Reset previous tokens if any
                user.passwordResetExpires = new Date(Date.now() + 3600000);
                user.passwordResetToken = null;
                user.passwordResetExpires = null;
                user.passwordResetToken = accessToken;
                user.passwordResetExpires = new Date(Date.now() + 3600000);
                yield this.userRepository.save(user);
                // await this.userRepository.save(user);
                res.status(200).json({ user, accessToken });
                res.setHeader("Authorization", `Bearer ${accessToken}`);
                res.setHeader("X-Refresh-Token", refreshToken);
                res.status(201).json(user);
            }
            else if (role === "admin") {
                const hashedPassword = yield (0, hash_utils_1.hashPassword)(password);
                const user = this.userRepository.create({
                    username,
                    email,
                    password: hashedPassword,
                    role,
                    sellerId,
                });
                yield this.userRepository.save(user);
                const { accessToken, refreshToken } = this.tokenService.generateToken({
                    userId: user.id,
                    username: user.username,
                    role: user.role,
                    email: user.email,
                });
                user.passwordResetToken = null;
                user.passwordResetExpires = null;
                user.passwordResetToken = accessToken;
                user.passwordResetExpires = new Date(Date.now() + 3600000);
                yield this.userRepository.save(user);
                res.setHeader("Authorization", `Bearer ${accessToken}`);
                res.setHeader("X-Refresh-Token", refreshToken);
                res.status(201).json(user);
            }
        });
    }
    login(loginDto, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = loginDto;
            try {
                if (!email || !password) {
                    throw new Error("Please fill in all details");
                }
                const user = yield this.userRepository.findOneBy({
                    email: email.toLowerCase(),
                });
                if (!user) {
                    throw new Error("User not found");
                }
                const isPasswordMatch = yield (0, hash_utils_1.comparePasswords)(password, user.password);
                if (!isPasswordMatch) {
                    throw new Error("Invalid credentials");
                }
                const { accessToken, refreshToken } = this.tokenService.generateToken({
                    userId: user.id,
                    username: user.username,
                    role: user.role,
                    email: user.email,
                });
                res.cookie("token", accessToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 3600000, // 1 hour
                });
                console.log("cookieToke", accessToken);
                res.setHeader("Authorization", `Bearer ${accessToken}`);
                res.json(user);
            }
            catch (error) {
                console.error(error);
                return res.status(400).json({ message: "failded" });
            }
        });
    }
    forgetPassword(forgetPasswordDto, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailService = new sendMail_1.MailService();
            const { email } = forgetPasswordDto;
            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }
            // Check if user exists
            const user = yield this.accountRepository.findOneBy({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const now = new Date();
            // Check if the last OTP was sent within the last minute
            if (user.lastOtpSentAt &&
                now.getTime() - user.lastOtpSentAt.getTime() < 60 * 1000) {
                // const now = new Date();
                const timeDiff = now.getTime() - user.lastOtpSentAt.getTime();
                const minutes = Math.floor(timeDiff / (60 * 1000));
                const seconds = Math.floor((timeDiff % (60 * 1000)) / 1000);
                return res.status(429).json({
                    message: `You can request a new OTP in ${minutes} minutes and ${seconds} seconds.`,
                });
            }
            // Generate a new OTP and set its expiration time
            const otp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP
            const otpExpires = new Date();
            otpExpires.setMinutes(otpExpires.getMinutes() + 5);
            // Send OTP to the user's email
            const emailText = `Your password reset OTP is: ${otp}\nIt will expire in 5 minutes.`;
            yield mailService.sendMail(user.email, "Password Reset OTP", emailText);
            const { accessToken, refreshToken } = this.tokenService.generateToken({
                userId: user.id,
                username: user.username,
                role: user.role,
                email: user.email,
            });
            user.otp = otp.toString();
            user.otpExpires = otpExpires.toISOString();
            console.log("*********expires", otpExpires);
            user.lastOtpSentAt = now;
            yield this.accountRepository.save(user);
            res.setHeader("Authorization", `Bearer ${accessToken}`);
            // Send success response
            return res.status(200).json({
                message: "OTP sent successfully. It will expire in 5 minutes.",
                accessToken,
                refreshToken,
                user,
            });
        });
    }
    verifyOtp(verifyOtpDto, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { otp } = req.body;
            console.log(req.body);
            const userOtp = yield this.accountRepository.findOne({ where: { otp } });
            if (!userOtp) {
                return res.status(404).json({ message: "Invalid OTP." });
            }
            const now = new Date();
            const ExpirationTime = userOtp.otpExpires.getTime();
            if (ExpirationTime < now.getTime()) {
                return res
                    .status(410)
                    .json({ message: "OTP has expired. Please request a new one." });
            }
            return res.status(200).json({ message: "OTP is valid.", ExpirationTime });
        });
    }
    // async getUsers(req: Request, res: Response): Promise<any> {
    //   try {
    //     const page = parseInt(req.query.page as string) || 1;
    //     const limit = parseInt(req.query.limit as string) || 2;
    //     const {
    //       data: users,
    //       total,
    //       totalPages,
    //     } = await paginate<Seller>({
    //       page,
    //       limit,
    //       repository: this.userRepository,
    //     });
    //     if (users.length === 0) {
    //       return res.status(404).json({ message: "No users found" });
    //     }
    //     return {
    //       total,
    //       page,
    //       limit,
    //       totalPages: Math.ceil(total / limit),
    //       users,
    //     };
    //   } catch (error: any) {
    //     console.error("Error fetching seller:", error.message);
    //     return res.status(500).json({ message: "Something went wrong" });
    //   }
    // }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.accountRepository.find();
                res.status(200).json(users);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error fetching users" });
            }
        });
    }
    getUserByID(id, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOneBy({ id });
            console.log("user-by-id", user);
            if (user) {
                res
                    .status(201)
                    .json({ message: `Got the user with this id ${id}`, user });
            }
            res.status(200).json({ message: "User not found" });
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, password, confirmPassword } = req.body;
            if (password != confirmPassword) {
                res.status(400).json({ message: "Password do not match" });
            }
            try {
                const user = yield this.accountRepository.findOneBy({ id });
                console.log("********user*****", user);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                user.password = yield bcrypt.hash(password, 10);
                yield this.accountRepository.save(user);
                return res.status(200).json({
                    message: "Password reset successfully",
                    user,
                });
            }
            catch (error) {
                console.error("Token verification failed:", error);
                return res.status(500).json({ message: "Something went wrong" });
            }
        });
    }
    test_register(registerDto, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, role = "user", username, shopName } = req.body;
            try {
                const existingAccount = yield this.accountRepository.findOneBy({ email });
                if (existingAccount) {
                    return res.status(400).json({ message: "Email already exists" });
                }
                const hashedPassword = yield bcrypt.hash(password, 10);
                const account = new Account_entity_1.Account();
                account.email = email;
                account.password = hashedPassword;
                account.role = role;
                yield this.accountRepository.save(account); // Save the account entity first
                if (role === "seller") {
                    const seller = new test_seller_1.test_Seller();
                    seller.username = username;
                    seller.shopName = shopName;
                    seller.accountId = account.id; // Set the account ID
                    yield this.testSellerRepo.save(seller);
                    account.seller = seller; // Save the seller entity to the account
                }
                else if (role === "user") {
                    const user = new test_user_1.test_User();
                    user.username = username;
                    user.accountId = account.id; // Set the account ID
                    yield this.testUserRepo.save(user);
                    account.user = user; // Save the user entity to the account
                }
                yield this.accountRepository.save(account); // Save the updated account entity
                return res.status(201).json({ message: "Registration successful" });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
    test_login(loginDto, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const account = yield this.accountRepository.findOne({
                    where: { email },
                    relations: ["seller", "user"], //defining relation
                });
                console.log("account");
                if (!account) {
                    return res.status(401).json({ message: "Invalid email or password" });
                }
                const isValidPassword = yield bcrypt.compare(password, account.password);
                if (!isValidPassword) {
                    return res.status(401).json({ message: "Invalid email or password" });
                }
                let user;
                if (account.role === "user") {
                    user = account.user;
                }
                else if (account.role === "seller") {
                    user = account.seller;
                }
                const { accessToken, refreshToken } = this.tokenService.generateToken({
                    userId: user.id,
                    username: user.username,
                    role: account.role,
                    email: account.email,
                });
                res.cookie("token", accessToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 3600000, // 1 hour
                });
                console.log("cookieToke", accessToken);
                res.setHeader("Authorization", `Bearer ${accessToken}`);
                if (!user) {
                    return res.status(401).json({ message: "User not found" });
                }
                return res.status(200).json({ account, user });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
}
exports.AuthService = AuthService;
