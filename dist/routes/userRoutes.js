"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // Import necessary types from express
const userControllers_1 = require("../controllers/userControllers");
const router = (0, express_1.Router)();
// POST route to create a new user
router.post("/users", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield (0, userControllers_1.createUser)(req, res); // Call the controller function for creating a user
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  }),
);
// GET route to fetch all users
router.get("/get/users", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield (0, userControllers_1.getAllUsers)(req, res); // Call the controller function for getting all users
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  }),
);
// GET route to fetch all users
router.delete("/delete", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield (0, userControllers_1.deleteUser)(req, res); // Call the controller function for getting all users
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  }),
);
exports.default = router;
