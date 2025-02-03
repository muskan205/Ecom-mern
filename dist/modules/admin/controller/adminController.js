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
exports.searchSeller = exports.getAllSeller = exports.deleteSeller = exports.getSellerByID = exports.updateSeller = void 0;
const admin_service_1 = require("../services/admin.service");
const authService = new admin_service_1.AdminService();
const updateSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateSeller = req.body;
        const user = yield authService.updateSeller(updateSeller, req, res);
        // res.status(201).json({ message: "User registered successfully", user });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateSeller = updateSeller;
const getSellerByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const seller = yield authService.getSellerById(id, req, res);
        res.status(200).json({ message: "Seller retrieved successfully", seller });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getSellerByID = getSellerByID;
const deleteSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const seller = yield authService.deleteSeller(id, req, res);
        res.status(200).json({ message: "Seller deleted successfully", seller });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteSeller = deleteSeller;
const getAllSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seller = yield authService.getAllSeller(req, res);
        res.status(200).json({ message: "Seller retrieved successfully", seller });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAllSeller = getAllSeller;
const searchSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seller = yield authService.searchSeller(req, res);
        res.status(200).json({ message: "Seller fetched successfully", seller });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.searchSeller = searchSeller;
