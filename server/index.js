import express from "express";
import dotenv from "dotenv";
import { connect } from "./config/connectDB.js";

// config dotenv
dotenv.config();

// connect to DB
connect();

// create server
const app = express();
const PORT = process.env.PORT || 5000;

// routes
app.get("/about", (req, res) => {
  res.send("Info : Thai Minh!");
});

// start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
