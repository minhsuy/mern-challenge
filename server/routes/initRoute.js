import authRouter from "./auth.js";
import postRouter from "./postRouter.js";

export const initRoutes = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/post", postRouter);
};
