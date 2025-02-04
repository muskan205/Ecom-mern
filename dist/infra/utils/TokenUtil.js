"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class TokenService {
    constructor() {
        this.secretKey = "fjffhkjkjoykyymmgmfjeenfnsjhaxhi";
        console.log('Secret Key:', this.secretKey);
    }
    generateToken(payload) {
        console.log('Generating token for payload:', payload);
        const accessToken = jsonwebtoken_1.default.sign(payload, this.secretKey, { expiresIn: '3hours' });
        console.log('Access Token:', accessToken);
        const refreshToken = jsonwebtoken_1.default.sign(payload, this.secretKey, { expiresIn: '7d' });
        console.log('Refresh Token:', refreshToken);
        return { accessToken, refreshToken };
    }
}
exports.TokenService = TokenService;
