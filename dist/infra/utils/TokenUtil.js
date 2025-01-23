"use strict";
//generating the jwt token
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    generateToken(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, this.secretKey, { expiresIn: '3hours' });
        const refreshToken = jsonwebtoken_1.default.sign(payload, this.secretKey, { expiresIn: '7d' });
        return { accessToken, refreshToken };
    }
}
exports.TokenService = TokenService;
