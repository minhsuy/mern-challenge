import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
  status: {
    type: String,
    enum: ["TO LEARN", "LEARNING", "LEARNED"],
    default: "TO LEARN",
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
});

const Post = mongoose.model("Posts", PostSchema);
export default Post;
