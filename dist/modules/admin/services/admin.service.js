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
exports.AuthService = void 0;
const { AppDataSource } = require("../../../infra/db/data-source");
const Seller_1 = require("../../../entity/Seller");
const dotenv = require("dotenv");
dotenv.config();
class AuthService {
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
                return res.status(200).json({
                    message: "Seller updated successfully",
                    seller,
                });
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
                return res.status(200).json({
                    message: "Seller retrieved successfully",
                    seller,
                });
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
                const seller = yield this.sellerRepository.find();
                if (!seller) {
                    return res.status(404).json({ message: `Seller not found with id ` });
                }
                return res.status(200).json({
                    message: "Sellers retrieved successfully",
                    seller,
                });
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
                return res.status(200).json({
                    message: "Seller deleted successfully",
                    seller,
                });
            }
            catch (error) {
                console.error("Error fetching seller:", error.message);
                return res.status(500).json({ message: "Something went wrong" });
            }
        });
    }
}
exports.AuthService = AuthService;
