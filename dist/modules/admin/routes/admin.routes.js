"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../../../infra/utils/auth.middleware"));
const adminController_1 = require("../controller/adminController");
const router = (0, express_1.Router)();
router.put("/update-seller", adminController_1.updateSeller);
router.get("/get-seller", (0, auth_middleware_1.default)(['admin']), adminController_1.getSellers);
router.delete("/delete-seller", adminController_1.deleteSeller);
router.get('/get-all-seller', adminController_1.getAllSeller);
exports.default = router;
