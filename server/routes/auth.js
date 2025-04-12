import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";

const authRouter = express.Router();

// registter
authRouter.post("/register", registerController);
// login
authRouter.post("/login", loginController);

export default authRouter;
