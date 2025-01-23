"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
function AuthorizeRoles(allowedRoles) {
    return (req, res, next) => {
        var _a;
        //get the authorization token from header
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        console.log("token", token);
        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }
        try {
            const decoded = jwt.verify(token, process.env.Secret_Key);
            if (allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: "Access denied" });
            }
            req.user = decoded; // Add user info to the request object
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    };
}
exports.default = AuthorizeRoles;
