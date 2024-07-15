import express from "express";
import { storage } from "../middleware/imgStorage.js";
import multer from "multer";

import {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  createUser,
  loginUser,
  registerUser,
} from "../controller/usersController.js";

export const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter
  .route("/:id")
  .get(getSingleUser)
  .patch(updateSingleUser)
  .delete(deleteSingleUser);

userRouter.route("/login").post(loginUser);

const upload = multer({ storage: storage }).single("profileImage");
userRouter.route("/register", upload).post(registerUser);
