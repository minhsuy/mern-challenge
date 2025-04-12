import express from "express";
import dotenv from "dotenv";
import { connect } from "./config/connectDB.js";
import { initRoutes } from "./routes/initRoute.js";
import cors from "cors";
import { errHandler } from "./middlewares/errHandler.js";
import { signRefreshToken } from "./common/signJWT.js";
// config dotenv
dotenv.config();

// connect to DB
connect();

// create server
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// catch error
app.use(errHandler);

// start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// routes
initRoutes(app);
