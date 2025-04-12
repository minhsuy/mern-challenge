import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import { verifyToken } from "./verifyToken.js";
dotenv.config();
export const verifyAccessToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Token is missing!" });
  }

  const token = authHeader.split(" ")[1];

  const decoded = await verifyToken({
    token,
    privateKey: process.env.JWT_SECRET,
  });
  req.user = decoded;
  next();
});
