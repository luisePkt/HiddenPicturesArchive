import express from "express";
import cors from "cors";

import connect from "./middleware/db.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { appRouter } from "./routes/appRouter.js";
import cookieParser from "cookie-parser";

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
app.use(cookieParser());

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
