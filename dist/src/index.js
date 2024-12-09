"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Correct syntax for express
const { AppDataSource } = require("./data-source");
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
require("reflect-metadata"); // Required for TypeORM decorators to work
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
    // Use the userRoutes for handling /users routes
    app.use("/api", userRoutes_1.default);
    // Start the Express server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error("Error during Data Source initialization:", error);
});
