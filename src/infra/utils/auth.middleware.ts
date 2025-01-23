import { NextFunction } from "express";
const jwt = require("jsonwebtoken");
function AuthorizeRoles(allowedRoles: string[]) {
  return (req: any, res: any, next: NextFunction) => {
    //get the authorization token from header
    const token = req.headers.authorization?.split(" ")[1];
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
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}
export default AuthorizeRoles;
