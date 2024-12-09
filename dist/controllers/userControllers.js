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
exports.deleteUser = exports.getAllUsers = exports.createUser = void 0;
const User_1 = require("../src/entity/User");
const { AppDataSource } = require("../src/data-source");
// Controller to create a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, description } = req.body;
    if (!firstName || !lastName) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const user = new User_1.UserNew();
        user.firstName = firstName;
        user.lastName = lastName;
        user.description = description;
        // Save the user to the database
        yield AppDataSource.manager.save(user);
        console.log("Saved a new user with id:", user.id);
        // Return the saved user
        res.status(201).json(user);
    }
    catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: "Error saving user to the database" });
    }
});
exports.createUser = createUser;
// Controller to get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield AppDataSource.getRepository(User_1.UserNew).find();
        res.json(users); // Return users as JSON
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users from the database" });
    }
});
exports.getAllUsers = getAllUsers;
//Delete user api
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        console.log("********id", id);
        const userDeleted = yield AppDataSource.createQueryBuilder()
            .delete()
            .from("muskan_new")
            .where("id = :id", { id })
            .execute();
        res.json(userDeleted);
        res.status(200).json("user deleted");
    }
    catch (error) {
        console.log("error query builder");
        console.log("====================================");
    }
});
exports.deleteUser = deleteUser;
