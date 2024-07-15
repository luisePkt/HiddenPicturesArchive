import express from "express";
import { upload } from "../middleware/imgStorage.js";

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

userRouter.route("/register").post(upload, registerUser);

// funktioniert:
// userRouter.route("/register").post(
//   multer({
//     dest: "public/img/users",
//   }).single("file"),
//   registerUser
// );
