import express from "express";

import { userRouter } from "./userRouter.js";
import { collectionRouter } from "./collectionRouter.js";
import { imageRouter } from "./imageRouter.js";

export const appRouter = express.Router();

appRouter.use("/user", userRouter);
appRouter.use("/collection", collectionRouter);
appRouter.use("/image", imageRouter);
