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
const Seller_1 = require("../../../entity/Seller");
const typeorm_1 = require("typeorm");
const pagination_1 = require("../../../infra/utils/pagination");
const dotenv = require("dotenv");
dotenv.config();
class AdminService {
    constructor() {
        this.sellerRepository = AppDataSource.getRepository(Seller_1.Seller);
    }
    updateSeller(updateSellerDto, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, username, email, shopName } = req.body;
            try {
                const seller = yield this.sellerRepository.findOne({ where: { id } });
                if (!seller) {
                    return res
                        .status(404)
                        .json({ message: `User not found with id ${id}` });
                }
                seller.email = email;
                seller.shopName = shopName;
                seller.username = username; // Update the username field
                yield this.sellerRepository.save(seller);
                return seller;
            }
            catch (error) {
                console.error("Error updating seller:", error.message);
                return res.status(500).json({ message: "Something went wrong" });
            }
        });
    }
    getSeller(id, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const seller = yield this.sellerRepository.findOne({ where: { id } });
                if (!seller) {
                    return res
                        .status(404)
                        .json({ message: `Seller not found with id ${id}` });
                }
                return seller;
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
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 2;
                const { data: sellers, total, totalPages } = yield (0, pagination_1.paginate)({
                    page,
                    limit,
                    repository: this.sellerRepository, // Your seller repository
                });
                if (sellers.length === 0) {
                    return res.status(404).json({ message: 'No sellers found' });
                }
                return {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                    sellers
                };
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
                const seller = yield this.sellerRepository
                    .createQueryBuilder("seller")
                    .delete()
                    .where("seller.id = :id", { id })
                    .execute();
                if (!seller) {
                    return res
                        .status(404)
                        .json({ message: `Seller not found with id ${id}` });
                }
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
                const { query, username, email, shopName } = req.query;
                if (!query && !username && !email && !shopName) {
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
                    if (email)
                        whereConditions.push({ email: (0, typeorm_1.ILike)(`%${email}%`) });
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
