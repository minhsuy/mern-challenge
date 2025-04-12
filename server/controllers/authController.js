import asyncHandler from "express-async-handler";
import { signAccessToken } from "../common/signJWT.js";
import User from "../models/User.js";
import argon2 from "argon2";
import { loginService, registerService } from "../services/authService.js";

// register controller
export const registerController = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    return res
      .status(404)
      .json({ message: "Username and password are required" });
  }
  // all good
  const checkExistUser = await User.findOne({ email });
  if (checkExistUser) {
    return res.status(500).json({ message: "Email already exists" });
  }
  const hashedPassword = await argon2.hash(password);
  const newUser = await registerService({
    payload: { username, email, password: hashedPassword },
  });
  return res.status(200).json(newUser);
});

// login controller

export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(404)
      .json({ message: "Email and password are required !" });
  }
  const checkExistUser = await User.findOne({ email });
  if (!checkExistUser) {
    return res.status(500).json({ message: "User not found  !" });
  }
  const checkPassword = await argon2.verify(checkExistUser.password, password);
  if (!checkPassword) {
    return res.status(500).json({ message: "Wrong password" });
  }
  const login = await loginService({ payload: { user: checkExistUser } });
  return res.status(200).json({ login });
});
