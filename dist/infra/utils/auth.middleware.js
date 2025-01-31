"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
function AuthorizeRoles(allowedRoles) {
    return (req, res, next) => {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        console.log("*********1", req.headers.authorization);
        console.log("token from midlleware", token);
        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }
        try {
            const decoded = jwt.verify(token, "fjffhkjkjoykyymmgmfjeenfnsjhaxhi"); // Use an environment variable for the secret key
            console.log("Decoded token:", decoded);
            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: "Access denied" });
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            console.error("Token verification error:", error);
            return res.status(401).json({ message: "Invalid token" });
        }
    };
}
exports.default = AuthorizeRoles;
