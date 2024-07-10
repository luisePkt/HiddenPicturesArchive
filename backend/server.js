import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";

import connect from "./middleware/db.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

// connection to DB
await connect();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

// listening port
app.listen(port, () => {
  console.log(`Listening port ${port}`);
});
