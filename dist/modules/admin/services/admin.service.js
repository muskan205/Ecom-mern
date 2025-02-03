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
exports.AdminService = void 0;
const { AppDataSource } = require("../../../infra/db/data-source");
const typeorm_1 = require("typeorm");
const Account_entity_1 = require("../../../entity/Account.entity");
const test_seller_1 = require("../../../entity/test-seller");
const dotenv = require("dotenv");
dotenv.config();
class AdminService {
    constructor() {
        this.sellerRepository = AppDataSource.getRepository(test_seller_1.test_Seller);
        this.accountRepository = AppDataSource.getRepository(Account_entity_1.Account);
    }
    updateSeller(updateSellerDto, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, username, email, shopName } = updateSellerDto;
                const account = yield this.accountRepository.findOne({
                    where: { id },
                    relations: ["seller"],
                });
                if (!account) {
                    return res
                        .status(404)
                        .json({ message: `Account not found with id ${id}` });
                }
                if (!account.seller) {
                    return res
                        .status(404)
                        .json({ message: `Seller not found for account id ${id}` });
                }
                account.email = email;
                account.seller.username = username;
                account.seller.shopName = shopName;
                yield this.accountRepository.save(account);
                return res.status(200).json({
                    message: "Seller updated successfully",
                    account,
                    seller: account.seller,
                });
            }
            catch (error) {
                console.error("Error updating seller:", error.message);
                return res.status(500).json({ message: "Something went wrong" });
            }
        });
    }
    getSellerById(id, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sellerId = id; // Ensure ID is treated as a string
                console.log("Requested Seller ID:", sellerId);
                // Find the account by `accountId`, not `id`
                const user = yield this.accountRepository.findOne({
                    where: { id: sellerId },
                    relations: ["seller"],
                    cache: false,
                });
                console.log("Seller Data:", user);
                return {
                    seller: user.seller,
                    email: user.email,
                    role: user.role,
                };
            }
            catch (error) {
                console.error("Error fetching seller:", error.message);
                return res.status(500).json({ message: "Something went wrong" });
            }
        });
    }
    getAllSeller(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.accountRepository.find({
                    relations: ["seller"],
                });
                // Map and filter out null sellers
                const sellers = users
                    .map((user) => user.seller)
                    .filter((seller) => seller !== null);
                res.status(200).json(sellers);
            }
            catch (error) {
                console.error("Error fetching seller:", error.message);
                return res.status(500).json({ message: "Something went wrong" });
            }
        });
    }
    deleteSeller(id, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const seller = yield this.accountRepository.findOne({
                    where: { id },
                    relations: ["seller"],
                });
                if (!seller) {
                    return res
                        .status(404)
                        .json({ message: `Seller not found with id ${id}` });
                }
                yield this.accountRepository.delete(id);
                yield this.sellerRepository.delete({ accountId: id });
                return seller;
            }
            catch (error) {
                console.error("Error fetching seller:", error.message);
                return res.status(500).json({ message: "Something went wrong" });
            }
        });
    }
    searchSeller(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query, username, shopName } = req.query;
                if (!query && !username && !shopName) {
                    return res
                        .status(400)
                        .json({ message: "At least one search parameter is required" });
                }
                const whereConditions = [];
                if (query) {
                    whereConditions.push({ username: (0, typeorm_1.ILike)(`%${query}%`) }, { email: (0, typeorm_1.ILike)(`%${query}%`) }, { shopName: (0, typeorm_1.ILike)(`%${query}%`) });
                }
                else {
                    // handling for sigle query
                    if (username)
                        whereConditions.push({ username: (0, typeorm_1.ILike)(`%${username}%`) });
                    if (shopName)
                        whereConditions.push({ shopName: (0, typeorm_1.ILike)(`%${shopName}%`) });
                }
                const sellers = yield this.sellerRepository.find({
                    where: whereConditions,
                });
                return sellers;
            }
            catch (error) {
                console.error("Error searching seller:", error.message);
                return res.status(500).json({ message: "Something went wrong" });
            }
        });
    }
}
exports.AdminService = AdminService;
