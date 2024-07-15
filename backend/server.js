import express from "express";
// import mongoose from "mongoose";
import cors from "cors";
// import multer from "multer";

import connect from "./middleware/db.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { appRouter } from "./routes/appRouter.js";

const port = process.env.PORT;

// connection to DB
await connect();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// Router
app.use("/", appRouter);

// Middleware
app.use(errorMiddleware);

// clear console
console.clear();

// listening port
app.listen(port, () => {
  console.log(`Listening port ${port}`);
});
