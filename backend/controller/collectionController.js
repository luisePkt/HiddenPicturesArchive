import Collection from "../models/CollectionModel.js";

// CREAT new collection
export const createCollection = async (req, res, next) => {
  try {
    await Collection.create(req.body);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

// GET all collections
export const getAllCollections = async (req, res, next) => {
  try {
    const users = await Collection.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// GET Collection
export const getSingleCollection = async (req, res, next) => {
  try {
    const collection = await Collection.findById(req.params.id);
    collection ? res.status(200).json(collection) : res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

// UPDATE collection
export const updateSingleCollection = async (req, res, next) => {
  try {
    const collection = await Collection.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    collection ? res.status(200).json(collection) : res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

// DELETE collection

export const deleteSingleCollection = async (req, res, next) => {
  try {
    const collection = await Collection.findByIdAndDelete(req.params.id);
    res.status(200).json(collection);
  } catch (error) {
    next(error);
  }
};
