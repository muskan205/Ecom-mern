"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Correct syntax for express
const { AppDataSource } = require("../src/infra/db/data-source");
const AuthRoutes_1 = __importDefault(require("./modules/user/routes/AuthRoutes"));
const admin_routes_1 = __importDefault(require("./modules/admin/routes/admin.routes"));
const sellerRoutes_1 = __importDefault(require("./modules/seller/routes/sellerRoutes"));
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata"); // Required for TypeORM decorators to work
const app = (0, express_1.default)();
const port = 3004;
const dotenv = require("dotenv");
var cookieParser = require('cookie-parser');
app.use(cookieParser());
dotenv.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
    // Use the userRoutes for handling /users routes
    app.use("/api", AuthRoutes_1.default);
    app.use('/seller', admin_routes_1.default);
    app.use('/shop', sellerRoutes_1.default);
    // Start the Express server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error("Error during Data Source initialization:", error);
});
