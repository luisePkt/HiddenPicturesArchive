import express from "express";
import { upload } from "../middleware/imgStorage.js";
import { scan } from "../middleware/clamscan.js";
import tokenAuth from "../middleware/tokenAuth.js";
// import { resize } from "../middleware/sharp.js";

import {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  createUser,
  loginUser,
  registerUser,
  displayProfilePic,
  logoutUser,
} from "../controller/usersController.js";

export const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter
  .route("/:id")
  .get(tokenAuth, getSingleUser)
  .patch(tokenAuth, updateSingleUser)
  .delete(tokenAuth, deleteSingleUser);

userRouter.route("/:id/profilepic").get(displayProfilePic);

userRouter.route("/login").post(loginUser);

//upload profile pic with multer & scan with clamscan and regsiter user:
userRouter.route("/register").post(upload, scan, registerUser);
// upload profile pic with multer and register user:
// userRouter.route("/register").post(upload, registerUser);
// funktioniert noch nicht:
// userRouter.route("/register").post(upload, scan,resize, registerUser);

// funktioniert:
// userRouter.route("/register").post(
  //   multer({
//     dest: "public/img/users",
//   }).single("file"),
//   registerUser
// );

userRouter.route("/logout").post(logoutUser);
