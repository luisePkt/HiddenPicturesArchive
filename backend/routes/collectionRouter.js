import express from "express";
import {
  getAllCollections,
  createCollection,
  getSingleCollection,
  updateSingleCollection,
  deleteSingleCollection,
} from "../controller/collectionController.js";

export const collectionRouter = express.Router();

collectionRouter.route("/").get(getAllCollections).post(createCollection);
collectionRouter
  .route("/:id")
  .get(getSingleCollection)
  .patch(updateSingleCollection)
  .delete(deleteSingleCollection);
