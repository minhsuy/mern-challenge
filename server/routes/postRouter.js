import express from "express";
import {
  createNewPost,
  deletePost,
  getPost,
  updatedPost,
} from "../controllers/postController.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";

const postRouter = express.Router();

postRouter.post("/", verifyAccessToken, createNewPost);
postRouter.get("/", verifyAccessToken, getPost);
postRouter.put("/:postId", verifyAccessToken, updatedPost);
postRouter.delete("/:postId", verifyAccessToken, deletePost);
export default postRouter;
