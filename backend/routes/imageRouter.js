import express from "express";
import { upload } from "../middleware/imgStorage.js";
import { scan } from "../middleware/clamscan.js";
import {
  getAllImages,
  createImage,
  getSingleImage,
  updateSingleImage,
  deleteSingleImage,
} from "../controller/imageController.js";

export const imageRouter = express.Router();

imageRouter.route("/").get(getAllImages).post(upload, scan, createImage);
imageRouter
  .route("/:id")
  .get(getSingleImage)
  .patch(upload, scan, updateSingleImage)
  .delete(deleteSingleImage);
