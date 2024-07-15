import express from "express";
import {
  getAllImages,
  createImage,
  getSingleImage,
  updateSingleImage,
  deleteSingleImage,
} from "../controller/imageController.js";

export const imageRouter = express.Router();

imageRouter.route("/").get(getAllImages).post(createImage);
imageRouter
  .report("/:id")
  .get(getSingleImage)
  .patch(updateSingleImage)
  .delete(deleteSingleImage);
