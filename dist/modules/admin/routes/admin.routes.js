"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controller/adminController");
const router = (0, express_1.Router)();
router.put("/update-seller", adminController_1.updateSeller);
// router.get("/get-sellers",getSellerByID)
router.get("/get-sellers/:id", adminController_1.getSellerByID);
router.delete("/delete-sellers/:id", adminController_1.deleteSeller);
console.log("inside route");
router.get('/get-all-seller', adminController_1.getAllSeller);
router.get('/search-seller', adminController_1.searchSeller);
exports.default = router;
