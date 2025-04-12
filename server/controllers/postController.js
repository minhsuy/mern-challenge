import expressAsyncHandler from "express-async-handler";
import Post from "../models/Post.js";
export const createNewPost = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  if (!id) {
    return res.status(400).json({ message: "Cannot create a new post !" });
  }
  const { title, description, url, status } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title fields are required" });
  }
  const newPost = await Post.create({
    title,
    description,
    url,
    status,
    user: id,
  });

  if (newPost) {
    return res.status(200).json({
      newPost,
      message: "Create new post successfully !",
      success: true,
    });
  } else return res.status(400).json({ message: "Cannot create a new post !" });
});

export const getPost = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  if (!id) {
    return res.status(400).json({ message: "Cannot get post !" });
  }
  const posts = await Post.find({ user: id }).populate("user", [
    "username",
    "email",
  ]);
  if (posts) {
    return res
      .status(200)
      .json({ posts, message: "Get posts successfully !", success: true });
  } else return res.status(400).json({ message: "Cannot get posts !" });
});

export const updatedPost = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  const { postId } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ message: "Cannot create a new post !", success: false });
  }
  if (!postId) {
    return res
      .status(400)
      .json({ message: "Cannot create a new post !", success: false });
  }
  const { title, description, url, status } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title fields are required" });
  }
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      title,
      description,
      url,
      status,
    },
    { new: true }
  );
  if (updatedPost) {
    return res.status(200).json({
      updatedPost,
      message: "Update post successfully !",
      success: true,
    });
  } else return res.status(400).json({ message: "Cannot update post !" });
});

export const deletePost = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  const { postId } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ message: "User not found !", success: false });
  }
  if (!postId) {
    return res
      .status(400)
      .json({ message: "Cannot delete post !", success: false });
  }
  const deletedPost = await Post.findByIdAndDelete(postId, { new: true });
  if (deletePost)
    return res.status(200).json({
      deletedPost,
      message: "Delete post successfully !",
      success: true,
    });
  else return res.status(400).json({ message: "Cannot delete post !" });
});
